from contextlib import asynccontextmanager
import json
import mimetypes
from datetime import datetime
from pathlib import Path
from typing import Annotated

from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload
from starlette.middleware.sessions import SessionMiddleware

from app.auth import verify_password
from app.config import (
    SECRET_KEY,
    SESSION_MAX_AGE,
    STATUS_COLORS,
    STATUS_LABELS,
    UPLOAD_DIR,
)
from app.database import Base, engine, get_db
from app.models import Attachment, Technician, Ticket
from app.dashboard_stats import build_overview
from app.seed import seed_technicians
from app.utils import (
    format_whatsapp_display,
    normalize_whatsapp,
    save_attachments,
    whatsapp_link,
)

BASE_DIR = Path(__file__).resolve().parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
templates.env.filters["tojson"] = lambda value: json.dumps(value, ensure_ascii=False)


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    from app.database import SessionLocal

    db = SessionLocal()
    try:
        seed_technicians(db)
    finally:
        db.close()
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(title="AIK Controle", lifespan=lifespan)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, max_age=SESSION_MAX_AGE)
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


def template_ctx(request: Request, **extra):
    return {"request": request, "status_labels": STATUS_LABELS, **extra}


def require_technician(request: Request, db: Session) -> Technician:
    tech_id = request.session.get("technician_id")
    if not tech_id:
        raise HTTPException(status_code=303, headers={"Location": "/tecnicos/login"})
    tech = db.get(Technician, tech_id)
    if not tech or not tech.active:
        request.session.clear()
        raise HTTPException(status_code=303, headers={"Location": "/tecnicos/login"})
    return tech


@app.get("/", response_class=HTMLResponse)
async def public_form(request: Request):
    return templates.TemplateResponse(
        "public_form.html",
        template_ctx(request, success_id=None, error=None),
    )


@app.post("/chamados", response_class=HTMLResponse)
async def create_ticket(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    requester_name: Annotated[str, Form()],
    municipality: Annotated[str, Form()],
    department: Annotated[str, Form()],
    problem_type: Annotated[str, Form()],
    whatsapp: Annotated[str, Form()],
    screenshots: Annotated[list[UploadFile], File()] = [],  # noqa: B006
):
    valid_files = [f for f in screenshots if f.filename]
    try:
        whatsapp_digits = normalize_whatsapp(whatsapp)
        saved_files = await save_attachments(valid_files, UPLOAD_DIR)
    except ValueError as exc:
        return templates.TemplateResponse(
            "public_form.html",
            template_ctx(request, success_id=None, error=str(exc)),
            status_code=400,
        )

    ticket = Ticket(
        requester_name=requester_name.strip(),
        municipality=municipality.strip(),
        department=department.strip(),
        problem_type=problem_type.strip(),
        whatsapp=whatsapp_digits,
        status="novo",
    )
    db.add(ticket)
    db.flush()

    for stored, original in saved_files:
        db.add(
            Attachment(
                ticket_id=ticket.id,
                stored_name=stored,
                original_name=original,
            )
        )
    db.commit()

    return templates.TemplateResponse(
        "public_form.html",
        template_ctx(request, success_id=ticket.id, error=None),
    )


@app.get("/tecnicos/login", response_class=HTMLResponse)
async def login_page(request: Request):
    if request.session.get("technician_id"):
        return RedirectResponse("/tecnicos", status_code=303)
    return templates.TemplateResponse(
        "login.html",
        template_ctx(request, error=None),
    )


@app.post("/tecnicos/login")
async def login(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    username: Annotated[str, Form()],
    password: Annotated[str, Form()],
):
    tech = db.scalar(
        select(Technician).where(
            Technician.username == username.strip().lower(),
            Technician.active.is_(True),
        )
    )
    if not tech or not verify_password(password, tech.password_hash):
        return templates.TemplateResponse(
            "login.html",
            template_ctx(request, error="Usuário ou senha incorretos."),
            status_code=401,
        )
    request.session["technician_id"] = tech.id
    request.session["technician_name"] = tech.name
    return RedirectResponse("/tecnicos", status_code=303)


@app.get("/tecnicos/logout")
async def logout(request: Request):
    request.session.clear()
    return RedirectResponse("/tecnicos/login", status_code=303)


def _parse_filter_date(value: str | None, end_of_day: bool = False) -> datetime | None:
    if not value or not value.strip():
        return None
    try:
        parsed = datetime.strptime(value.strip(), "%Y-%m-%d")
    except ValueError:
        return None
    if end_of_day:
        return parsed.replace(hour=23, minute=59, second=59, microsecond=999999)
    return parsed.replace(hour=0, minute=0, second=0, microsecond=0)


@app.get("/tecnicos", response_class=HTMLResponse)
async def technician_overview(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
):
    if not request.session.get("technician_id"):
        return RedirectResponse("/tecnicos/login", status_code=303)

    stats = build_overview(db)
    return templates.TemplateResponse(
        "overview.html",
        template_ctx(
            request,
            stats=stats,
            nav_active="overview",
            status_colors=STATUS_COLORS,
            current_user=request.session.get("technician_name"),
        ),
    )


