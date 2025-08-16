from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.wallet import Wallet

router = APIRouter()


@router.get("/wallet/{address}")
def get_wallet(address: str):
    address = address.lower()
    db: Session = SessionLocal()
    wallet = db.query(Wallet).filter(Wallet.address == address).first()
    db.close()

    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")

    return {
        "address": wallet.address,
        "score": wallet.score,
        "risk_level": wallet.risk_level,
    }
