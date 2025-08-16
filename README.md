# 🛡️ On-Chain Fraud Detection & Wallet Profiler (Etherscan V2)

Backend + smart contracts for a consumer app that detects suspicious wallets and profiles risk, built for **Base** and the **Onchain Summer Awards 2025**.

This bundle uses the **Etherscan V2 Multichain API** (single API key, pass `chainid=8453` for Base mainnet or `84532` for Base Sepolia).

## Quickstart

1. Create a `.env` in the project root (copy `.env.example` and fill values).
2. Install Docker Desktop and run:
   ```bash
   docker compose up --build
   ```
3. Open API docs: http://localhost:8000/docs
4. Try it:
   - `POST /v1/ingest/{address}`
   - `GET /v1/score/{address}`

## Project Layout

```
On-Chain-Fraud-Detection-Wallet-Profiler/
├─ docker-compose.yml
├─ .env.example
├─ README.md
├─ backend/
│  ├─ Dockerfile
│  ├─ entrypoint.sh
│  ├─ requirements.txt
│  ├─ alembic.ini
│  ├─ alembic/
│  │  ├─ env.py
│  │  └─ versions/
│  │     └─ 20250816_0001_init.py
│  └─ app/
│     ├─ __init__.py
│     ├─ main.py
│     ├─ api/
│     │  ├─ __init__.py
│     │  ├─ router.py
│     │  └─ v1/
│     │     ├─ __init__.py
│     │     ├─ health.py
│     │     ├─ ingest.py
│     │     ├─ score.py
│     │     ├─ wallets.py
│     │     └─ labels.py
│     ├─ core/
│     │  ├─ __init__.py
│     │  └─ config.py
│     ├─ db/
│     │  ├─ __init__.py
│     │  ├─ base.py
│     │  └─ session.py
│     ├─ models/
│     │  ├─ __init__.py
│     │  ├─ wallet.py
│     │  └─ label.py
│     ├─ services/
│     │  ├─ __init__.py
│     │  ├─ etl.py
│     │  ├─ features.py
│     │  ├─ scoring.py
│     │  └─ constants.py
│     ├─ workers/
│     │  ├─ __init__.py
│     │  ├─ celery_app.py
│     │  └─ tasks.py
│     └─ data/
│        └─ known_bad_addresses.json
└─ hardhat/
   ├─ package.json
   ├─ hardhat.config.ts
   ├─ contracts/
   │  └─ BaseTrustRegistry.sol
   └─ scripts/
      └─ deploy.ts
```

## Etherscan V2 note

- Base URL: `https://api.etherscan.io/v2/api`
- Add `chainid=8453` (Base mainnet) or `chainid=84532` (Base Sepolia) to queries.
- Example:
  ```bash
  curl "https://api.etherscan.io/v2/api?chainid=8453&module=account&action=txlist&address=0x...&apikey=YOUR_KEY"
  ```

