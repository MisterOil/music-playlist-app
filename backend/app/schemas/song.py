from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SongBase(BaseModel):
    title: str
    artist: str
    album: Optional[str] = None
    album_img: Optional[str] = None
    duration: Optional[str] = None

class SongCreate(SongBase):
    pass

class Song(SongBase):
    id: str
    added_at: datetime
    
    class Config:
        from_attributes = True

class SongList(BaseModel):
    items: List[Song]
    total: int
    limit: int
    offset: int
    has_more: bool
