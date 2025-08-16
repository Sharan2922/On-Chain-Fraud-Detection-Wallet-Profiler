from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    ENV: str = Field(default="dev")
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"
    BASE_RPC_URL: str = ""
    BASESCAN_API_KEY: str = ""
    MODEL_DIR: str = "./data/models"

    class Config:
        env_file = "backend/.env"
        extra = "ignore"

settings = Settings()
