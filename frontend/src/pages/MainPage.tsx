import { useState } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import SongsList from "../components/SongsList";
import PlaylistHeader from "../components/PlaylistHeader";
import Card from "../components/Card";

const MainPage = () => {
  const { currentPlaylist, searchResults, isSearching, searchQuery } = usePlaylistStore();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  
  // Handle playlist editing, deletion, etc.
  const handleEditPlaylist = () => {
    setShowPlaylistMenu(!showPlaylistMenu);
  };
  
  if (isSearching) {
    return (
      <main className="flex-1 bg-black text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
        <SongsList songs={searchResults} isSearchResults={true} />
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
            
            <SongsList songs={currentPlaylist.songs} />
          </div>
        </div>
      </main>
    );
  }
  
  // Default view when no playlist is selected and not searching
  return (
    <main className="flex-1 bg-black text-white p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Music App 🎵</h1>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {usePlaylistStore.getState().playlists.map((playlist) => (
            <div key={playlist.id} className="cursor-pointer" onClick={() => usePlaylistStore.getState().setCurrentPlaylist(playlist.id)}>
              <Card 
                id={playlist.id} 
                title={playlist.name} 
                artist={`${playlist.songCount || 0} songs`} 
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
