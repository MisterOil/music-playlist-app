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
export const fetchAllSongs = async (limit = 10, skip = 0): Promise<{
  items: Song[];
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}> => {
  const response = await fetch(`${API_URL}/songs?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  const data = await response.json();
  return {
    items: data.items,
    total: data.total,
    limit: data.limit,
    skip: data.skip,
    hasMore: data.has_more, // Convert snake_case to camelCase
  };
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
    throw new Error("Failed to add song to playlist");
  }
  return response.json();
};

export const removeSongFromPlaylist = async (playlistId: string, songId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/songs/${playlistId}/${songId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove song");
  }
};

export const fetchPlaylistSongs = async (playlistId: string, limit = 10, skip = 0): Promise<{
  items: Song[];
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}> => {
  const response = await fetch(`${API_URL}/songs/${playlistId}?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch playlist songs");
  }
  const data = await response.json();
  return {
    items: data.items,
    total: data.total,
    limit: data.limit,
    skip: data.skip,
    hasMore: data.has_more,
  };
};

export const searchSongs = async (query: string): Promise<Song[]> => {
  const response = await fetch(`${API_URL}/songs?limit=100&skip=0`);
  if (!response.ok) {
    throw new Error("Failed to search songs");
  }
  const data = await response.json();
  
  // Filter songs based on query
  const filteredSongs = data.items.filter((song: Song) =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase()) ||
    (song.album && song.album.toLowerCase().includes(query.toLowerCase()))
  );
  
  return filteredSongs;
};
