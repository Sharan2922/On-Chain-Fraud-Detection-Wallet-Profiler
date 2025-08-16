import os
from pydantic import BaseSettings
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

class Settings(BaseSettings):
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "frauduser")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "fraudpass")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "frauddb")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", 5432))

    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # 🔹 Add missing ones
    ETHERSCAN_API_KEY: str = os.getenv("ETHERSCAN_API_KEY")
    CHAIN_ID: int = int(os.getenv("CHAIN_ID", 1))

settings = Settings()
