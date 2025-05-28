import type { Playlist } from '../types';
import { getRandomColor } from '../utils/helpers';
import { Icon } from '@iconify/react';

interface PlaylistHeaderProps {
  playlist: Playlist;
  onEdit: () => void;
}

const PlaylistHeader = ({ playlist, onEdit }: PlaylistHeaderProps) => {
  const coverColorClass = getRandomColor();
  
  return (
    <div className="flex items-end pt-8 pb-6 pr-6 pl-6 bg-gradient-to-b from-neutral-900 to-black rounded-lg shadow-lg mb-6">
      <div className={`w-48 h-48 ${coverColorClass} mr-6 flex justify-center items-center shadow-lg`}>
        {playlist.cover_image ? (
          <img src={playlist.cover_image} alt={playlist.name} className="w-full h-full" />
        ) : (
          <Icon icon="mdi:music" className="text-6xl text-white" />
        )}
      </div>
      
      <div>
        <p className="uppercase text-xs font-bold tracking-wider mb-2">Playlist</p>
        <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
        
        {playlist.description && (
          <p className="text-neutral-400 mb-4">{playlist.description}</p>
        )}
        
        <div className="flex items-center text-sm">
          <span className="text-neutral-400">{playlist.song_count || 0} songs</span>
        </div>
      </div>
      
      <div className="ml-auto">
        <button 
          onClick={onEdit}
          className="text-white opacity-70 hover:opacity-100"
        >
          <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistHeader;
