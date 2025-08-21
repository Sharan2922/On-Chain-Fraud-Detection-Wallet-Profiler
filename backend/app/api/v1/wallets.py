from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.wallet import Wallet
from pydantic import BaseModel

router = APIRouter(prefix="/wallets")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Request schema
class WalletCreate(BaseModel):
    address: str
    risk_score: float
    risk_level: str

@router.post("/")
def create_wallet(wallet: WalletCreate, db: Session = Depends(get_db)):
    # Check if wallet already exists
    db_wallet = db.query(Wallet).filter(Wallet.address == wallet.address.lower()).first()
    if db_wallet:
        raise HTTPException(status_code=400, detail="Wallet already exists")

    new_wallet = Wallet(
        address=wallet.address.lower(),
        risk_score=wallet.risk_score,
        risk_level=wallet.risk_level,
    )
    db.add(new_wallet)
    db.commit()
    db.refresh(new_wallet)
    return {"status": "created", "wallet": wallet.dict()}

@router.get("/{address}")
def get_wallet(address: str, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.address == address.lower()).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {
        "address": wallet.address,
        "risk_score": wallet.risk_score,
        "risk_level": wallet.risk_level,
    }

# 🔹 NEW: list wallets
@router.get("/")
def list_wallets(db: Session = Depends(get_db)):
    wallets = db.query(Wallet).order_by(Wallet.created_at.desc()).limit(100).all()
    return [
        {"address": w.address, "risk_score": w.risk_score, "risk_level": w.risk_level}
        for w in wallets
    ]
