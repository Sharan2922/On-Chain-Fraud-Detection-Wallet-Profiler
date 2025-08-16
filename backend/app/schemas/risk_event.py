from pydantic import BaseModel
from typing import Dict, Any

class RiskEventOut(BaseModel):
    id: int
    subject: str
    event_type: str
    severity: str
    details: Dict[str, Any]
