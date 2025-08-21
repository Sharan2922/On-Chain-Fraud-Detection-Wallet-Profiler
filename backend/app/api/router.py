from fastapi import APIRouter
from app.api.routes import contract_routes
from app.api.v1.health import router as health_router
from app.api.v1.ingest import router as ingest_router
from app.api.v1.score import router as score_router
from app.api.v1.wallets import router as wallets_router
from app.api.v1.labels import router as labels_router

api_router = APIRouter(prefix="/v1")

# Core routes
api_router.include_router(health_router, tags=["health"])
api_router.include_router(ingest_router, tags=["ingest"])
api_router.include_router(score_router, tags=["score"])

# Wallets + labels
api_router.include_router(wallets_router, tags=["wallets"])
api_router.include_router(labels_router, tags=["labels"])

# Contract interaction
api_router.include_router(contract_routes.router, prefix="/contract", tags=["contract"])
