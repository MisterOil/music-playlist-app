import type { Playlist, Song } from "../types";

const API_URL = "http://localhost:8000";

// Playlist API calls
export const fetchPlaylists = async (): Promise<Playlist[]> => {
  const response = await fetch(`${API_URL}/playlists`);
  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }
  return response.json();
};

export const fetchPlaylistById = async (id: string): Promise<Playlist> => {
  const response = await fetch(`${API_URL}/playlists/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }
  return response.json();
};

export const createPlaylist = async (playlist: {
  name: string;
  description?: string;
}): Promise<Playlist> => {
  const response = await fetch(`${API_URL}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });
  if (!response.ok) {
    throw new Error("Failed to create playlist");
  }
  return response.json();
};

export const updatePlaylist = async (
  id: string,
  updates: Partial<Playlist>
): Promise<Playlist> => {
  const response = await fetch(`${API_URL}/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update playlist");
  }
  return response.json();
};

export const deletePlaylist = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/playlists/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete playlist");
  }
};

// Song API calls
export const fetchAllSongs = async (limit = 10, offset = 0): Promise<{
  items: Song[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}> => {
  const response = await fetch(`${API_URL}/songs?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
};

export const addSongToPlaylist = async (
  playlistId: string,
  song: Omit<Song, "id" | "addedAt">
): Promise<Song> => {
  const response = await fetch(`${API_URL}/songs/${playlistId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (!response.ok) {
    throw new Error("Failed to add song");
  }
  return response.json();
};

export const removeSongFromPlaylist = async (songId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/songs/${songId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove song");
  }
};
