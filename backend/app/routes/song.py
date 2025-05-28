from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.song import Song, SongCreate, SongList, SongInPlaylist
from ..services import song as song_service
from ..services import playlist as playlist_service

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
        "skip": skip,
        "has_more": skip + limit < total
    }

@router.get("/{playlist_id}", response_model=SongList)
def read_songs_by_playlist(playlist_id: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    playlist = playlist_service.get_playlist(db, playlist_id=playlist_id)
    if playlist is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    
    result = song_service.get_songs_by_playlist(db, playlist_id=playlist_id, skip=skip, limit=limit)
    return result

@router.post("/{playlist_id}", response_model=Song, status_code=status.HTTP_201_CREATED)
def add_song_to_playlist(playlist_id: str, song: SongCreate, db: Session = Depends(get_db)):
    """
    Add a song to a specific playlist.
    Corrected endpoint from /{playlist_id}/songs to /{playlist_id}
    """
    try:
        return song_service.add_song_to_playlist(db, playlist_id=playlist_id, song=song)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.delete("/{playlist_id}/{song_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_song_from_playlist(playlist_id: str, song_id: str, db: Session = Depends(get_db)):
    """Remove a song from a specific playlist"""
    result = song_service.remove_song_from_playlist(db, playlist_id=playlist_id, song_id=song_id)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Song not found in playlist")
    return None
