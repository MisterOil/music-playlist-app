from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from ..database import Base

class Song(Base):
    __tablename__ = "songs"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String, index=True)
    album = Column(String, nullable=True)
    album_img = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    added_at = Column(DateTime, default=func.now())

    playlists = relationship("Playlist", secondary="playlist_songs", back_populates="songs", overlaps="playlist_songs")
    playlist_songs = relationship("PlaylistSong", back_populates="song", cascade="all, delete-orphan", overlaps="playlists,songs")
