import React from "react";
import { usePlaylistStore } from "../store/playlistStore";
import type { Song } from "../types";

interface SongsListProps {
  songs: Song[];
}

const SongsList = ({ songs: _ }: SongsListProps) => {
  const { 
    currentPlaylist, 
    removeSongFromPlaylist,
    playlistSongs,
    playlistSongsTotal,
    playlistSongsLimit,
    playlistSongsOffset,
    playlistSongsHasMore,
    isLoadingPlaylistSongs,
    setPlaylistSongsLimit,
    setPlaylistSongsOffset,
    fetchPlaylistSongs
  } = usePlaylistStore();

  const handleDeleteSong = async (songId: string) => {
    if (currentPlaylist) {
      try {
        await removeSongFromPlaylist(currentPlaylist.id, songId);
        await fetchPlaylistSongs(currentPlaylist.id, playlistSongsLimit, playlistSongsOffset);
      } catch (error) {
        console.error('Failed to remove song:', error);
      }
    }
  };

  const handleNextPage = () => {
    if (playlistSongsHasMore) {
      setPlaylistSongsOffset(playlistSongsOffset + playlistSongsLimit);
    }
  };

  const handlePrevPage = () => {
    if (playlistSongsOffset > 0) {
      setPlaylistSongsOffset(Math.max(0, playlistSongsOffset - playlistSongsLimit));
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaylistSongsLimit(Number(e.target.value));
  };

  if (isLoadingPlaylistSongs) {
    return <div className="text-center py-10">Loading songs...</div>;
  }

  if (playlistSongs.length === 0 && !isLoadingPlaylistSongs) {
    return <div className="text-center py-10 text-neutral-400">No songs in this playlist</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Songs</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Show:</span>
          <select 
            value={playlistSongsLimit} 
            onChange={handleLimitChange}
            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-400 border-b border-neutral-800 text-sm">
            <th className="pb-2 pl-4">#</th>
            <th className="pb-2">TITLE</th>
            <th className="pb-2">ARTIST</th>
            <th className="pb-2 pr-4 text-right">DURATION</th>
            <th className="pb-2 pr-4 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {playlistSongs.map((song, index) => (
            <tr key={song.id} className="hover:bg-neutral-800 text-neutral-300 text-sm">
              <td className="py-3 px-4">{playlistSongsOffset + index + 1}</td>
              <td className="py-3">{song.title}</td>
              <td className="py-3">{song.artist}</td>
              <td className="py-3 pr-4 text-right">{song.duration || "-"}</td>
              <td className="py-3 pr-4 text-right">
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  className="text-red-500 hover:text-red-400 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-neutral-400">
          Showing {playlistSongsTotal > 0 ? playlistSongsOffset + 1 : 0} - {Math.min(playlistSongsOffset + playlistSongsLimit, playlistSongsTotal)} of {playlistSongsTotal}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevPage}
            disabled={playlistSongsOffset <= 0}
            className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <button 
            onClick={handleNextPage}
            disabled={!playlistSongsHasMore}
            className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongsList;
