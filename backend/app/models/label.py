from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.db.base import Base

class Label(Base):
    __tablename__ = "labels"
    id = Column(Integer, primary_key=True, autoincrement=True)
    address = Column(String(64), index=True, nullable=False)
    label = Column(String(64), nullable=False)
    source = Column(String(64), nullable=True)
    note = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
