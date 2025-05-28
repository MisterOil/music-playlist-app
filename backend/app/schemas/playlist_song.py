from pydantic import BaseModel

class PlaylistSongBase(BaseModel):
    playlist_id: str
    song_id: str

class PlaylistSongCreate(PlaylistSongBase):
    pass

class PlaylistSong(PlaylistSongBase):
    class Config:
        from_attributes = True
