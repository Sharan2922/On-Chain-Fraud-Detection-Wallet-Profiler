from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from app.db.session import SessionLocal
from app.models.wallet import Wallet

router = APIRouter()

@router.get("/score/{address}")
def get_score(address: str):
    with SessionLocal() as db:
        w = db.get(Wallet, address.lower())
        if not w:
            raise HTTPException(status_code=404, detail="Address not found. Ingest first.")
        return {
            "address": w.address,
            "risk_score": w.risk_score,
            "risk_level": w.risk_level,
            "features": w.features,
            "explain": {
                "tx_count": w.tx_count,
                "unique_counterparties": w.unique_counterparties,
                "approvals": w.approvals,
                "dex_interactions": w.dex_interactions,
                "scam_interactions": w.scam_interactions
            }
        }

@router.get("/wallets/{address}")
def get_wallet(address: str):
    with SessionLocal() as db:
        w = db.get(Wallet, address.lower())
        if not w:
            raise HTTPException(status_code=404, detail="Address not found. Ingest first.")
        return {
            "address": w.address,
            "chain": w.chain,
            "tx_count": w.tx_count,
            "unique_counterparties": w.unique_counterparties,
            "total_in_value": w.total_in_value,
            "total_out_value": w.total_out_value,
            "approvals": w.approvals,
            "dex_interactions": w.dex_interactions,
            "scam_interactions": w.scam_interactions,
            "risk_score": w.risk_score,
            "risk_level": w.risk_level,
            "features": w.features,
        }
