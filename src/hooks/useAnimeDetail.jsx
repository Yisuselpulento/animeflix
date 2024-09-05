import { useEffect, useState } from "react";
import { fetchAnimeById, fetchGenresAnime, fetchMultipleRandomAnimes } from "../services/AnimeFetching";

const useAnimeDetail = (animeName) => {
  const [animeDetail, setAnimeDetail] = useState({});
  const [genresAnime, setGenresAnime] = useState([]);
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
    const getGenresAnime = async () => {
        const genre = await fetchGenresAnime();
        console.log(genre)
        setGenresAnime(genre.genres);
    };
    getGenresAnime();
  }, []);

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
    genresAnime,
    randomAnimes,
    loading,
    loadingRandom,
    isExpanded,
    toggleDescription,
    maxLength
  };
};

export default useAnimeDetail;