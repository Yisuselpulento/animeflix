import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSearchAnimeByName } from '../services/AnimeFetching';

const useAnimeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    const genres = queryParams.getAll('genres') || [];

    setSearchQuery(query);
    setSelectedGenre(genres);

    const fetchData = async () => {
      setLoading(true);
      const data = await fetchSearchAnimeByName(query, genres);
      setResults(data?.animes || []);
      setLoading(false);
    };

    // Fetch data only if there's a search query or selected genres
    if (query || genres.length) {
      fetchData();
    }
  }, [location.search]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Navigate with only the search query
    navigate(`search?q=${query}`);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenre(genres);
    // Navigate with only the selected genres
    navigate(`search?${genres.map(genre => `genres=${genre}`).join('&')}`);
  };

  return {
    searchQuery,
    selectedGenre,
    results,
    loading,
    handleSearch,
    handleGenreChange,
  };
};

export default useAnimeSearch;