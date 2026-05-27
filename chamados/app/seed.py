from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import hash_password
from app.config import ADMIN_PASSWORD, ADMIN_USERNAME
from app.models import Technician


DEFAULT_TECHNICIANS = [
    {"name": "André", "username": "andre", "color": "#7c3aed"},
    {"name": "Milena", "username": "milena", "color": "#a78bfa"},
    {"name": "Fernando", "username": "fernando", "color": "#38bdf8"},
]


def seed_technicians(db: Session) -> None:
    existing = db.scalars(select(Technician)).all()
    if existing:
        return

    default_password = hash_password("aik2025")
    for tech in DEFAULT_TECHNICIANS:
        db.add(
            Technician(
                name=tech["name"],
                username=tech["username"],
                password_hash=default_password,
                color=tech["color"],
            )
        )

    db.add(
        Technician(
            name="Administrador",
            username=ADMIN_USERNAME,
            password_hash=hash_password(ADMIN_PASSWORD),
            color="#1f2937",
        )
    )
    db.commit()
