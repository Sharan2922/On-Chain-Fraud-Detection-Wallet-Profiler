# On-Chain Fraud Detection & Wallet Profiler (Consumer App Backend)

Production-ready backend scaffold for your Onchain Summer Awards submission.
Stack: **FastAPI**, **SQLAlchemy (Postgres)**, **Celery + Redis**, **scikit-learn IsolationForest**, **Web3.py**, **Hardhat (Solidity)**.

> Frontend will be handled by Bolt AI. This repo exposes clean REST APIs and contracts that your UI can call immediately.

---

## ⚙️ Features

- Wallet risk scoring with explainable breakdown
- On-chain logging contract on **Base** (`BaseTrustRegistry`) for engagement & transparency
- ETL ingestion from Base via Alchemy (or equivalent RPC)
- Anomaly detection (IsolationForest) on engineered address features
- Labeling + community reports (on-chain + off-chain)
- Celery workers for async ingestion and scoring
- OpenAPI (Swagger) auto-docs at `/docs`
- Strict typing, Pydantic models, structured logs

---

## 🗂 Project Structure

```
ocs-fraud-backend/
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
      workers/
      __init__.py
      main.py
    alembic/
      versions/
    alembic.ini
    requirements.txt
    .env.example
  contracts/
    BaseTrustRegistry.sol
  hardhat/
    hardhat.config.ts
    scripts/deploy.ts
    package.json
    tsconfig.json
    .env.example
  scripts/
    dev_run.sh
    format.sh
  README.md
```

---

## 🛠 Prerequisites

- Python 3.10+
- Redis (e.g., `redis-server` locally or Docker)
- Postgres 14+
- Node.js 18+ (for Hardhat)
- Alchemy (or equivalent) RPC URL for **Base** / **Base Sepolia**

---

## 🔐 Environment

Copy and set envs:

```bash
cp backend/.env.example backend/.env
cp hardhat/.env.example hardhat/.env
```

**backend/.env** (edit values):
```
ENV=dev
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/ocs_fraud
REDIS_URL=redis://localhost:6379/0

# Alchemy/Provider (Base or Base Sepolia)
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
BASESCAN_API_KEY=YOUR_BASESCAN_KEY

# Model
MODEL_DIR=./data/models
```

**hardhat/.env**:
```
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
BASE_MAINNET_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_KEY
```

---

## 🗄 Database & Migrations

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

alembic upgrade head
```

> If first run: `alembic revision --autogenerate -m "init"` then `alembic upgrade head`.

---

## ▶️ Run API & Workers (dev)

Terminal 1 (API):
```bash
cd backend && source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Terminal 2 (Celery worker):
```bash
cd backend && source .venv/bin/activate
celery -A app.workers.celery_app worker --loglevel=INFO -Q default,etl,scoring
```

---

## 🤝 Hardhat (Contracts)

```bash
cd hardhat
npm install
npx hardhat compile

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.ts --network base_sepolia
```

The deployment prints the `BaseTrustRegistry` address. Copy it to backend `.env` if you want to emit on-chain events from the API in future enhancements.

---

## 🧪 Quick Test

With API running:

```
GET  /health
POST /v1/ingest/{address}
GET  /v1/score/{address}
GET  /v1/wallets/{address}
POST /v1/labels/{address}
```

Try a Base address like `0x0000000000000000000000000000000000000000` (for demo only).

---

## 🔒 Notes

- This is production-grade scaffold with strong defaults. You can iterate safely.
- Replace placeholder RPC keys and tune the feature rules.
- IsolationForest model starts untrained; it will fit incrementally as data is collected.

---

## 📜 License

MIT


---

## 🐳 One-Command Run (Docker)

**Prereq:** Docker Desktop installed.

1. Set environment variables in your shell (use your provider keys):

```bash
export BASE_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_KEY"
export BASESCAN_API_KEY="YOUR_BASESCAN_KEY"
```

2. Start everything (Postgres, Redis, API, Worker):  
```bash
docker compose up --build
```
3. Open docs: http://localhost:8000/docs

**Notes**
- Add any known bad addresses to `backend/data/known_bad_addresses.json`:
```json
{"addresses": ["0xabc...", "0xdef..."]}
```
- DEX interactions counted using known router addresses for Uniswap V3, Aerodrome, BaseSwap on Base.
- Approvals are detected by function selectors in transaction input (approve/increase/decrease allowance).

---

## 🔎 Data Sources

- Normal txs & ERC20 transfers via **Basescan API**. Set `BASESCAN_API_KEY` in env.
- You can increase pagination in `app/services/etl.py` if you need deeper history.

---

## 🧠 Retraining Endpoint

- `POST /v1/retrain` — refits IsolationForest on all stored feature rows.

---
