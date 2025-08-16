from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_session
from app.models.label import Label

router = APIRouter()

class LabelIn(BaseModel):
    label: str
    source: str | None = None
    note: str | None = None

@router.post("/labels/{address}")
def add_label(address: str, body: LabelIn):
    with get_session() as db:
        row = Label(address=address.lower(), label=body.label, source=body.source, note=body.note)
        db.add(row)
        db.commit()
        db.refresh(row)
        return {"id": row.id, "address": row.address, "label": row.label, "source": row.source, "note": row.note}

@router.get("/labels/{address}")
def get_labels(address: str):
    with get_session() as db:
        rows = db.query(Label).filter(Label.address == address.lower()).order_by(Label.created_at.desc()).all()
        return {"labels": [{
            "id": r.id, "address": r.address, "label": r.label, "source": r.source, "note": r.note, "created_at": r.created_at
        } for r in rows]}
