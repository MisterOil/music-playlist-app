import SearchBar from "./SearchBar";
import { usePlaylistStore } from "../store/playlistStore";

const NavBar = () => {
  const { currentPlaylist, isSearching, clearSearch } = usePlaylistStore();

  return (
    <nav className="w-full h-16 bg-black text-white flex items-center justify-between px-6 shadow-md relative">
      <div className="flex items-center gap-2 z-10">
        Logo here
        {isSearching && (
          <button
            onClick={clearSearch}
            className="ml-2 text-sm text-gray-300 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 z-10">
        {currentPlaylist && (
          <button className="px-4 py-1.5 bg-green-500 hover:bg-green-400 text-black rounded-full font-semibold text-sm transition-colors">
            PLAY
          </button>
        )}
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold">TD</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;