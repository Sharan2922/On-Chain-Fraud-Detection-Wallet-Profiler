# 🛡️ On-Chain Fraud Detection & Wallet Profiler

A full-stack dApp for **detecting risky wallets and contracts on-chain**, combining:
- 🚀 FastAPI backend (risk analysis, database, contract interactions)  
- 💻 React + Vite frontend (wallet connection, UI)  
- ⛓️ Ethereum Sepolia testnet smart contract integration  

---

## 🌍 Live Deployment
- **Frontend (Vercel)** → [on-chain-fraud-detection-wallet-pro.vercel.app](https://on-chain-fraud-detection-wallet-pro.vercel.app)  
- **Backend (Render)** → [on-chain-fraud-detection-wallet-profiler-41ox.onrender.com](https://on-chain-fraud-detection-wallet-profiler-41ox.onrender.com)  

---

## 📂 Project Structure
```

On-Chain-Fraud-Detection-Wallet-Profiler/
│── backend/           # FastAPI app
│   ├── app/
│   │   ├── api/       # Routers (/v1/ingest, /v1/score, /v1/wallets, etc.)
│   │   ├── models/    # SQLAlchemy models
│   │   ├── services/  # Contract services
│   │   └── main.py    # FastAPI entrypoint
│   └── requirements.txt
│
│── frontend/          # React + Vite app
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
│── contracts/         # Solidity smart contracts
│── scripts/           # Deployment scripts (Hardhat/ethers.js)
│── README.md

````

---

## ⚡ Local Development

### 1️⃣ Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --port 8000
````

👉 API will be live at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 2️⃣ Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

👉 App will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL=sqlite:///./wallets.db
PRIVATE_KEY=your_wallet_private_key   # for contract writes
RPC_URL=https://sepolia.infura.io/v3/<your-infura-id>
CONTRACT_ADDRESS=0x...                # deployed WalletProfiler contract
```

### Frontend (`frontend/.env.local` or Vercel → Environment Variables)

```
VITE_BACKEND_URL=https://on-chain-fraud-detection-wallet-profiler-41ox.onrender.com
VITE_WALLETCONNECT_PROJECT_ID=<your-walletconnect-project-id>
```

⚠️ You can get a **WalletConnect Project ID** from: [https://cloud.walletconnect.com](https://cloud.walletconnect.com)

---

## 🚀 Deployment

### Backend → Render

1. Push code to GitHub.
2. Create a new **Web Service** in [Render](https://render.com/).
3. Select `backend/` as root folder.
4. Environment: **Python 3.10+**
5. Start command:

   ```
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
6. Add `.env` variables in Render dashboard.

---

### Frontend → Vercel

1. Import repo into [Vercel](https://vercel.com/).
2. Select `frontend/` as root folder.
3. Add environment variables:

   ```
   VITE_BACKEND_URL=https://on-chain-fraud-detection-wallet-profiler-41ox.onrender.com
   VITE_WALLETCONNECT_PROJECT_ID=<your-walletconnect-project-id>
   ```
4. Deploy → live link auto generated.

---

## ⛓️ Smart Contracts

* Contracts are in `contracts/` folder.
* Deployed using **Hardhat** on **Sepolia** testnet.
* Update `CONTRACT_ADDRESS` in backend `.env` after deployment.

---

## ✅ Features

* Detect risky wallets with DB + scoring system
* Label addresses & fetch history
* On-chain contract message store & update
* Wallet connection via WalletConnect / MetaMask
* Deployed full-stack (Vercel + Render)

---

## 👨‍💻 Tech Stack

* **Backend**: FastAPI, SQLAlchemy, Uvicorn
* **Frontend**: React, Vite, Tailwind, shadcn/ui
* **Blockchain**: Solidity, ethers.js, Hardhat
* **Infra**: Render (backend), Vercel (frontend)

---

## 📜 License

MIT License © 2025

```

---
