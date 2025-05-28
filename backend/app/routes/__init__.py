from fastapi import FastAPI  # Ensure FastAPI is imported

from .playlist import router as playlist_router
from .song import router as song_router