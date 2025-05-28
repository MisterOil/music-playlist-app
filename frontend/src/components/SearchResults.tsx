import { usePlaylistStore } from "../store/playlistStore";
import { useMemo } from "react";
import type { Song } from "../types";
import { Icon } from "@iconify/react";

const SearchResults = () => {
  const {
    searchQuery,
    allSongs,
    allSongsOffset,
    playlists,
    addSongToPlaylist,
    isLoadingAllSongs,
  } = usePlaylistStore();

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allSongs, searchQuery]);

  if (filteredSongs.length === 0 && searchQuery) {
    return (
      <div className="text-center text-neutral-400 mt-8">
        No results found for "{searchQuery}"
      </div>
    );
  }

  if (filteredSongs.length === 0) {
    return null;
  }

  const handleAddToPlaylist = async (song: Song, playlistId: string) => {
    try {
      await addSongToPlaylist(playlistId, {
        title: song.title,
        artist: song.artist,
        album: song.album,
        album_img: song.album_img,
        duration: song.duration,
      });
    } catch (error) {
      console.error("Failed to add song to playlist:", error);
    }
  };

  return (
    <div className="w-full mt-4">
      {filteredSongs.length === 0 && searchQuery && (
        <div className="text-center text-neutral-400 mt-8">
          No results found for "{searchQuery}"
        </div>
      )}
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-400 border-b border-neutral-800 text-sm">
            <th className="pb-2 pl-4">#</th>
            <th className="pb-2">TITLE</th>
            <th className="pb-2">ALBUM</th>
            <th className="pb-2 pr-4 text-right">DURATION</th>
            <th className="pb-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-neutral-800 group text-neutral-300 text-sm"
            >
              <td className="py-3 px-4">{allSongsOffset + index + 1}</td>
              <td className="py-3">
                <div className="flex items-center">
                  {song.album_img ? (
                    <img
                      src={song.album_img}
                      alt={song.album}
                      className="w-10 h-10 mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-neutral-700 mr-3"></div>
                  )}
                  <div>
                    <div className="font-medium text-white">{song.title}</div>
                    <div className="text-neutral-400">{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="py-3">{song.album || "-"}</td>
              <td className="py-3 pr-4 text-right">{song.duration || "-"}</td>
              <td className="py-3 pr-4 text-right">
                <div className="flex justify-end">
                  <div className="relative">
                    <button className="text-neutral-400 hover:text-white px-2 py-1">
                      <Icon icon="mdi:plus" className="w-5 h-5" />
                    </button>
                    <div className="absolute hidden group-hover:block right-0 bg-neutral-900 shadow-lg rounded p-2 z-20 min-w-40">
                      <p className="px-3 py-1 text-neutral-400 text-xs">
                        Add to playlist
                      </p>
                      {playlists.map((playlist) => (
                        <button
                          key={playlist.id}
                          className="w-full text-left px-3 py-1 hover:bg-neutral-800 whitespace-nowrap"
                          onClick={() => handleAddToPlaylist(song, playlist.id)}
                        >
                          {playlist.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredSongs.length === 0 && !isLoadingAllSongs && (
        <div className="text-center py-10 text-neutral-400">
          No songs available
        </div>
      )}
    </div>
  );
};

export default SearchResults;
