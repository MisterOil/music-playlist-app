from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.playlist import Playlist, PlaylistCreate, PlaylistWithSongs
from ..services import playlist as playlist_service

router = APIRouter(prefix="/playlists", tags=["playlists"])

@router.get("/", response_model=List[Playlist])
def read_playlists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all playlists with pagination"""
    return playlist_service.get_playlists(db, skip=skip, limit=limit)

@router.get("/{playlist_id}", response_model=PlaylistWithSongs)
def read_playlist(playlist_id: str, db: Session = Depends(get_db)):
    """Get a specific playlist by ID"""
    playlist = playlist_service.get_playlist(db, playlist_id=playlist_id)
    if not playlist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    return playlist

@router.post("/", response_model=Playlist, status_code=status.HTTP_201_CREATED)
def create_playlist(playlist: PlaylistCreate, db: Session = Depends(get_db)):
    """Create a new playlist"""
    try:
        return playlist_service.create_playlist(db, playlist=playlist)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.put("/{playlist_id}", response_model=Playlist)
def update_playlist(playlist_id: str, playlist_data: dict, db: Session = Depends(get_db)):
    """Update a playlist by ID"""
    updated_playlist = playlist_service.update_playlist(db, playlist_id=playlist_id, playlist_data=playlist_data)
    if not updated_playlist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    return updated_playlist

@router.delete("/{playlist_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_playlist(playlist_id: str, db: Session = Depends(get_db)):
    """Delete a playlist by ID"""
    success = playlist_service.delete_playlist(db, playlist_id=playlist_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    return None
