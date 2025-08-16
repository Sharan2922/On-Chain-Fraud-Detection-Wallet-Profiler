# backend/app/workers/__init__.py

# Importing the app here ensures it's initialized whenever the package is imported.
from .celery_app import celery_app  # noqa: F401
