from typing import Dict, Any
from app.services.constants import KNOWN_BAD

def heuristic_score(address: str, features: Dict[str, Any]) -> float:
    score = 0.0

    tx_count = features.get("tx_count", 0) or 0
    unique_cps = features.get("unique_counterparties", 0) or 0
    out_eth = features.get("total_out_value_eth", 0.0) or 0.0
    erc20 = features.get("erc20_transfers", 0) or 0

    # Basic heuristics
    if tx_count == 0:
        score += 60
    if unique_cps > 200:
        score += 20
    if out_eth > 500:
        score += 10
    if erc20 > 1000:
        score += 10

    if address.lower() in KNOWN_BAD:
        score = max(score, 80)

    # Normalize to 0..100
    return max(0.0, min(100.0, score))

def risk_level(score: float) -> str:
    if score >= 70: return "high"
    if score >= 40: return "medium"
    return "low"
