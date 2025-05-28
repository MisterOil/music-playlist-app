import SearchBar from "./SearchBar";
import { usePlaylistStore } from "../store/playlistStore";
import { Icon } from "@iconify/react";

const NavBar = () => {
  const { clearSearch, setCurrentPlaylist } = usePlaylistStore();

  const handleLogoClick = () => {
    setCurrentPlaylist("");
    clearSearch();
  };

  return (
    <nav className="w-full h-16 bg-black text-white flex items-center justify-between px-6 shadow-lg relative">
      <div className="flex items-center gap-2 z-10">
        <button
          onClick={handleLogoClick}
          className="hover:text-neutral-300 transition-colors cursor-pointer flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-green-500 hover:bg-green-400 text-black rounded-full font-bold flex items-center justify-center text-2xl transition-colors">
            <Icon icon="mdi:music" className="w-8 h-8 text-black" />
          </div>
          <span className="text-lg font-bold">MusicApp</span>
        </button>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 z-10">
        <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/thanawut-daorueang/" className="text-xs font-bold">TD</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
