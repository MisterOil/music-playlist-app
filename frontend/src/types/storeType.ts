import type { Playlist, Song } from "./playlistType"
interface ToastFunction {
  (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number): void;
}

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

  // Playlist Songs pagination
  playlistSongs: Song[]
  playlistSongsTotal: number
  playlistSongsLimit: number
  playlistSongsOffset: number
  playlistSongsHasMore: boolean
  isLoadingPlaylistSongs: boolean

  setToast: (toastFn: ToastFunction) => void
  toast?: ToastFunction
  
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
  fetchAllSongs: (limit?: number, skip?: number) => Promise<void>
  setAllSongsLimit: (limit: number) => void
  setAllSongsOffset: (skip: number) => void

  // Playlist Songs pagination actions
  fetchPlaylistSongs: (playlistId: string, limit?: number, skip?: number) => Promise<void>
  setPlaylistSongsLimit: (limit: number) => void
  setPlaylistSongsOffset: (skip: number) => void

  // Initialize data
  initializePlaylists: () => Promise<void>
}