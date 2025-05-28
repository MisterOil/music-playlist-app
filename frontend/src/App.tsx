import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Sidebar } from "./components/SildBar";
import MainPage from "./pages/MainPage";
import { usePlaylistStore } from "./store/playlistStore";
import { ToastProvider } from "./providers/ToastProvider";
import  ToastContainer  from "./components/ToastContainer";

function App() {
  const { initializePlaylists } = usePlaylistStore();

  useEffect(() => {
    initializePlaylists();
  }, [initializePlaylists]);

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <MainPage />
        </div>
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

export default App;
