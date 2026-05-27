import re
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.config import ALLOWED_EXTENSIONS, MAX_ATTACHMENTS, MAX_UPLOAD_BYTES


def normalize_whatsapp(value: str) -> str:
    digits = re.sub(r"\D", "", value.strip())
    if len(digits) < 10 or len(digits) > 13:
        raise ValueError(
            "Informe um WhatsApp válido com DDD (10 a 13 dígitos, só números)."
        )
    return digits


def format_whatsapp_display(digits: str) -> str:
    if len(digits) == 11:
        return f"({digits[:2]}) {digits[2:7]}-{digits[7:]}"
    if len(digits) == 10:
        return f"({digits[:2]}) {digits[2:6]}-{digits[6:]}"
    if len(digits) == 13 and digits.startswith("55"):
        local = digits[2:]
        if len(local) == 11:
            return f"+55 ({local[:2]}) {local[2:7]}-{local[7:]}"
    return digits


def whatsapp_link(digits: str) -> str:
    number = digits if digits.startswith("55") else f"55{digits}"
    return f"https://wa.me/{number}"


async def save_attachments(
    files: list[UploadFile], upload_dir: Path
) -> list[tuple[str, str]]:
    saved: list[tuple[str, str]] = []
    if not files:
        return saved

    upload_dir.mkdir(parents=True, exist_ok=True)
    for upload in files[:MAX_ATTACHMENTS]:
        if not upload.filename:
            continue
        ext = Path(upload.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError(
                f"Arquivo não permitido: {upload.filename}. Use PNG, JPG ou WEBP."
            )
        content = await upload.read()
        if len(content) > MAX_UPLOAD_BYTES:
            raise ValueError(f"Arquivo muito grande (máx. 5 MB): {upload.filename}")
        stored = f"{uuid.uuid4().hex}{ext}"
        path = upload_dir / stored
        path.write_bytes(content)
        saved.append((stored, upload.filename))
    return saved