@app.get("/tecnicos/chamados", response_class=HTMLResponse)
async def technician_tickets_list(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    status: str | None = None,
    q: str | None = None,
    municipality: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
):
    if not request.session.get("technician_id"):
        return RedirectResponse("/tecnicos/login", status_code=303)

    query = (
        select(Ticket)
        .options(joinedload(Ticket.technician), joinedload(Ticket.attachments))
        .order_by(Ticket.created_at.desc())
    )
    if status and status in STATUS_LABELS:
        query = query.where(Ticket.status == status)
    if municipality and municipality.strip():
        query = query.where(Ticket.municipality.ilike(municipality.strip()))
    parsed_from = _parse_filter_date(date_from)
    parsed_to = _parse_filter_date(date_to, end_of_day=True)
    if parsed_from:
        query = query.where(Ticket.created_at >= parsed_from)
    if parsed_to:
        query = query.where(Ticket.created_at <= parsed_to)
    if q:
        term = f"%{q.strip()}%"
        query = query.where(
            (Ticket.requester_name.ilike(term))
            | (Ticket.municipality.ilike(term))
            | (Ticket.department.ilike(term))
            | (Ticket.problem_type.ilike(term))
            | (Ticket.whatsapp.ilike(term))
        )

    tickets = db.scalars(query).unique().all()
    municipalities = db.scalars(
        select(Ticket.municipality).distinct().order_by(Ticket.municipality)
    ).all()
    technicians = db.scalars(
        select(Technician).where(Technician.active.is_(True)).order_by(Technician.name)
    ).all()

    for ticket in tickets:
        ticket.whatsapp_display = format_whatsapp_display(ticket.whatsapp)
        ticket.whatsapp_url = whatsapp_link(ticket.whatsapp)

    return templates.TemplateResponse(
        "chamados_list.html",
        template_ctx(
            request,
            tickets=tickets,
            technicians=technicians,
            nav_active="chamados",
            current_status=status,
            search=q or "",
            current_municipality=municipality or "",
            date_from=date_from or "",
            date_to=date_to or "",
            municipalities=municipalities,
            status_colors=STATUS_COLORS,
            current_user=request.session.get("technician_name"),
        ),
    )


@app.get("/tecnicos/chamados/{ticket_id}", response_class=HTMLResponse)
async def ticket_detail(
    request: Request,
    ticket_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    if not request.session.get("technician_id"):
        return RedirectResponse("/tecnicos/login", status_code=303)

    ticket = db.scalar(
        select(Ticket)
        .options(joinedload(Ticket.technician), joinedload(Ticket.attachments))
        .where(Ticket.id == ticket_id)
    )
    if not ticket:
        raise HTTPException(status_code=404, detail="Chamado não encontrado")

    technicians = db.scalars(
        select(Technician).where(Technician.active.is_(True)).order_by(Technician.name)
    ).all()
    ticket.whatsapp_display = format_whatsapp_display(ticket.whatsapp)
    ticket.whatsapp_url = whatsapp_link(ticket.whatsapp)

    return templates.TemplateResponse(
        "ticket_detail.html",
        template_ctx(
            request,
            ticket=ticket,
            technicians=technicians,
            status_colors=STATUS_COLORS,
            current_user=request.session.get("technician_name"),
            saved=False,
        ),
    )


@app.post("/tecnicos/chamados/{ticket_id}")
async def update_ticket(
    request: Request,
    ticket_id: int,
    db: Annotated[Session, Depends(get_db)],
    status: Annotated[str, Form()],
    technician_id: Annotated[str, Form()] = "",
    notes: Annotated[str, Form()] = "",
):
    if not request.session.get("technician_id"):
        return RedirectResponse("/tecnicos/login", status_code=303)

    ticket = db.get(Ticket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Chamado não encontrado")

    if status not in STATUS_LABELS:
        raise HTTPException(status_code=400, detail="Status inválido")

    ticket.status = status
    ticket.notes = notes.strip() or None
    if technician_id:
        tid = int(technician_id)
        if db.get(Technician, tid):
            ticket.technician_id = tid
    else:
        ticket.technician_id = None

    db.commit()
    return RedirectResponse(f"/tecnicos/chamados/{ticket_id}?saved=1", status_code=303)


@app.get("/anexos/{stored_name}")
async def get_attachment(
    request: Request,
    stored_name: str,
    db: Annotated[Session, Depends(get_db)],
):
    if not request.session.get("technician_id"):
        raise HTTPException(status_code=401)

    attachment = db.scalar(
        select(Attachment).where(Attachment.stored_name == stored_name)
    )
    if not attachment:
        raise HTTPException(status_code=404)

    path = UPLOAD_DIR / stored_name
    if not path.exists():
        raise HTTPException(status_code=404)

    media_type, _ = mimetypes.guess_type(attachment.original_name)
    return FileResponse(
        path,
        media_type=media_type or "application/octet-stream",
        headers={
            "Content-Disposition": f'inline; filename="{attachment.original_name}"'
        },
    )
