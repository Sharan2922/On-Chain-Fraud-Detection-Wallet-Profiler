#!/usr/bin/env bash
set -euo pipefail
ruff check . || true
black .
