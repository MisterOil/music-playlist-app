import { useState, useCallback, type ChangeEvent } from "react";
import { usePlaylistStore } from "../store/playlistStore";
import { searchSongs } from "../services/mockApiService";
import { debounce } from "../utils/helpers";

const SearchBar = () => {
  const { setSearchQuery, setSearchResults } = usePlaylistStore();
  const [inputValue, setInputValue] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      console.log(`Searching for: ${query}`);

      debounce(async (query: string) => {
        if (query.trim()) {
          const results = await searchSongs(query);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      }, 500);
    },
    [setSearchResults]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for songs or artists"
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-2 w-72 rounded-full bg-gray-800 placeholder-gray-400 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            setSearchQuery("");
            setSearchResults([]);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
