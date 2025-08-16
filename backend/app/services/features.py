from decimal import Decimal, getcontext
from typing import Dict, Any, List, Tuple, Set

getcontext().prec = 50  # high precision for wei->ether conversion

WEI = Decimal(10) ** 18

def _wei_to_eth(wei_str: str) -> Decimal:
    try:
        return Decimal(int(wei_str)) / WEI
    except Exception:
        return Decimal(0)

def _collect_counterparties(txs: List[Dict[str, Any]], addr_lower: str) -> Set[str]:
    cps: Set[str] = set()
    for t in txs:
        frm = str(t.get("from", "")).lower()
        to = str(t.get("to", "")).lower()
        if frm and frm != addr_lower:
            cps.add(frm)
        if to and to != addr_lower:
            cps.add(to)
    return cps

def extract_features(address: str, normal_resp: Dict[str, Any], erc20_resp: Dict[str, Any]) -> Dict[str, Any]:
    addr_lower = address.lower()
    normal_list = normal_resp.get("result", []) if isinstance(normal_resp, dict) else []
    erc20_list = erc20_resp.get("result", []) if isinstance(erc20_resp, dict) else []

    tx_count = len(normal_list)
    total_in_value = Decimal(0)
    total_out_value = Decimal(0)

    for t in normal_list:
        value_eth = _wei_to_eth(t.get("value", "0"))
        if str(t.get("to", "")).lower() == addr_lower:
            total_in_value += value_eth
        else:
            total_out_value += value_eth

    unique_counterparties = len(_collect_counterparties(normal_list, addr_lower))
    erc20_transfers = len(erc20_list)

    return {
        "tx_count": tx_count,
        "unique_counterparties": unique_counterparties,
        "total_in_value_eth": float(total_in_value),
        "total_out_value_eth": float(total_out_value),
        "erc20_transfers": erc20_transfers,
    }
