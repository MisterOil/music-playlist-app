from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.song import Song, SongCreate, SongList
from ..services import song as song_service
from ..services import playlist as playlist_service
from ..models.playlist_song import PlaylistSong as PlaylistSongModel

router = APIRouter(prefix="/songs", tags=["songs"])

@router.get("/", response_model=SongList)
def read_all_songs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all songs with pagination"""
    songs = song_service.get_all_songs(db, skip=skip, limit=limit)
    total = song_service.count_songs(db)
    return {
        "items": songs,
        "total": total,
        "limit": limit,
        "offset": skip,
        "has_more": skip + limit < total
    }

@router.get("/{playlist_id}", response_model=List[Song])
def read_songs_by_playlist(playlist_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    playlist = playlist_service.get_playlist(db, playlist_id=playlist_id)
    if playlist is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    
    songs = song_service.get_songs_by_playlist(db, playlist_id=playlist_id, skip=skip, limit=limit)
    return songs

@router.delete("/{song_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_song(song_id: str, db: Session = Depends(get_db)):
    result = song_service.remove_song_from_playlist(db, song_id=song_id)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found")
    return None

@router.delete("/{playlist_id}/songs/{song_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_song_from_playlist(playlist_id: str, song_id: str, db: Session = Depends(get_db)):
    """
    Delete a song from a specific playlist.
    """
    db_playlist_song = db.query(PlaylistSongModel).filter_by(playlist_id=playlist_id, song_id=song_id).first()
    if not db_playlist_song:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found in the playlist")
    db.delete(db_playlist_song)
    db.commit()
    return None
