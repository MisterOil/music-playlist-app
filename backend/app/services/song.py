from sqlalchemy.orm import Session
import uuid
from typing import List
from ..models.song import Song
from ..schemas.song import SongCreate

def get_all_songs(db: Session, skip: int = 0, limit: int = 10) -> List[Song]:
    """Get all songs with pagination"""
    return db.query(Song).offset(skip).limit(limit).all()

def count_songs(db: Session) -> int:
    """Get total count of songs"""
    return db.query(Song).count()

def get_songs_by_playlist(db: Session, playlist_id: str, skip: int = 0, limit: int = 100) -> List[Song]:
    """Get all songs in a playlist"""
    return db.query(Song).filter(Song.playlist_id == playlist_id).offset(skip).limit(limit).all()

def add_song_to_playlist(db: Session, playlist_id: str, song: SongCreate) -> Song:
    """Add a song to a playlist."""
    db_song = Song(playlist_id=playlist_id, **song.dict())
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song

def remove_song_from_playlist(db: Session, song_id: str) -> bool:
    """Remove a song from a playlist"""
    song = db.query(Song).filter(Song.id == song_id).first()
    if song:
        db.delete(song)
        db.commit()
        return True
    return False
