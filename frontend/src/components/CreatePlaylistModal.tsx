import { useState, type FormEvent } from 'react';
import { usePlaylistStore } from '../store/playlistStore';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePlaylistModal = ({ isOpen, onClose }: CreatePlaylistModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { createPlaylist } = usePlaylistStore();
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPlaylist(name, description);
      setName('');
      setDescription('');
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-md p-6 w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4">Create New Playlist</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white hover:bg-gray-800 rounded font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black rounded font-medium text-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
