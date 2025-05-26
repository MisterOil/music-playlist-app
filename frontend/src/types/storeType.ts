import type { Playlist, Song } from "./playlistType"

export interface PlaylistStore {
  playlists: Playlist[]
  currentPlaylist: Playlist | null
  searchResults: Song[]
  isSearching: boolean
  searchQuery: string
  
  // Playlist actions
  createPlaylist: (name: string, description?: string) => void
  setCurrentPlaylist: (id: string) => void
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void
  deletePlaylist: (id: string) => void
  
  // Song actions
  addSongToPlaylist: (playlistId: string, song: Song) => void
  removeSongFromPlaylist: (playlistId: string, songId: string) => void
  
  // Search actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: Song[]) => void
  clearSearch: () => void
}