# backend/app/workers/celery_app.py

from celery import Celery
from app.core.config import settings

# Use the Redis URL from your .env (you already verified it's redis://localhost:6379/0)
celery_app = Celery(
    "fraud_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.workers.tasks"],  # ensure tasks module is imported
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

# also allow discovery of tasks in this package (harmless redundancy but robust)
celery_app.autodiscover_tasks(["app.workers"])
