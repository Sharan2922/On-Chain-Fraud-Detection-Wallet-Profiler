from fastapi import APIRouter
from app.workers.tasks import ingest_and_score

router = APIRouter()

@router.post("/ingest/{address}")
def trigger_ingest(address: str):
    ingest_and_score.delay(address)
    return {"queued": True, "address": address}
