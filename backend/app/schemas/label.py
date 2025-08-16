from pydantic import BaseModel, Field

class LabelIn(BaseModel):
    label: str = Field(..., max_length=64)
    source: str = "user"
    note: str = ""
