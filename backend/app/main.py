from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .database import engine, Base
from .routes import playlist_router, song_router
from .services.mock_song_data import generate_mock_songs
from sqlalchemy.orm import Session
from .database import get_db

app = FastAPI(title="Music Playlist API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(playlist_router)
app.include_router(song_router)

@app.on_event("startup")
def startup_populate_db():
    # Initialize database with mock songs if empty
    db = next(get_db())
    from .models.song import Song

    # Populate songs
    if db.query(Song).count() == 0:
        db.bulk_save_objects(generate_mock_songs())
        db.commit()

@app.get("/", tags=["root"])
def read_root():
    return {"message": "Welcome to Music Playlist API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
