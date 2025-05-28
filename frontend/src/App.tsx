import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Sidebar } from "./components/SildBar";
import MainPage from "./pages/MainPage";
import { usePlaylistStore } from "./store/playlistStore";

function App() {
  const { initializePlaylists } = usePlaylistStore();

  // Load playlists from API when app starts
  useEffect(() => {
    initializePlaylists();
  }, [initializePlaylists]);

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
