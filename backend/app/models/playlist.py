from sqlalchemy import Column, String, DateTime, func, UniqueConstraint
from sqlalchemy.orm import relationship
from ..database import Base

class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    description = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationship with songs through PlaylistSong junction table
    songs = relationship("Song", secondary="playlist_songs", back_populates="playlists")
    playlist_songs = relationship("PlaylistSong", back_populates="playlist", cascade="all, delete-orphan", overlaps="songs")

    __table_args__ = (UniqueConstraint('name', name='uq_playlist_name'),)
