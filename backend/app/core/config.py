from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./playlists.db")
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Music Playlist API"
    
    class Config:
        env_file = ".env"

settings = Settings()
