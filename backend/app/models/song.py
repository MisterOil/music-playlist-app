from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from ..database import Base
from .playlist_song import PlaylistSong

class Song(Base):
    __tablename__ = "songs"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String, index=True)
    album = Column(String, nullable=True)
    album_img = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    added_at = Column(DateTime, default=func.now())
    playlist_id = Column(String, ForeignKey("playlists.id"), nullable=True)

    playlist = relationship("Playlist", back_populates="songs")
    playlist_songs = relationship("PlaylistSong", back_populates="song", cascade="all, delete-orphan")
