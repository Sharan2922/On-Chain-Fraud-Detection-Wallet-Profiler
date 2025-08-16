
# 🛡️ On-Chain Fraud Detection & Wallet Profiler

A fraud detection and wallet profiling system for Web3, built on **Base**.  
This project detects suspicious wallet activity, generates trust scores, and provides APIs for consumer apps and dashboards.  

🚀 Built for the **Onchain Summer Awards 2025**.

---

## 📌 Features
- 🔍 **Wallet Risk Scoring**: Detect suspicious transactions & assign trust scores.  
- 🛑 **Anomaly Detection**: Real-time monitoring of on-chain activity.  
- 📊 **Risk Dashboard API**: Exposes wallet risk profiles to UI/UX frontend apps.  
- ⛓️ **Smart Contracts (Solidity)**: Fraud flagging + trust score storage on Base.  
- ⚡ **Backend (FastAPI + Celery + Redis)**: Async data processing.  
- 🗄️ **Database (Postgres)**: Store wallet profiles and flagged addresses.  
- 🐳 **Dockerized**: One command to run full stack.  

---

## 🛠️ Tech Stack
- **Backend**: FastAPI, Celery, Redis, PostgreSQL  
- **Smart Contracts**: Solidity + Hardhat (deployed on Base)  
- **Infra**: Docker Compose  
- **Monitoring**: Wallet profiler, anomaly detector  

---

## ⚡ Quick Start

### 1. Clone Repo
```bash
git clone https://github.com/Sharan2922/On-Chain-Fraud-Detection-Wallet-Profiler.git
cd On-Chain-Fraud-Detection-Wallet-Profiler
````

### 2. Setup Environment

Create a `.env` file in the root folder:

```env
POSTGRES_USER=frauduser
POSTGRES_PASSWORD=fraudpass
POSTGRES_DB=frauddb
REDIS_URL=redis://redis:6379/0
```

### 3. Run with Docker

```bash
docker compose up --build
```

### 4. Access API

* Swagger Docs → [http://localhost:8000/docs](http://localhost:8000/docs)
* Health Check → [http://localhost:8000/health](http://localhost:8000/health)

---

## 📡 API Endpoints

* `POST /analyze-wallet/` → Analyze a wallet for fraud risk
* `GET /wallet/{address}` → Fetch risk score & flags for a wallet
* `GET /alerts/` → Get recent fraud alerts

---

## ⛓️ Smart Contract

* Located in `hardhat/` folder.
* Deploy:

```bash
cd hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network base
```

---

## 👥 Team & Credits

* Built by **Sharan Shetty** for Onchain Summer Awards 2025.
* Backend: FastAPI, Celery, Solidity
* Frontend: (to be built with Bolt AI)

---

## 📜 License

MIT License

```

---

