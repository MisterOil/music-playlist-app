export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  albumImg?: string
  duration?: string
  addedAt?: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  coverImage?: string
  songs: Song[]
  createdBy?: string
  songCount?: number
  duration?: string
}

