import { useState, useEffect } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { Icon } from '@iconify/react';

export const Sidebar = () => {
  const { playlists, setCurrentPlaylist, currentPlaylist } = usePlaylistStore();
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (currentPlaylist && !playlists.find(p => p.id === currentPlaylist.id)) {
      setCurrentPlaylist('');
    }
  }, [playlists, currentPlaylist, setCurrentPlaylist]);

  return (
    <aside className="w-64 h-screen bg-black text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">My Collection</h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-300">Playlist</span>
          <button 
            className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            + Create
          </button>
        </div>

        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className={`flex items-center gap-3 cursor-pointer hover:bg-neutral-800 px-3 py-2 rounded transition-colors ${
                currentPlaylist?.id === playlist.id ? "bg-neutral-800" : ""
              }`}
              onClick={() => setCurrentPlaylist(playlist.id)}
            >
              <div className="w-6 h-6 flex items-center justify-center text-sm bg-neutral-700 rounded">
                {playlist.cover_image ? (
                  <img src={playlist.cover_image} alt={playlist.name} className="w-full h-full" />
                ) : (
                  <Icon icon="mdi:music" className="w-4 h-4 text-neutral-300" />
                )}
              </div>
              <span className="text-sm truncate">{playlist.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-sm text-neutral-500">
        <p>© Thanawut Daorueng</p>
      </div>
      
      <CreatePlaylistModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </aside>
  );
};
