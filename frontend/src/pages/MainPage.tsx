import { useState } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import PlaylistHeader from "../components/PlaylistHeader";
import AllSongsList from "../components/AllSongsList";
import SongsList from "../components/SongsList";
import SearchResults from "../components/SearchResults";
import EditPlaylistModal from "../components/EditPlaylistModal";
import DeletePlaylistModal from "../components/DeletePlaylistModal";
import { Icon } from '@iconify/react';

const MainPage = () => {
  const { currentPlaylist, isSearching, searchQuery } = usePlaylistStore();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditPlaylist = () => {
    setShowPlaylistMenu(false);
    setShowEditModal(true);
  };

  const handleDeletePlaylist = () => {
    setShowPlaylistMenu(false);
    setShowDeleteModal(true);
  };

  const handleMenuToggle = () => {
    setShowPlaylistMenu(!showPlaylistMenu);
  };

  if (isSearching) {
    return (
      <main className="flex-1 bg-black text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
        <SearchResults />
      </main>
    );
  }

  if (currentPlaylist) {
    return (
      <main className="flex-1 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black text-white overflow-y-auto">
        <div className="px-6">
          <PlaylistHeader playlist={currentPlaylist} onEdit={handleMenuToggle} />

          {showPlaylistMenu && (
            <div className="relative">
              <div className="absolute right-0 mt-2 bg-neutral-900 shadow-lg rounded p-2 z-20">
                <button 
                  onClick={handleEditPlaylist}
                  className="w-full text-left px-3 py-1 hover:bg-neutral-800 whitespace-nowrap cursor-pointer"
                >
                  Edit details
                </button>
                <button 
                  onClick={handleDeletePlaylist}
                  className="w-full text-left px-3 py-1 hover:bg-neutral-800 whitespace-nowrap text-red-400 cursor-pointer"
                >
                  Delete playlist
                </button>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button className="w-12 h-12 bg-green-500 hover:bg-green-400 text-black rounded-full font-bold flex items-center justify-center text-2xl transition-colors mb-6">
              <Icon icon="mdi:play" className="w-6 h-6" />
            </button>

            <SongsList songs={currentPlaylist.songs} />
          </div>
        </div>

        {currentPlaylist && (
          <>
            <EditPlaylistModal 
              isOpen={showEditModal} 
              onClose={() => setShowEditModal(false)} 
              playlist={currentPlaylist}
            />
            <DeletePlaylistModal 
              isOpen={showDeleteModal} 
              onClose={() => setShowDeleteModal(false)} 
              playlist={currentPlaylist}
            />
          </>
        )}
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black text-white overflow-y-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Welcome to Music App
        <Icon icon="mdi:music" className="w-8 h-8 text-green-500" />
      </h1>

      <div className="mt-8">
        <AllSongsList />
      </div>
    </main>
  );
};

export default MainPage;
