from fastapi import APIRouter
from sqlalchemy import select
from app.db.session import SessionLocal
from app.models.wallet import Wallet
from app.core.config import settings
from app.services.scoring import partial_fit

router = APIRouter()

@router.post("/retrain")
def retrain_model():
    with SessionLocal() as db:
        rows = db.execute(select(Wallet.features)).all()
        feats = [r[0] for r in rows if r[0]]
        if not feats:
            return {"ok": False, "message": "no features yet"}
        partial_fit(feats, settings.MODEL_DIR)
        return {"ok": True, "count": len(feats)}
