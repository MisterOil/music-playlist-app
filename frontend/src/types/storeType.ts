import type { Playlist, Song } from "./playlistType"

export interface PlaylistStore {
  playlists: Playlist[]
  currentPlaylist: Playlist | null
  searchResults: Song[]
  isSearching: boolean
  searchQuery: string
  
  // All Songs pagination
  allSongs: Song[]
  allSongsTotal: number
  allSongsLimit: number
  allSongsOffset: number
  allSongsHasMore: boolean
  isLoadingAllSongs: boolean
  
  // Playlist actions
  createPlaylist: (name: string, description?: string) => Promise<Playlist>
  setCurrentPlaylist: (id: string) => Promise<void>
  updatePlaylist: (id: string, updates: Partial<Playlist>) => Promise<Playlist>
  deletePlaylist: (id: string) => Promise<void>
  
  // Song actions
  addSongToPlaylist: (playlistId: string, song: Omit<Song, "id" | "addedAt">) => Promise<Song>
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>
  
  // Search actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: Song[]) => void
  clearSearch: () => void

  // All Songs pagination actions
  fetchAllSongs: (limit?: number, offset?: number) => Promise<void>
  setAllSongsLimit: (limit: number) => void
  setAllSongsOffset: (offset: number) => void

  // Initialize data
  initializePlaylists: () => Promise<void>
}