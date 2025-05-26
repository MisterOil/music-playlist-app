import { create } from 'zustand'
import type { PlaylistStore, Playlist } from '../types'
import { v4 as uuidv4 } from 'uuid'

const defaultPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'เพลงที่ถูกใจ',
    description: 'Your favorite songs',
    coverImage: '',
    songs: [],
    createdBy: 'You',
    songCount: 0
  },
  {
    id: '2',
    name: 'eng',
    description: 'English songs',
    coverImage: '',
    songs: [],
    createdBy: 'You',
    songCount: 0
  },
  {
    id: '3',
    name: 'เพลย์ลิสต์ของวัน #1',
    description: 'Daily mix',
    coverImage: '',
    songs: [],
    createdBy: 'You',
    songCount: 0
  }
];

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: defaultPlaylists,
  currentPlaylist: null,
  searchResults: [],
  isSearching: false,
  searchQuery: '',

  // Playlist actions
  createPlaylist: (name, description) => set((state) => {
    const newPlaylist: Playlist = {
      id: uuidv4(),
      name,
      description: description || '',
      coverImage: '',
      songs: [],
      createdBy: 'You',
      songCount: 0
    };
    return { playlists: [...state.playlists, newPlaylist] };
  }),

  setCurrentPlaylist: (id) => set((state) => ({
    currentPlaylist: state.playlists.find(playlist => playlist.id === id) || null
  })),

  updatePlaylist: (id, updates) => set((state) => ({
    playlists: state.playlists.map((playlist) => 
      playlist.id === id ? { ...playlist, ...updates } : playlist
    )
  })),

  deletePlaylist: (id) => set((state) => ({
    playlists: state.playlists.filter((playlist) => playlist.id !== id),
    currentPlaylist: state.currentPlaylist?.id === id ? null : state.currentPlaylist
  })),

  // Song actions
  addSongToPlaylist: (playlistId, song) => set((state) => ({
    playlists: state.playlists.map((playlist) => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            songs: [...playlist.songs, song],
            songCount: (playlist.songCount || 0) + 1
          } 
        : playlist
    ),
    currentPlaylist: state.currentPlaylist?.id === playlistId 
      ? { 
          ...state.currentPlaylist, 
          songs: [...state.currentPlaylist.songs, song],
          songCount: (state.currentPlaylist.songCount || 0) + 1
        }
      : state.currentPlaylist
  })),

  removeSongFromPlaylist: (playlistId, songId) => set((state) => ({
    playlists: state.playlists.map(playlist => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            songs: playlist.songs.filter(song => song.id !== songId),
            songCount: (playlist.songCount || 0) - 1
          }
        : playlist
    ),
    currentPlaylist: state.currentPlaylist?.id === playlistId
      ? {
          ...state.currentPlaylist,
          songs: state.currentPlaylist.songs.filter(song => song.id !== songId),
          songCount: (state.currentPlaylist.songCount || 0) - 1
        }
      : state.currentPlaylist
  })),

  // Search actions
  setSearchQuery: (query) => set({ searchQuery: query, isSearching: query.length > 0 }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  clearSearch: () => set({ searchQuery: '', searchResults: [], isSearching: false })
}));
