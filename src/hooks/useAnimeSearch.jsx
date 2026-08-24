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
    // Ruta absoluta (antes era relativa: fallaba desde /ver/:id) + query codificada
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenre(genres);
    const params = new URLSearchParams();
    genres.forEach(genre => params.append('genres', genre));
    navigate(`/search?${params.toString()}`);
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