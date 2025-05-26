import type { Song } from "../types";
import { v4 as uuidv4 } from 'uuid';

// Mock song database
const songDatabase: Song[] = [
  {
    id: uuidv4(),
    title: "Shut Up and Dance",
    artist: "Walk the Moon",
    album: "Talking Is Hard",
    albumImg: "https://via.placeholder.com/150",
    duration: "3:19"
  },
  {
    id: uuidv4(),
    title: "Cough Syrup",
    artist: "Young the Giant",
    album: "Young the Giant (Special Edition)",
    albumImg: "https://via.placeholder.com/150",
    duration: "4:10"
  },
  {
    id: uuidv4(),
    title: "Pumped Up Kicks",
    artist: "Foster the People",
    album: "Torches",
    albumImg: "https://via.placeholder.com/150",
    duration: "4:00"
  },
  {
    id: uuidv4(),
    title: "Take a Walk",
    artist: "Passion Pit",
    album: "Gossamer",
    albumImg: "https://via.placeholder.com/150",
    duration: "4:24"
  },
  {
    id: uuidv4(),
    title: "Work This Body",
    artist: "Walk the Moon",
    album: "Talking Is Hard",
    albumImg: "https://via.placeholder.com/150",
    duration: "3:36"
  },
  {
    id: uuidv4(),
    title: "Radioactive",
    artist: "Imagine Dragons",
    album: "Night Visions",
    albumImg: "https://via.placeholder.com/150",
    duration: "3:07"
  },
  {
    id: uuidv4(),
    title: "Everybody Talks",
    artist: "Neon Trees",
    album: "Picture Show (Deluxe Edition)",
    albumImg: "https://via.placeholder.com/150",
    duration: "2:57"
  },
  {
    id: uuidv4(),
    title: "Little Talks",
    artist: "Of Monsters and Men",
    album: "My Head Is An Animal",
    albumImg: "https://via.placeholder.com/150",
    duration: "4:27"
  }
];

// Mock API service
export const searchSongs = async (query: string): Promise<Song[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return songDatabase.filter(
    song => 
      song.title.toLowerCase().includes(lowerQuery) || 
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album?.toLowerCase().includes(lowerQuery)
  );
};

export const getSongById = async (id: string): Promise<Song | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return songDatabase.find(song => song.id === id);
};
