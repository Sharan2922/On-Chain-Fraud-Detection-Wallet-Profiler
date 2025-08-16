DEX_ROUTERS_BASE = {
    # Uniswap V3 SwapRouter02 on Base
    "0x2626664c2603336e57b271c5c0b26f421741e481",
    # Aerodrome Universal Routers (labels on Basescan/superscan)
    "0x6cb442acf35158d5eda88fe602221b67b400be3e",
    "0x5dd421cc6d37c1f9ce40b3779a5ff66593275a45",
    # BaseSwap PancakeRouter (per Dedaub label)
    "0x327df1e6de05895d2ab08513aadd9313fe505d86",
}

def load_known_bad_addresses(path: str) -> set[str]:
    try:
        import json, os
        if not os.path.exists(path):
            return set()
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return {a.lower() for a in data.get("addresses", [])}
    except Exception:
        return set()
