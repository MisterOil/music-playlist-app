import { useEffect, useState } from 'react';
import { usePlaylistStore } from '../store/playlistStore';
import { useToast } from '../contexts/ToastContext';
import type { Playlist } from '../types';

interface DeletePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Playlist;
}

const DeletePlaylistModal = ({ isOpen, onClose, playlist }: DeletePlaylistModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deletePlaylist, setToast } = usePlaylistStore();
  const { addToast } = useToast();
  
  useEffect(() => {
    setToast(addToast);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!isOpen) return null;
  
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePlaylist(playlist.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-neutral-900 rounded-md p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">Delete Playlist</h2>
        
        <p className="text-neutral-300 mb-6">
          Are you sure you want to delete "{playlist.name}"? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-neutral-800 rounded font-medium text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-medium text-sm cursor-pointer transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModal;
