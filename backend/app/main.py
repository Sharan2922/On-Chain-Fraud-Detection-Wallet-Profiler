from fastapi import FastAPI
from app.api.router import api_router

app = FastAPI(title="On-Chain Fraud Detection & Wallet Profiler", version="1.0")

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(api_router)
