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
      try {
        const anime = await fetchAnimeById(animeName);
        console.log(anime)
        setAnimeDetail(anime);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnimeById();
  }, [animeName]);

  useEffect(() => {
    const getGenresAnime = async () => {
      try {
        const genre = await fetchGenresAnime();
        console.log(genre)
        setGenresAnime(genre.genre);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenresAnime();
  }, []);

  useEffect(() => {
    const getAnimesRandom = async () => {
      try {
        setLoadingRandom(true);
        const animes = await fetchMultipleRandomAnimes();
        setRandomAnimes(animes);
      } catch (error) {
        console.error("Error fetching random animes:", error);
      } finally {
        setLoadingRandom(false);
      }
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