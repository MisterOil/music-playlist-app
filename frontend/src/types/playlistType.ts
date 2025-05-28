export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  album_img?: string
  duration?: string
  added_at?: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  cover_image?: string
  songs: Song[]
  created_at?: string
  updated_at?: string
  song_count?: number
  duration?: string
}

