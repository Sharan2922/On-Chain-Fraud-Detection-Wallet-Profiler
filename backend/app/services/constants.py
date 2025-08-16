from pathlib import Path
import json

def load_known_bad_addresses() -> set[str]:
    data_path = Path(__file__).resolve().parent.parent / "data" / "known_bad_addresses.json"
    if data_path.exists():
        with open(data_path, "r") as f:
            data = json.load(f)
        return set(a.lower() for a in data.get("addresses", []))
    return set()

KNOWN_BAD = load_known_bad_addresses()
