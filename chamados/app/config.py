import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
UPLOAD_DIR = BASE_DIR / "uploads"

SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-change-in-production")
SESSION_MAX_AGE = int(os.getenv("SESSION_MAX_AGE", "86400"))
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

MAX_UPLOAD_BYTES = 5 * 1024 * 1024
MAX_ATTACHMENTS = 5
ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}

STATUS_LABELS = {
    "novo": "Novo",
    "em_atendimento": "Em atendimento",
    "resolvido": "Resolvido",
}

STATUS_COLORS = {
    "novo": "#dc2626",
    "em_atendimento": "#ca8a04",
    "resolvido": "#16a34a",
}
