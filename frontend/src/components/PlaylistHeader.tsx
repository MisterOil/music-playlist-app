import type { Playlist } from '../types';
import { getRandomColor } from '../utils/helpers';

interface PlaylistHeaderProps {
  playlist: Playlist;
  onEdit: () => void;
}

const PlaylistHeader = ({ playlist, onEdit }: PlaylistHeaderProps) => {
  const coverColorClass = getRandomColor();
  
  return (
    <div className="flex items-end pt-8 pb-6 pr-6 pl-6 bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-lg mb-6">
      <div className={`w-48 h-48 ${coverColorClass} mr-6 flex justify-center items-center shadow-lg`}>
        {playlist.coverImage ? (
          <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full" />
        ) : (
          <span className="text-6xl">🎵</span>
        )}
      </div>
      
      <div>
        <p className="uppercase text-xs font-bold tracking-wider mb-2">Playlist</p>
        <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
        
        {playlist.description && (
          <p className="text-gray-400 mb-4">{playlist.description}</p>
        )}
        
        <div className="flex items-center text-sm">
          <span className="font-semibold">{playlist.createdBy}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-gray-400">{playlist.songCount || 0} songs</span>
        </div>
      </div>
      
      <div className="ml-auto">
        <button 
          onClick={onEdit}
          className="text-white opacity-70 hover:opacity-100"
        >
          ⋯
        </button>
      </div>
    </div>
  );
};

export default PlaylistHeader;
