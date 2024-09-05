import { useState, useEffect } from 'react';
import { fetchSearchAnimeByName } from '../services/AnimeFetching';

const useAnimeSearch = (query, selectedGenre) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);    
      const data = await fetchSearchAnimeByName(query, selectedGenre);
      setResults(data?.animes || []);
      setLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query, selectedGenre]);

  return { results, loading };
};

export default useAnimeSearch;