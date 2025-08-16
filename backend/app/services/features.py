from typing import Dict, Any
from math import log1p

def engineer_features(tx_summary: Dict[str, Any]) -> Dict[str, float]:
    # tx_summary example keys: tx_count, total_in_value, total_out_value, approvals, dex_interactions, scam_interactions, unique_counterparties
    f = {}
    f["tx_count"] = float(tx_summary.get("tx_count", 0))
    f["unique_counterparties"] = float(tx_summary.get("unique_counterparties", 0))
    f["total_in_value"] = float(tx_summary.get("total_in_value", 0.0))
    f["total_out_value"] = float(tx_summary.get("total_out_value", 0.0))
    f["approvals"] = float(tx_summary.get("approvals", 0))
    f["dex_interactions"] = float(tx_summary.get("dex_interactions", 0))
    f["scam_interactions"] = float(tx_summary.get("scam_interactions", 0))
    # log features for stability
    f["log_tx_count"] = log1p(f["tx_count"])
    f["log_unique_counterparties"] = log1p(f["unique_counterparties"])
    f["log_total_in"] = log1p(f["total_in_value"])
    f["log_total_out"] = log1p(f["total_out_value"])
    f["approvals_ratio"] = f["approvals"] / max(f["tx_count"], 1.0)
    f["dex_ratio"] = f["dex_interactions"] / max(f["tx_count"], 1.0)
    f["scam_ratio"] = f["scam_interactions"] / max(f["tx_count"], 1.0)
    return f
