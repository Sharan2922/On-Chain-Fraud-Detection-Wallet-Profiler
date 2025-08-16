from fastapi import APIRouter, HTTPException
from app.db.session import SessionLocal
from app.models.label import Label
from app.schemas.label import LabelIn

router = APIRouter()

@router.post("/labels/{address}")
def add_label(address: str, payload: LabelIn):
    with SessionLocal() as db:
        l = Label(address=address.lower(), label=payload.label, source=payload.source, note=payload.note)
        db.merge(l)
        db.commit()
        return {"ok": True}

@router.get("/labels/{address}")
def get_label(address: str):
    with SessionLocal() as db:
        l = db.get(Label, address.lower())
        if not l:
            raise HTTPException(status_code=404, detail="No label")
        return {"address": l.address, "label": l.label, "source": l.source, "note": l.note}
