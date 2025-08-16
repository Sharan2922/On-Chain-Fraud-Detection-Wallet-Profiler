from sqlalchemy import Column, String, Integer, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.db.base import Base

class RiskEvent(Base):
    __tablename__ = "risk_events"
    id = Column(Integer, primary_key=True, autoincrement=True)
    subject = Column(String(42), index=True)
    event_type = Column(String(64))  # e.g., APPROVAL_TO_UNKNOWN, LARGE_OUTFLOW_SPIKE, INTERACT_SCAM_CONTRACT
    severity = Column(String(16))    # low/medium/high
    details = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
