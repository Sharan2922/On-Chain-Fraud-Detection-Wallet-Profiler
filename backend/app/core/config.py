# backend/app/core/config.py
import os
from pathlib import Path

# Pydantic v2
from pydantic import Field, AliasChoices
from pydantic_settings import BaseSettings, SettingsConfigDict

# Point to the repo root ".env" (…/On-Chain-Fraud-Detection-Wallet-Profiler/.env)
REPO_ROOT = Path(__file__).resolve().parents[3]
ENV_PATH = REPO_ROOT / ".env"

class Settings(BaseSettings):
    # --- Database ---
    POSTGRES_USER: str = "frauduser"
    POSTGRES_PASSWORD: str = "fraudpass"
    POSTGRES_DB: str = "frauddb"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    # --- Redis ---
    REDIS_URL: str = "redis://localhost:6379/0"

    # --- Blockchain ---
    SEPOLIA_RPC_URL: str | None = None

    # Accept either PRIVATE_KEY or WALLET_PRIVATE_KEY from env
    PRIVATE_KEY: str | None = Field(
        default=None,
        validation_alias=AliasChoices("PRIVATE_KEY", "WALLET_PRIVATE_KEY"),
    )

    CONTRACT_ADDRESS: str | None = None
    CHAIN_ID: int = 11155111  # Sepolia

    # Optional
    ETHERSCAN_API_KEY: str | None = None

    # Tell pydantic-settings where to read env from
    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()
