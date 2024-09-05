import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-3">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent px-5 py-2 rounded-lg border border-gray-500 md:w-[270px] w-full"
        type="search"
        placeholder="Buscar anime..."
      />
    </form>
  );
};

export default SearchBar;