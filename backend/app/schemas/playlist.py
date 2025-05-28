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
    
    class Config:
        from_attributes = True

class PlaylistWithSongs(Playlist):
    songs: List[Song] = []
    song_count: Optional[int] = None
    
    class Config:
        from_attributes = True
