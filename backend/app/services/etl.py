import requests
from typing import Dict, Any
from app.core.config import settings

BASE_V2 = "https://api.etherscan.io/v2/api"

def etherscan_v2(params: Dict[str, Any]) -> Dict[str, Any]:
    if not settings.ETHERSCAN_API_KEY:
        raise RuntimeError("ETHERSCAN_API_KEY missing")
    q = {"chainid": settings.CHAIN_ID, "apikey": settings.ETHERSCAN_API_KEY}
    r = requests.get(BASE_V2, params={**q, **params}, timeout=30)
    r.raise_for_status()
    data = r.json()
    # Etherscan returns status/message/result pattern
    if isinstance(data, dict) and str(data.get("status", "1")) == "0":
        # not fatal: return data for caller to inspect
        return data
    return data

def fetch_normal_txs(address: str) -> Dict[str, Any]:
    return etherscan_v2({
        "module": "account",
        "action": "txlist",
        "address": address,
        "page": 1,
        "offset": 10000,
        "sort": "asc",
    })

def fetch_erc20_txs(address: str) -> Dict[str, Any]:
    return etherscan_v2({
        "module": "account",
        "action": "tokentx",
        "address": address,
        "page": 1,
        "offset": 10000,
        "sort": "asc",
    })
