import React, { useEffect } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import { useToast } from "../contexts/ToastContext";
import type { Song } from "../types";
import { Icon } from "@iconify/react";

const AllSongsList = () => {
  const {
    allSongs,
    allSongsTotal,
    allSongsLimit,
    allSongsOffset,
    allSongsHasMore,
    isLoadingAllSongs,
    fetchAllSongs,
    setAllSongsLimit,
    setAllSongsOffset,
    playlists,
    addSongToPlaylist,
    setToast,
  } = usePlaylistStore();

  const { addToast } = useToast();

  useEffect(() => {
    setToast(addToast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const handleNextPage = () => {
    if (allSongsHasMore) {
      const newOffset = allSongsOffset + allSongsLimit;
      setAllSongsOffset(newOffset);
    }
  };

  const handlePrevPage = () => {
    if (allSongsOffset > 0) {
      const newOffset = Math.max(0, allSongsOffset - allSongsLimit);
      setAllSongsOffset(newOffset);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setAllSongsLimit(newLimit);
  };

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

  if (isLoadingAllSongs && allSongs.length === 0) {
    return <div className="text-center py-10">Loading songs...</div>;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Songs</h2>
        <div className="flex items-center space-x-2">
          <span>Show:</span>
          <select
            value={allSongsLimit}
            onChange={handleLimitChange}
            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

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
          {allSongs.map((song, index) => (
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

      {allSongs.length === 0 && !isLoadingAllSongs && (
        <div className="text-center py-10 text-neutral-400">
          No songs available
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {allSongsTotal > 0 ? allSongsOffset + 1 : 0} -{" "}
          {Math.min(allSongsOffset + allSongsLimit, allSongsTotal)} of{" "}
          {allSongsTotal}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={allSongsOffset <= 0 || isLoadingAllSongs}
            className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
          >
            {isLoadingAllSongs ? "Loading..." : "Previous"}
          </button>
          <span className="px-4 py-2 text-neutral-400">
            Page {Math.floor(allSongsOffset / allSongsLimit) + 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!allSongsHasMore || isLoadingAllSongs}
            className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
          >
            {isLoadingAllSongs ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSongsList;
