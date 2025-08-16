from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class Wallet(Base):
    __tablename__ = "wallets"
    address = Column(String(42), primary_key=True, index=True)
    chain = Column(String(32), default="base")
    tx_count = Column(Integer, default=0)
    unique_counterparties = Column(Integer, default=0)
    total_in_value = Column(Float, default=0.0)
    total_out_value = Column(Float, default=0.0)
    approvals = Column(Integer, default=0)
    dex_interactions = Column(Integer, default=0)
    scam_interactions = Column(Integer, default=0)
    anomaly_score = Column(Float, default=0.0)
    risk_score = Column(Float, default=0.0)
    risk_level = Column(String(16), default="unknown")
    features = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
