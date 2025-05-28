from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .song import Song

class PlaylistBase(BaseModel):
    name: str
    description: Optional[str] = None
    cover_image: Optional[str] = None

class PlaylistCreate(PlaylistBase):
    cover_image: Optional[str] = None

class Playlist(PlaylistBase):
    id: str
    created_at: datetime
    updated_at: datetime
    songs: List[str] = []  # Add a field to represent song IDs
    
    class Config:
        from_attributes = True

class PlaylistWithSongs(Playlist):
    songs: List[Song] = []
