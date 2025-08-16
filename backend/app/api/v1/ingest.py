from fastapi import APIRouter, HTTPException
from app.workers.tasks import ingest_and_score_task

router = APIRouter()

@router.post("/ingest/{address}")
def ingest_wallet(address: str):
    try:
        ingest_and_score_task.delay(address)
        return {"queued": True, "address": address}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
