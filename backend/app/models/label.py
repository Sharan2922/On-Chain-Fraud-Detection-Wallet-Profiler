from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.sql import func
from app.db.base import Base

class Label(Base):
    __tablename__ = "labels"
    address = Column(String(42), primary_key=True)
    label = Column(String(64), nullable=False)  # e.g., phishing, exchange, dex, nft_market
    source = Column(String(64), default="user")
    note = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
