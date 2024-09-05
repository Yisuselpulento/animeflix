import { useEffect, useState } from "react";
import { fetchAnimeById,  fetchMultipleRandomAnimes } from "../services/AnimeFetching";

const useAnimeDetail = (animeName) => {
  const [animeDetail, setAnimeDetail] = useState({});
  const [randomAnimes, setRandomAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 350;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const getAnimeById = async () => {
      setLoading(true);
        const anime = await fetchAnimeById(animeName);
        setAnimeDetail(anime);
        setLoading(false); 
    };

    getAnimeById();
  }, [animeName]);


  useEffect(() => {
    const getAnimesRandom = async () => {
        setLoadingRandom(true);
        const animes = await fetchMultipleRandomAnimes();
        setRandomAnimes(animes);
        setLoadingRandom(false);
    };

    getAnimesRandom();
  }, []);

  return {
    animeDetail,
    randomAnimes,
    loading,
    loadingRandom,
    isExpanded,
    toggleDescription,
    maxLength
  };
};

export default useAnimeDetail;