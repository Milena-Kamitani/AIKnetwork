from collections import Counter
from datetime import datetime, timedelta

from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.config import STATUS_LABELS
from app.models import Attachment, Technician, Ticket


def build_overview(db: Session) -> dict:
    tickets = list(db.scalars(select(Ticket)).all())
    total = len(tickets)
    by_status = Counter(t.status for t in tickets)

    now = datetime.utcnow()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    this_month = sum(1 for t in tickets if t.created_at >= month_start)
    open_count = by_status.get("novo", 0) + by_status.get("em_atendimento", 0)
    unassigned = sum(1 for t in tickets if t.technician_id is None)

    top_municipalities = Counter(t.municipality for t in tickets).most_common(8)
    top_departments = Counter(t.department for t in tickets).most_common(6)

    tech_rows = [
        (name, count)
        for name, count in db.execute(
            select(Technician.name, func.count(Ticket.id))
            .join(Ticket, Ticket.technician_id == Technician.id)
            .group_by(Technician.id, Technician.name)
            .order_by(func.count(Ticket.id).desc())
        ).all()
    ]

    last_days = []
    for offset in range(13, -1, -1):
        day = (now - timedelta(days=offset)).date()
        last_days.append(
            {
                "label": day.strftime("%d/%m"),
                "count": sum(1 for t in tickets if t.created_at.date() == day),
            }
        )

    tickets_with_files = db.scalar(
        select(func.count(func.distinct(Attachment.ticket_id)))
    ) or 0

    recent = db.scalars(
        select(Ticket)
        .options(joinedload(Ticket.technician))
        .order_by(Ticket.created_at.desc())
        .limit(8)
    ).unique().all()

    return {
        "total": total,
        "this_month": this_month,
        "open_count": open_count,
        "unassigned": unassigned,
        "with_attachments": tickets_with_files,
        "by_status": {key: by_status.get(key, 0) for key in STATUS_LABELS},
        "top_municipalities": top_municipalities,
        "top_departments": top_departments,
        "by_technician": list(tech_rows),
        "last_days": last_days,
        "recent": recent,
    }
