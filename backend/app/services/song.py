from sqlalchemy.orm import Session
import uuid
from typing import List, Optional
from datetime import datetime
from ..models.song import Song
from ..models.playlist import Playlist
from ..models.playlist_song import PlaylistSong
from ..schemas.song import SongCreate

def get_all_songs(db: Session, skip: int = 0, limit: int = 10) -> List[Song]:
    """Get all songs with pagination"""
    return db.query(Song).offset(skip).limit(limit).all()

def count_songs(db: Session) -> int:
    """Get total count of songs"""
    return db.query(Song).count()

def get_songs_by_playlist(db: Session, playlist_id: str, skip: int = 0, limit: int = 100) -> dict:
    """Get all songs in a playlist with pagination"""
    playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()
    if not playlist:
        return {
            "items": [],
            "total": 0,
            "limit": limit,
            "skip": skip,
            "has_more": False
        }
    
    total_songs = len(playlist.songs)
    songs = playlist.songs[skip:skip+limit]
    
    return {
        "items": songs,
        "total": total_songs,
        "limit": limit,
        "skip": skip,
        "has_more": skip + limit < total_songs
    }

def find_existing_song(db: Session, title: str, artist: str, album: str = None) -> Optional[Song]:
    """Find an existing song by title, artist, and album"""
    query = db.query(Song).filter(Song.title == title, Song.artist == artist)
    if album:
        query = query.filter(Song.album == album)
    return query.first()

def add_song_to_playlist(db: Session, playlist_id: str, song: SongCreate) -> Song:
    """Add a song to a playlist. Reuse existing song if found, otherwise create new one."""
    playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()
    if not playlist:
        raise ValueError("Playlist not found")
    
    # Check if song already exists
    existing_song = find_existing_song(db, song.title, song.artist, song.album)
    
    if existing_song:
        # Check if song is already in this playlist
        existing_association = db.query(PlaylistSong).filter(
            PlaylistSong.playlist_id == playlist_id,
            PlaylistSong.song_id == existing_song.id
        ).first()
        
        if existing_association:
            raise ValueError("Song is already in this playlist")
        
        # Create playlist-song association with existing song
        playlist_song = PlaylistSong(
            playlist_id=playlist_id,
            song_id=existing_song.id
        )
        db.add(playlist_song)
        db.commit()
        return existing_song
    else:
        # Create new song
        db_song = Song(
            id=str(uuid.uuid4()),
            title=song.title,
            artist=song.artist,
            album=song.album,
            album_img=song.album_img,
            duration=song.duration,
            added_at=datetime.now()
        )
        db.add(db_song)
        
        # Create playlist-song association
        playlist_song = PlaylistSong(
            playlist_id=playlist_id,
            song_id=db_song.id
        )
        db.add(playlist_song)
        
        db.commit()
        db.refresh(db_song)
        return db_song

def remove_song_from_playlist(db: Session, playlist_id: str, song_id: str) -> bool:
    """Remove a song from a playlist"""
    playlist_song = db.query(PlaylistSong).filter(
        PlaylistSong.playlist_id == playlist_id,
        PlaylistSong.song_id == song_id
    ).first()
    
    if playlist_song:
        db.delete(playlist_song)
        db.commit()
        return True
    return False
