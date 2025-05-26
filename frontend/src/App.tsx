import "./App.css";
import NavBar from "./components/NavBar";
import { Sidebar } from "./components/SildBar";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <MainPage />
      </div>
      
      {/* Player component - simplified version */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-800 flex items-center px-4">
        <div className="flex items-center w-1/3">
          <div className="w-10 h-10 bg-gray-700 mr-3"></div>
          <div>
            <p className="font-semibold text-white text-sm">Select a song</p>
            <p className="text-xs text-gray-400">Artist</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center w-1/3">
          <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105">
            <span>▶</span>
          </button>
        </div>
        
        <div className="w-1/3"></div>
      </div>
    </div>
  );
}

export default App;
