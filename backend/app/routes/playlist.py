from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.playlist import Playlist, PlaylistCreate, PlaylistWithSongs
from ..schemas.song import Song as SongSchema
from ..services import playlist as playlist_service

router = APIRouter(prefix="/playlists", tags=["playlists"])

@router.get("/", response_model=List[PlaylistWithSongs])
def read_playlists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all playlists with pagination"""
    playlists = playlist_service.get_playlists(db, skip=skip, limit=limit)
    
    result = []
    for playlist in playlists:
        playlist_dict = {
            "id": playlist.id,
            "name": playlist.name,
            "description": playlist.description,
            "cover_image": playlist.cover_image,
            "created_at": playlist.created_at,
            "updated_at": playlist.updated_at,
            "songs": [SongSchema.model_validate(song) for song in playlist.songs],
            "song_count": len(playlist.songs)
        }
        result.append(playlist_dict)
    
    return result

@router.get("/{playlist_id}", response_model=PlaylistWithSongs)
def read_playlist(playlist_id: str, db: Session = Depends(get_db)):
    """Get a specific playlist by ID"""
    playlist = playlist_service.get_playlist(db, playlist_id=playlist_id)
    if not playlist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    
    return {
        "id": playlist.id,
        "name": playlist.name,
        "description": playlist.description,
        "cover_image": playlist.cover_image,
        "created_at": playlist.created_at,
        "updated_at": playlist.updated_at,
        "songs": [SongSchema.model_validate(song) for song in playlist.songs],
        "song_count": len(playlist.songs)
    }

@router.post("/", response_model=PlaylistWithSongs, status_code=status.HTTP_201_CREATED)
def create_playlist(playlist: PlaylistCreate, db: Session = Depends(get_db)):
    """Create a new playlist"""
    try:
        new_playlist = playlist_service.create_playlist(db, playlist=playlist)
        return {
            "id": new_playlist.id,
            "name": new_playlist.name,
            "description": new_playlist.description,
            "cover_image": new_playlist.cover_image,
            "created_at": new_playlist.created_at,
            "updated_at": new_playlist.updated_at,
            "songs": [],
            "song_count": 0
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.put("/{playlist_id}", response_model=PlaylistWithSongs)
def update_playlist(playlist_id: str, playlist_data: dict, db: Session = Depends(get_db)):
    """Update a playlist by ID"""
    updated_playlist = playlist_service.update_playlist(db, playlist_id=playlist_id, playlist_data=playlist_data)
    if not updated_playlist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    
    return {
        "id": updated_playlist.id,
        "name": updated_playlist.name,
        "description": updated_playlist.description,
        "cover_image": updated_playlist.cover_image,
        "created_at": updated_playlist.created_at,
        "updated_at": updated_playlist.updated_at,
        "songs": [SongSchema.model_validate(song) for song in updated_playlist.songs],
        "song_count": len(updated_playlist.songs)
    }

@router.delete("/{playlist_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_playlist(playlist_id: str, db: Session = Depends(get_db)):
    """Delete a playlist by ID"""
    success = playlist_service.delete_playlist(db, playlist_id=playlist_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Playlist not found")
    return None
