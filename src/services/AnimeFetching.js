import jikan from "./jikan";
import { cached } from "./cache";

const listValid = (v) => Array.isArray(v?.animes) && v.animes.length > 0;

export const fetchAnimeTop = () => cached("top", async () => {
  try {
    const { data } = await jikan.get("/top/anime");
    const animes = data.data.slice(0, 10).map(anime => ({
      _id: anime.mal_id,
      release: anime.year,
      name: anime.title,
      image: anime.images?.webp?.large_image_url,
      bgImage: anime.trailer?.images?.maximum_image_url,
      description: anime.synopsis,
      score: anime.score,
      type: anime.demographics.map(genre => genre.name),
      studios: anime.studios.map(studio => studio.name),
      genres: anime.genres.map(genre => genre.name)
    }));
    return { animes, pagination: data.pagination };
  } catch (error) {
    console.error("Error al obtener el top anime:", error);
    return { animes: [], pagination: {} };
  }
}, { persist: true, isValid: listValid });

export const fetchAnimeById = (id) => cached(`anime:${id}`, async () => {
  try {
    const [animeResponse, episodes] = await Promise.all([
      jikan.get(`/anime/${id}/full`),
      fetchEpisodeAnime(id)
    ]);
    const animeData = animeResponse.data.data;
    return {
      _id: animeData.mal_id,
      release: animeData.year,
      name: animeData.title,
      trailer: animeData.trailer?.url,
      image: animeData.images?.webp?.large_image_url,
      bgImage: animeData.trailer?.images?.maximum_image_url,
      description: animeData.synopsis,
      score: animeData.score,
      type: animeData.demographics.map(genre => genre.name),
      studios: animeData.studios.map(studio => studio.name),
      genres: animeData.genres.map(genre => ({ genre: genre.name, id: genre.mal_id })),
      episodes
    };
  } catch (error) {
    console.error("Error al obtener el anime por ID:", error);
    return null;
  }
}, { persist: true, isValid: (v) => v !== null });

const fetchAnimesRandom = async () => {
  try {
    const { data } = await jikan.get("/random/anime");
    return {
      _id: data.data.mal_id,
      name: data.data.title,
      image: data.data.images?.webp?.large_image_url,
      score: data.data.score || 0
    };
  } catch (error) {
    console.error("Error al obtener un anime aleatorio:", error);
    return null;
  }
};

// Cacheado en memoria (persist:false): se mantiene estable al navegar dentro de
// la sesión y se renueva al recargar la página.
export const fetchMultipleRandomAnimes = (count = 4) => cached("random", async () => {
  const promises = [];
  for (let i = 0; i < count; i++) promises.push(fetchAnimesRandom());
  const animes = await Promise.all(promises);
  return animes.filter(Boolean);
}, { isValid: (v) => Array.isArray(v) && v.length > 0 });

const fetchEpisodeAnime = async (id) => {
  try {
    const [episodeRes, videoRes] = await Promise.all([
      jikan.get(`/anime/${id}/episodes`),
      jikan.get(`/anime/${id}/videos`).catch(() => null)
    ]);

    // Imágenes por episodio desde /videos (cuando existen).
    const videos = videoRes?.data?.data?.episodes ?? [];
    const imgByEp = {};
    videos.forEach(v => {
      const n = parseInt(String(v.episode ?? "").match(/\d+/)?.[0] ?? "", 10);
      if (!Number.isNaN(n)) imgByEp[n] = v.images?.jpg?.image_url;
    });

    // Lista real de episodios desde /episodes (antes se usaba /videos, casi
    // siempre vacío -> no aparecían episodios).
    const list = episodeRes?.data?.data ?? [];
    const episodes = list.map(ep => ({
      episode: `Episodio ${ep.mal_id}`,
      image: imgByEp[ep.mal_id],
      title: ep.title,
      release: ep.aired || "No hay datos de episodios",
      id: ep.mal_id
    }));
    episodes.sort((a, b) => a.id - b.id);
    return episodes;
  } catch (error) {
    console.error("Error al obtener episodios de Anime:", error);
    return [];
  }
};

export const fetchSeasonNow = () => cached("season_now", async () => {
  try {
    const { data } = await jikan.get("/seasons/now", { params: { limit: 24 } });
    const animes = data.data.slice(0, 24).map(anime => ({
      _id: anime.mal_id,
      name: anime.title,
      image: anime.images?.jpg?.large_image_url || anime.images?.webp?.large_image_url,
      score: anime.score || 0
    }));
    return { animes, pagination: data.pagination };
  } catch (error) {
    console.error("Error al obtener la temporada actual:", error);
    return { animes: [], pagination: {} };
  }
}, { persist: true, isValid: listValid });

const fetchTopAsCards = () => cached("top_cards", async () => {
  try {
    const { data } = await jikan.get("/top/anime", { params: { limit: 24 } });
    const animes = data.data.slice(0, 24).map(anime => ({
      _id: anime.mal_id,
      name: anime.title,
      image: anime.images?.jpg?.large_image_url || anime.images?.webp?.large_image_url,
      score: anime.score || 0
    }));
    return { animes, pagination: data.pagination };
  } catch (error) {
    console.error("Error al obtener el top como cards:", error);
    return { animes: [], pagination: {} };
  }
}, { persist: true, isValid: listValid });

export const fetchAnimesReview = () => cached("home_review", async () => {
  try {
    const { data } = await jikan.get("/reviews/anime");
    const animes = data.data.slice(0, 24).map(anime => ({
      _id: anime.entry.mal_id,
      name: anime.entry.title,
      image: anime.entry.images?.jpg?.large_image_url,
      score: anime.score
    }));
    if (!animes.length) throw new Error("sin datos");
    return { animes, pagination: data.pagination };
  } catch (error) {
    return fetchSeasonNow(); // fallback estable
  }
}, { persist: true, isValid: listValid });

export const fetchAnimesRecomend = () => cached("home_recomend", async () => {
  try {
    const { data } = await jikan.get("/recommendations/anime");
    const animes = data.data.slice(0, 25).map(anime => ({
      _id: anime.entry[0].mal_id,
      name: anime.entry[0].title,
      image: anime.entry[0].images?.jpg?.large_image_url,
      score: anime.score || 0
    }));
    if (!animes.length) throw new Error("sin datos");
    return { animes, pagination: data.pagination };
  } catch (error) {
    return fetchTopAsCards(); // fallback estable
  }
}, { persist: true, isValid: listValid });

export const fetchSearchAnimeByName = (animeName, genres) =>
  cached(`search:${animeName}:${genres.join(",")}`, async () => {
    try {
      const { data } = await jikan.get("/anime", {
        params: { q: animeName, genres: genres.join(","), limit: 10, page: 1 }
      });
      const animes = data.data.map(anime => ({
        _id: anime.mal_id,
        name: anime.title,
        image: anime.images?.jpg?.large_image_url,
        score: anime.score
      }));
      return { animes, pagination: data.pagination };
    } catch (error) {
      console.error("Error al buscar el anime:", error);
      return null;
    }
  }, { ttl: 10 * 60 * 1000, isValid: (v) => v !== null });
