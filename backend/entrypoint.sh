#!/usr/bin/env bash
set -euo pipefail
# Run Alembic migrations
alembic upgrade head || true
# Start API
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
