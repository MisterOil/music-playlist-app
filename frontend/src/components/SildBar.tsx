import { useState } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import CreatePlaylistModal from "./CreatePlaylistModal";

export const Sidebar = () => {
  const { playlists, setCurrentPlaylist, currentPlaylist } = usePlaylistStore();
  const [showModal, setShowModal] = useState(false);
  
  return (
    <aside className="w-64 h-screen bg-black text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">My Collection</h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Playlist</span>
          <button 
            className="text-sm text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowModal(true)}
          >
            + Create
          </button>
        </div>

        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className={`flex items-center gap-3 cursor-pointer hover:bg-gray-800 px-3 py-2 rounded transition-colors ${
                currentPlaylist?.id === playlist.id ? "bg-gray-800" : ""
              }`}
              onClick={() => setCurrentPlaylist(playlist.id)}
            >
              <div className="w-6 h-6 flex items-center justify-center text-sm bg-gray-700 rounded">
                🎵
              </div>
              <span className="text-sm truncate">{playlist.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>© Thanawut Daorueng</p>
      </div>
      
      <CreatePlaylistModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </aside>
  );
};
