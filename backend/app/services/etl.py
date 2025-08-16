import os, time, requests, math
from typing import Dict, Any, List, Tuple, Set
from app.core.config import settings
from app.services.constants import DEX_ROUTERS_BASE, load_known_bad_addresses

BASESCAN_API = "https://api.basescan.org/api"
API_KEY = settings.BASESCAN_API_KEY
SCAMLIST_PATH = os.environ.get("SCAMLIST_PATH", "backend/data/known_bad_addresses.json")

def _api(params: Dict[str, Any]) -> Dict[str, Any]:
    p = dict(params)
    if API_KEY:
        p["apikey"] = API_KEY
    r = requests.get(BASESCAN_API, params=p, timeout=30)
    r.raise_for_status()
    data = r.json()
    if data.get("status") == "0" and data.get("message","").lower() == "no transactions found":
        return {"result": []}
    if "result" not in data:
        raise RuntimeError(f"Basescan API unexpected: {data}")
    return data

def _paginate(module: str, action: str, address: str, startblock: int=0, endblock: int=99999999, sort: str="asc", max_pages: int=10, offset: int=10000):
    page = 1
    while page <= max_pages:
        params = {
            "module": module, "action": action, "address": address,
            "startblock": startblock, "endblock": endblock, "page": page,
            "offset": offset, "sort": sort
        }
        data = _api(params).get("result", [])
        if not data:
            break
        yield from data
        if len(data) < offset:
            break
        page += 1

def _wei_to_eth(wei_str: str) -> float:
    try:
        return int(wei_str) / 1e18
    except Exception:
        try:
            return int(wei_str, 16) / 1e18
        except Exception:
            return 0.0

def _is_approval_input(input_data: str) -> bool:
    if not input_data or not input_data.startswith("0x"):
        return False
    sig = input_data[:10].lower()
    return sig in {
        "0x095ea7b3",  # approve(address,uint256)
        "0xa457c2d7",  # approve(address,uint256) alt selector sometimes seen
        "0x39509351",  # increaseAllowance(address,uint256)
        "0x66188463",  # decreaseAllowance(address,uint256)
    }

def fetch_account_summary(address: str) -> Dict[str, Any]:
    address_l = address.lower()
    # Normal transactions
    txs = list(_paginate("account", "txlist", address_l, max_pages=10, offset=10000))  # up to 100k txs
    # ERC20 transfers
    erc20 = list(_paginate("account", "tokentx", address_l, max_pages=5, offset=10000))

    unique_set: Set[str] = set()
    total_in = 0.0
    total_out = 0.0
    approvals = 0
    dex_interactions = 0
    erc20_transfer_count = len(erc20)

    bad_set = load_known_bad_addresses(SCAMLIST_PATH)
    scam_interactions = 0

    for t in txs:
        frm = (t.get("from") or "").lower()
        to = (t.get("to") or "").lower()
        value_eth = _wei_to_eth(t.get("value","0"))
        # counterparties
        if frm == address_l and to:
            unique_set.add(to)
            total_out += value_eth
            # DEX router detection
            if to in DEX_ROUTERS_BASE:
                dex_interactions += 1
            if to in bad_set:
                scam_interactions += 1
            # approvals by input selector
            if _is_approval_input(t.get("input","")):
                approvals += 1
        elif to == address_l and frm:
            unique_set.add(frm)
            total_in += value_eth
            if frm in bad_set:
                scam_interactions += 1

    summary = {
        "tx_count": len(txs),
        "unique_counterparties": len(unique_set),
        "total_in_value": total_in,
        "total_out_value": total_out,
        "approvals": approvals,
        "dex_interactions": dex_interactions,
        "erc20_transfers": erc20_transfer_count,
        "scam_interactions": scam_interactions,
    }
    return summary
