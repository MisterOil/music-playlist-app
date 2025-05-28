import { create } from "zustand";
import type { PlaylistStore } from "../types";
import {
  fetchPlaylists,
  fetchPlaylistById,
  createPlaylist as apiCreatePlaylist,
  updatePlaylist as apiUpdatePlaylist,
  deletePlaylist as apiDeletePlaylist,
  addSongToPlaylist as apiAddSong,
  removeSongFromPlaylist as apiRemoveSong,
  fetchAllSongs,
} from "../services/apiService";

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  searchResults: [],
  isSearching: false,
  searchQuery: "",

  // All Songs pagination
  allSongs: [],
  allSongsTotal: 0,
  allSongsLimit: 10,
  allSongsOffset: 0,
  allSongsHasMore: false,
  isLoadingAllSongs: false,

  // Playlist actions
  createPlaylist: async (name, description) => {
    try {
      const newPlaylist = await apiCreatePlaylist({ name, description });
      set((state) => ({ playlists: [...state.playlists, newPlaylist] }));
      return newPlaylist;
    } catch (error) {
      console.error("Failed to create playlist:", error);
      throw error;
    }
  },

  setCurrentPlaylist: async (id) => {
    try {
      const playlist = await fetchPlaylistById(id);
      set({ currentPlaylist: playlist });
    } catch (error) {
      console.error("Failed to fetch playlist:", error);
    }
  },

  updatePlaylist: async (id, updates) => {
    try {
      const updatedPlaylist = await apiUpdatePlaylist(id, updates);
      set((state) => ({
        playlists: state.playlists.map((p) =>
          p.id === id ? updatedPlaylist : p
        ),
        currentPlaylist:
          state.currentPlaylist?.id === id
            ? updatedPlaylist
            : state.currentPlaylist,
      }));
      return updatedPlaylist;
    } catch (error) {
      console.error("Failed to update playlist:", error);
      throw error;
    }
  },

  deletePlaylist: async (id) => {
    try {
      await apiDeletePlaylist(id);
      set((state) => ({
        playlists: state.playlists.filter((p) => p.id !== id),
        currentPlaylist:
          state.currentPlaylist?.id === id ? null : state.currentPlaylist,
      }));
    } catch (error) {
      console.error("Failed to delete playlist:", error);
      throw error;
    }
  },

  // Song actions
  addSongToPlaylist: async (playlistId, song) => {
    try {
      const addedSong = await apiAddSong(playlistId, song);
      set((state) => {
        const updatedPlaylists = state.playlists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: [...(playlist.songs || []), addedSong],
              songCount: (playlist.songCount || 0) + 1,
            };
          }
          return playlist;
        });

        let updatedCurrentPlaylist = state.currentPlaylist;
        if (state.currentPlaylist?.id === playlistId) {
          updatedCurrentPlaylist = {
            ...state.currentPlaylist,
            songs: [...state.currentPlaylist.songs, addedSong],
            songCount: (state.currentPlaylist.songCount || 0) + 1,
          };
        }

        return {
          playlists: updatedPlaylists,
          currentPlaylist: updatedCurrentPlaylist,
        };
      });

      return addedSong;
    } catch (error) {
      console.error("Failed to add song:", error);
      throw error;
    }
  },

  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      await apiRemoveSong(songId);

      set((state) => {
        const updatedPlaylists = state.playlists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: (playlist.songs || []).filter((song) => song.id !== songId),
              songCount: Math.max(0, (playlist.songCount || 1) - 1),
            };
          }
          return playlist;
        });

        let updatedCurrentPlaylist = state.currentPlaylist;
        if (state.currentPlaylist?.id === playlistId) {
          updatedCurrentPlaylist = {
            ...state.currentPlaylist,
            songs: state.currentPlaylist.songs.filter(
              (song) => song.id !== songId
            ),
            songCount: Math.max(0, (state.currentPlaylist.songCount || 1) - 1),
          };
        }

        return {
          playlists: updatedPlaylists,
          currentPlaylist: updatedCurrentPlaylist,
        };
      });
    } catch (error) {
      console.error("Failed to remove song:", error);
      throw error;
    }
  },

  // Search actions
  setSearchQuery: (query) =>
    set({ searchQuery: query, isSearching: query.length > 0 }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearch: () => set({ searchQuery: "", searchResults: [], isSearching: false }),

  // Initialize data
  initializePlaylists: async () => {
    try {
      const playlists = await fetchPlaylists();
      set({ playlists });
    } catch (error) {
      console.error("Failed to initialize playlists:", error);
    }
  },

  // All Songs pagination actions
  fetchAllSongs: async (limit, offset) => {
    try {
      const state = get();
      const useLimit = limit !== undefined ? limit : state.allSongsLimit;
      const useOffset = offset !== undefined ? offset : state.allSongsOffset;

      set({ isLoadingAllSongs: true });

      const response = await fetchAllSongs(useLimit, useOffset);

      set({
        allSongs: response.items,
        allSongsTotal: response.total,
        allSongsLimit: response.limit,
        allSongsOffset: response.offset,
        allSongsHasMore: response.hasMore,
        isLoadingAllSongs: false,
      });
    } catch (error) {
      console.error("Failed to fetch all songs:", error);
      set({ isLoadingAllSongs: false });
    }
  },

  setAllSongsLimit: (limit) => {
    set({ allSongsLimit: limit });
    get().fetchAllSongs(limit, 0);
  },

  setAllSongsOffset: (offset) => {
    set({ allSongsOffset: offset });
    get().fetchAllSongs(undefined, offset);
  },
}));
