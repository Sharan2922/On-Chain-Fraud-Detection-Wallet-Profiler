from sqlalchemy import Column, String, Float, JSON, DateTime, func
from app.db.base import Base

class Wallet(Base):
    __tablename__ = "wallets"
    address = Column(String(64), primary_key=True)
    score = Column(Float, nullable=True)     # <--- add this
    level = Column(String, nullable=True)
    risk_score = Column(Float, nullable=True)
    risk_level = Column(String(16), nullable=True)
    features = Column(JSON, nullable=True)
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
