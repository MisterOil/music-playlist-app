import { create } from "zustand";
import type { PlaylistStore, Song } from "../types";
import {
  fetchPlaylists,
  fetchPlaylistById,
  createPlaylist as apiCreatePlaylist,
  updatePlaylist as apiUpdatePlaylist,
  deletePlaylist as apiDeletePlaylist,
  addSongToPlaylist as apiAddSongToPlaylist,
  removeSongFromPlaylist as apiRemoveSong,
  fetchAllSongs,
  fetchPlaylistSongs,
} from "../services/apiService";

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  searchResults: [],
  isSearching: false,
  searchQuery: "",
  allSongs: [],
  allSongsTotal: 0,
  allSongsLimit: 10,
  allSongsOffset: 0,
  allSongsHasMore: false,
  isLoadingAllSongs: false,
  toast: undefined,

  // Playlist Songs pagination
  playlistSongs: [],
  playlistSongsTotal: 0,
  playlistSongsLimit: 10,
  playlistSongsOffset: 0,
  playlistSongsHasMore: false,
  isLoadingPlaylistSongs: false,

  setToast: (toastFn) => set({ toast: toastFn }),

  // Playlist actions
  createPlaylist: async (name, description) => {
    try {
      const newPlaylist = await apiCreatePlaylist({ name, description });
      set((state) => ({ playlists: [...state.playlists, newPlaylist] }));
      get().toast?.("Playlist created successfully!", "success");
      return newPlaylist;
    } catch (error) {
      console.error("Failed to create playlist:", error);
      get().toast?.("Failed to create playlist", "error");
      throw error;
    }
  },

  setCurrentPlaylist: async (id) => {
    if (id === '') {
      set({ currentPlaylist: null, isSearching: false, searchQuery: "" });
      return;
    }
    
    try {
      const playlist = await fetchPlaylistById(id);
      set({ currentPlaylist: playlist, isSearching: false, searchQuery: "" });
      get().fetchPlaylistSongs(id, get().playlistSongsLimit, 0);
    } catch (error) {
      console.error("Failed to fetch playlist:", error);
      get().toast?.("Failed to load playlist", "error");
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
      get().toast?.("Playlist updated successfully!", "success");
      return updatedPlaylist;
    } catch (error) {
      console.error("Failed to update playlist:", error);
      get().toast?.("Failed to update playlist", "error");
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
      get().toast?.("Playlist deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete playlist:", error);
      get().toast?.("Failed to delete playlist", "error");
      throw error;
    }
  },

  // Song actions
  addSongToPlaylist: async (playlistId, song: Omit<Song, "id" | "addedAt">) => {
    try {
      const addedSong = await apiAddSongToPlaylist(playlistId, song);
      const state = get();
      if (state.currentPlaylist?.id === playlistId) {
        get().fetchPlaylistSongs(playlistId, state.playlistSongsLimit, state.playlistSongsOffset);
      }

      set((state) => {
        const updatedPlaylists = state.playlists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: [...(playlist.songs || []), addedSong],
              song_count: (playlist.song_count || 0) + 1,
            };
          }
          return playlist;
        });

        let updatedCurrentPlaylist = state.currentPlaylist;
        if (state.currentPlaylist?.id === playlistId) {
          updatedCurrentPlaylist = {
            ...state.currentPlaylist,
            songs: [...state.currentPlaylist.songs, addedSong],
            song_count: (state.currentPlaylist.song_count || 0) + 1,
          };
        }

        return {
          playlists: updatedPlaylists,
          currentPlaylist: updatedCurrentPlaylist,
        };
      });

      get().toast?.("Song added to playlist!", "success");
      return addedSong;
    } catch (error) {
      console.error("Failed to add song:", error);
      const errorMessage = error instanceof Error && error.message.includes("already in this playlist") 
        ? "Song is already in this playlist" 
        : "Failed to add song to playlist";
      get().toast?.(errorMessage, "error");
      throw error;
    }
  },

  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      await apiRemoveSong(playlistId, songId);

      set((state) => {
        const updatedPlaylists = state.playlists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: (playlist.songs || []).filter((song) => song.id !== songId),
              song_count: Math.max(0, (playlist.song_count || 1) - 1),
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
            song_count: Math.max(0, (state.currentPlaylist.song_count || 1) - 1),
          };
        }

        return {
          playlists: updatedPlaylists,
          currentPlaylist: updatedCurrentPlaylist,
        };
      });
      
      get().toast?.("Song removed from playlist!", "success");
    } catch (error) {
      console.error("Failed to remove song:", error);
      get().toast?.("Failed to remove song from playlist", "error");
      throw error;
    }
  },

  // Search actions
  setSearchQuery: (query) =>
    set({ searchQuery: query, isSearching: query.length > 0 }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearch: () => {
    set({ searchQuery: "", searchResults: [], isSearching: false });
  },

  // Initialize data
  initializePlaylists: async () => {
    try {
      const playlists = await fetchPlaylists();
      set({ playlists });
    } catch (error) {
      console.error("Failed to initialize playlists:", error);
      get().toast?.("Failed to load playlists", "error");
    }
  },

  // All Songs pagination actions
  fetchAllSongs: async (limit, skip) => {
    try {
      const state = get();
      const useLimit = limit !== undefined ? limit : state.allSongsLimit;
      const useOffset = skip !== undefined ? skip : state.allSongsOffset;

      set({ isLoadingAllSongs: true });

      const response = await fetchAllSongs(useLimit, useOffset);

      set({
        allSongs: response.items,
        allSongsTotal: response.total,
        allSongsLimit: response.limit,
        allSongsOffset: response.skip,
        allSongsHasMore: response.hasMore,
        isLoadingAllSongs: false,
      });
    } catch (error) {
      console.error("Failed to fetch all songs:", error);
      get().toast?.("Failed to load songs", "error");
      set({ isLoadingAllSongs: false });
    }
  },

  setAllSongsLimit: (limit) => {
    set({ allSongsLimit: limit, allSongsOffset: 0 });
    get().fetchAllSongs(limit, 0);
  },

  setAllSongsOffset: (skip) => {
    const state = get();
    set({ allSongsOffset: skip });
    get().fetchAllSongs(state.allSongsLimit, skip);
  },

  // Playlist Songs pagination actions
  fetchPlaylistSongs: async (playlistId, limit, skip) => {
    try {
      const state = get();
      const useLimit = limit !== undefined ? limit : state.playlistSongsLimit;
      const useOffset = skip !== undefined ? skip : state.playlistSongsOffset;

      set({ isLoadingPlaylistSongs: true });

      const response = await fetchPlaylistSongs(playlistId, useLimit, useOffset);

      set({
        playlistSongs: response.items,
        playlistSongsTotal: response.total,
        playlistSongsLimit: response.limit,
        playlistSongsOffset: response.skip,
        playlistSongsHasMore: response.hasMore,
        isLoadingPlaylistSongs: false,
      });
    } catch (error) {
      console.error("Failed to fetch playlist songs:", error);
      get().toast?.("Failed to load playlist songs", "error");
      set({ isLoadingPlaylistSongs: false });
    }
  },

  setPlaylistSongsLimit: (limit) => {
    const state = get();
    set({ playlistSongsLimit: limit, playlistSongsOffset: 0 });
    if (state.currentPlaylist) {
      get().fetchPlaylistSongs(state.currentPlaylist.id, limit, 0);
    }
  },

  setPlaylistSongsOffset: (skip) => {
    const state = get();
    set({ playlistSongsOffset: skip });
    if (state.currentPlaylist) {
      get().fetchPlaylistSongs(state.currentPlaylist.id, state.playlistSongsLimit, skip);
    }
  },
}));
