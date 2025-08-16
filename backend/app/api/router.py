from fastapi import APIRouter
from app.api.v1 import wallets, labels, health, ingest, train

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(ingest.router, prefix="/v1", tags=["ingest"])
api_router.include_router(wallets.router, prefix="/v1", tags=["wallets"])
api_router.include_router(labels.router, prefix="/v1", tags=["labels"])
api_router.include_router(train.router, prefix="/v1", tags=["train"])
