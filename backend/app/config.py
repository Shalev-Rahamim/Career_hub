import os
from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # AI Provider Selection: "openai" or "google"
    MODEL_PROVIDER: str = Field(default="google", validation_alias="MODEL_PROVIDER")
    LLM_MODEL: str = Field(default="gemini-2.0-flash", validation_alias="LLM_MODEL")
    
    # API Keys & Sensitive Data
    OPENAI_API_KEY: str = Field(default="", validation_alias="OPENAI_API_KEY")
    GOOGLE_API_KEY: str = Field(default="", validation_alias="GOOGLE_API_KEY")
    
    # Database Configuration
    DATABASE_URL: str = Field(default="sqlite:///./career_hub.db", validation_alias="DATABASE_URL")
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Vector DB Directory
    CHROMA_DB_DIR: str = Field(default="./chroma_db", validation_alias="CHROMA_DB_DIR")
    
    # Environment configs
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

# Instantiate settings singleton
settings = Settings()
