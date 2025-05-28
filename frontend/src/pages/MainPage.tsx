import { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import PlaylistHeader from "../components/PlaylistHeader";
import AllSongsList from "../components/AllSongsList";

const MainPage = () => {
  const { currentPlaylist, isSearching, searchQuery, fetchAllSongs } = usePlaylistStore();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  
  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);
  
  const handleEditPlaylist = () => {
    setShowPlaylistMenu(!showPlaylistMenu);
  };
  
  if (isSearching) {
    return (
      <main className="flex-1 bg-black text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
      </main>
    );
  }

  if (currentPlaylist) {
    return (
      <main className="flex-1 bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white overflow-y-auto">
        <div className="px-6">
          <PlaylistHeader playlist={currentPlaylist} onEdit={handleEditPlaylist} />
          
          {showPlaylistMenu && (
            <div className="relative">
              <div className="absolute right-0 mt-2 bg-gray-900 shadow-lg rounded p-2 z-20">
                <button className="w-full text-left px-3 py-1 hover:bg-gray-800 whitespace-nowrap">
                  Edit details
                </button>
                <button className="w-full text-left px-3 py-1 hover:bg-gray-800 whitespace-nowrap">
                  Delete playlist
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button className="w-12 h-12 bg-green-500 hover:bg-green-400 text-black rounded-full font-bold flex items-center justify-center text-2xl transition-colors mb-6">
              ▶
            </button>
            
            {/* <SongsList songs={currentPlaylist.songs} /> */}
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-1 bg-black text-white p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Music App 🎵</h1>
      
      <div className="mt-8">
        <AllSongsList />
      </div>
    </main>
  );
};

export default MainPage;
