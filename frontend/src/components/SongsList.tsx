import type { Song } from '../types';
import { usePlaylistStore } from '../store/playlistStore';

interface SongsListProps {
  songs: Song[];
  isSearchResults?: boolean;
}

const SongsList = ({ songs, isSearchResults = false }: SongsListProps) => {
  const { playlists, addSongToPlaylist, removeSongFromPlaylist, currentPlaylist } = usePlaylistStore();
  
  const handleAddToPlaylist = (song: Song, playlistId: string) => {
    addSongToPlaylist(playlistId, {
      ...song,
      addedAt: new Date().toISOString(),
    });
  };

  const handleRemoveSong = (songId: string) => {
    if (currentPlaylist) {
      removeSongFromPlaylist(currentPlaylist.id, songId);
    }
  };
  
  if (songs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        {isSearchResults ? "No songs match your search" : "This playlist is empty"}
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800 text-sm">
            <th className="pb-2 pl-4">#</th>
            <th className="pb-2">TITLE</th>
            <th className="pb-2">ALBUM</th>
            <th className="pb-2">DATE ADDED</th>
            <th className="pb-2 pr-4 text-right">DURATION</th>
            <th className="pb-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr 
              key={song.id} 
              className="hover:bg-gray-800 group text-gray-300 text-sm"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3">
                <div className="flex items-center">
                  {song.albumImg ? (
                    <img src={song.albumImg} alt={song.album} className="w-10 h-10 mr-3" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 mr-3"></div>
                  )}
                  <div>
                    <div className="font-medium text-white">{song.title}</div>
                    <div className="text-gray-400">{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="py-3">{song.album || "-"}</td>
              <td className="py-3">{song.addedAt ? new Date(song.addedAt).toLocaleDateString() : "-"}</td>
              <td className="py-3 pr-4 text-right">{song.duration || "-"}</td>
              <td className="py-3 pr-4 text-right">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  {isSearchResults ? (
                    <div className="relative">
                      <button className="text-gray-400 hover:text-white px-2 py-1">
                        <span>+</span>
                      </button>
                      <div className="absolute hidden group-hover:block right-0 bg-gray-900 shadow-lg rounded p-2 z-20 min-w-40">
                        <p className="px-3 py-1 text-gray-400 text-xs">Add to playlist</p>
                        {playlists.map(playlist => (
                          <button 
                            key={playlist.id}
                            className="w-full text-left px-3 py-1 hover:bg-gray-800 whitespace-nowrap"
                            onClick={() => handleAddToPlaylist(song, playlist.id)}
                          >
                            {playlist.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRemoveSong(song.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <span>-</span>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongsList;
