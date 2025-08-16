#!/usr/bin/env bash
set -euo pipefail

# Migrate DB
alembic -c /app/alembic.ini upgrade head

# Start API
uvicorn app.main:app --host 0.0.0.0 --port ${APP_PORT:-8000}
