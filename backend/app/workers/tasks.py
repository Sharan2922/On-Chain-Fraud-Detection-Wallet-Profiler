from celery import Celery
from app.core.config import settings
from app.db.session import SessionLocal
from app.models.wallet import Wallet
from app.services import etl, scoring

celery_app = Celery(
    "fraud_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)


@celery_app.task(name="ingest_and_score_task")
def ingest_and_score_task(address: str):
    """Fetch txs → score → save into DB"""
    address = address.lower()

    # run your ETL
    normal = etl.fetch_normal_txs(address)
    internal = etl.fetch_internal_txs(address)
    token = etl.fetch_token_txs(address)

    # calculate score
    score, level = scoring.score_wallet(normal, internal, token)

    # Save to DB
    db = SessionLocal()
    wallet = Wallet(
        address=address,
        score=score,
        risk_level=level,
    )
    db.merge(wallet)   # upsert: insert or update if exists
    db.commit()
    db.close()

    return {"address": address, "score": score, "level": level}
