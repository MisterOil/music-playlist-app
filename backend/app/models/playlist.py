from sqlalchemy import Column, String, DateTime, func, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY  # Import ARRAY for storing song IDs
from ..database import Base
from .playlist_song import PlaylistSong

class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)  # Ensure name is unique
    description = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    songs = relationship("Song", back_populates="playlist", cascade="all, delete-orphan")
    playlist_songs = relationship("PlaylistSong", back_populates="playlist", cascade="all, delete-orphan")

    __table_args__ = (UniqueConstraint('name', name='uq_playlist_name'),)
