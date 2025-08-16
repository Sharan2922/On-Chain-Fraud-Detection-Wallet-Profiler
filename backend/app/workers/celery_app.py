from celery import Celery
from app.core.config import settings

celery = Celery("ocs_fraud",
                broker=settings.REDIS_URL,
                backend=settings.REDIS_URL)
celery.conf.task_queues = {
    "default": {},
    "etl": {},
    "scoring": {},
}
