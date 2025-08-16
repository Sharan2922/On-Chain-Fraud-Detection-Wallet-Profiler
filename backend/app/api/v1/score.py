from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_session
from app.models.wallet import Wallet

router = APIRouter()

@router.get("/score/{address}")
def get_score(address: str):
    with get_session() as db:  # type: Session
        w = db.get(Wallet, address.lower())
        if not w:
            raise HTTPException(status_code=404, detail="Address not found. Ingest first.")
        return {
            "address": w.address,
            "risk_score": w.risk_score,
            "risk_level": w.risk_level,
            "features": w.features,
            "last_updated": w.last_updated,
        }
