from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class PlaylistSong(Base):
    __tablename__ = "playlist_songs"

    playlist_id = Column(String, ForeignKey("playlists.id"), primary_key=True)
    song_id = Column(String, ForeignKey("songs.id"), primary_key=True)

    playlist = relationship("Playlist", back_populates="playlist_songs")
    song = relationship("Song", back_populates="playlist_songs")
