from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import uuid
from typing import List, Dict, Any, Optional
from ..models.playlist import Playlist
from ..schemas.playlist import PlaylistCreate

def get_playlists(db: Session, skip: int = 0, limit: int = 100) -> List[Playlist]:
    """Get all playlists"""
    return db.query(Playlist).offset(skip).limit(limit).all()

def get_playlist(db: Session, playlist_id: str) -> Playlist:
    """Get a specific playlist by ID"""
    return db.query(Playlist).filter(Playlist.id == playlist_id).first()

def create_playlist(db: Session, playlist: PlaylistCreate) -> Playlist:
    """Create a new playlist with a default cover image if not provided."""
    db_playlist = Playlist(
        id=str(uuid.uuid4()),
        cover_image=playlist.cover_image or "https://picsum.photos/seed/default/300/300",
        **playlist.dict(exclude={"cover_image"})
    )
    try:
        db.add(db_playlist)
        db.commit()
        db.refresh(db_playlist)
        return db_playlist
    except IntegrityError:
        db.rollback()
        raise ValueError("A playlist with this name already exists.")

def update_playlist(db: Session, playlist_id: str, playlist_data: Dict[str, Any]) -> Optional[Playlist]:
    """Update playlist attributes."""
    playlist = get_playlist(db, playlist_id)
    if not playlist:
        return None
    try:
        for key, value in playlist_data.items():
            setattr(playlist, key, value)
        db.commit()
        db.refresh(playlist)
        return playlist
    except IntegrityError:
        db.rollback()
        raise ValueError("A playlist with this name already exists.")

def delete_playlist(db: Session, playlist_id: str) -> bool:
    """Delete a playlist"""
    playlist = get_playlist(db, playlist_id=playlist_id)
    if playlist:
        db.delete(playlist)
        db.commit()
        return True
    return False

def add_song_to_playlist(db: Session, playlist_id: str, song_id: str) -> Playlist:
    """Add a song to a playlist"""
    playlist = get_playlist(db, playlist_id=playlist_id)
    if not playlist:
        return None
    if song_id not in playlist.songs:
        playlist.songs.append(song_id)
        db.commit()
        db.refresh(playlist)
    return playlist
