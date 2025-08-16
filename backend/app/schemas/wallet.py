from pydantic import BaseModel, Field
from typing import Dict, Any

class WalletCreate(BaseModel):
    address: str = Field(..., pattern="^0x[a-fA-F0-9]{40}$")
    chain: str = "base"

class WalletOut(BaseModel):
    address: str
    chain: str
    tx_count: int
    unique_counterparties: int
    total_in_value: float
    total_out_value: float
    approvals: int
    dex_interactions: int
    scam_interactions: int
    anomaly_score: float
    risk_score: float
    risk_level: str
    features: Dict[str, Any]
