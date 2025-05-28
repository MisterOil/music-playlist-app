import { useState, useCallback, type ChangeEvent, useEffect } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import { searchSongs } from "../services/apiService";
import { Icon } from '@iconify/react';

const SearchBar = () => {
  const { setSearchQuery, setSearchResults, isSearching  } = usePlaylistStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isSearching) {
      setInputValue("");
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isSearching, setSearchQuery, setSearchResults]);

  const performSearch = useCallback(
    async (query: string) => {
      if (query.trim()) {
        try {
          const results = await searchSongs(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    },
    [setSearchResults]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
    performSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for songs or artists"
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-2 w-72 rounded-full bg-neutral-800 placeholder-neutral-400 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
        >
          <Icon icon="mdi:close" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
