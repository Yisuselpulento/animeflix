import { useState } from 'react';
import useAnimeSearch from '../hooks/useAnimeSearch';

const SearchBar = () => {
  const [localQuery, setLocalQuery] = useState('');
  const { handleSearch } = useAnimeSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      handleSearch(localQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="bg-transparent px-5 py-2 rounded-lg border border-gray-500 md:w-[270px] w-full"
        type="search"
        placeholder="Buscar anime..."
      />
      <button type="submit" className="hidden">Buscar</button> {/* Optional: for accessibility */}
    </form>
  );
};

export default SearchBar;