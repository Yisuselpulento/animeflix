import axios from "axios";

export const fetchAnimeTop = async () => {
    const { data } = await axios.get("https://api.jikan.moe/v4/top/anime")

        const animes = data.data.slice(0,10).map( anime => {
    /*         console.log(anime) */
            return { 
                _id : anime.mal_id,
                release: anime.year,
                name:anime.title ,
                image : anime.images["webp"].large_image_url,
                bgImage : anime.trailer.images.maximum_image_url,
                description : anime.synopsis,
                score : anime.score,
                type: anime.demographics.map( genre => genre.name),
                studios: anime.studios.map( studio => studio.name),
                genres: anime.genres.map( genre => genre.name)
            }
        })

   return {
        animes,
        pagination : data.pagination
   }

}

export const fetchAnimeById = async (id) => {

    const [animeResponse, episodesResponse] = await Promise.all([
        axios.get(`https://api.jikan.moe/v4/anime/${id}/full`),
        fetchEpisodeAnime(id)
    ]);
    const animeData = animeResponse.data.data;
    const episodes = episodesResponse;


    const anime = {
        _id: animeData.mal_id,
        release: animeData.year,
        name: animeData.title,
        trailer: animeData.trailer.url,
        image: animeData.images["webp"].large_image_url,
        bgImage: animeData.trailer.images.maximum_image_url,
        description: animeData.synopsis,
        score: animeData.score,
        type: animeData.demographics.map(genre => genre.name),
        studios: animeData.studios.map(studio => studio.name),
        genres: animeData.genres.map(genre => genre.name),
        episodes: episodes 
    };

    return anime ;
};

const fetchEpisodeAnime = async (id) => {
    try {
      const [{ data: videoData }, { data: episodeData }] = await Promise.all([
        axios.get(`https://api.jikan.moe/v4/anime/${id}/videos`),
        axios.get(`https://api.jikan.moe/v4/anime/${id}/episodes`)
      ]);
      
      const episodes = videoData.data.episodes.map((video, index) => ({
        episode: video.episode,
        image: video.images.jpg.image_url,
        title: video.title,
        release: episodeData.data[index]?.aired || "No hay datos de episodios" ,
        id: video.mal_id
      }))
      episodes.sort((a, b) => {
        const episodeNumberA = parseInt(a.episode.match(/\d+/)[0]);
        const episodeNumberB = parseInt(b.episode.match(/\d+/)[0]);
        return episodeNumberA - episodeNumberB;
      });
      

      return episodes;
    } catch (error) {
      console.error("Error al obtener episodios de Anime:", error);
      return [];
    }
  };

  export const fetchGenresAnime = async () => {
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/genres/anime");
      const genres = data.data.map(genre => genre.name);
      return { genres };
    } catch (error) {
      console.error("Error al obtener los géneros de anime:", error);
      return { genres: [] };
    }
  };

export const fetchAnimesReview = async () => {
    const { data } = await axios.get("https://api.jikan.moe/v4/reviews/anime")
   /*  console.log(data) */
       const animes = data.data.slice(0,25).map( anime => {
            return { 
                _id : anime.entry.mal_id,
                name: anime.entry.title,
                image : anime.entry.images["jpg"].large_image_url,
                score : anime.score
            
            }
        })

   return {
        animes,
        pagination : data.pagination
   }

}

export const fetchAnimesRecomend = async () => {
    const { data } = await axios.get("https://api.jikan.moe/v4/recommendations/anime")
   /*  console.log(data) */
       const animes = data.data.slice(0,25).map( anime => {
            return { 
                _id : anime.entry[0].mal_id,
                name: anime.entry[0].title,
                image : anime.entry[0].images["jpg"].large_image_url,
                score : anime.score || 0
            
            }
        })

   return {
        animes,
        pagination : data.pagination
   }

}

export const fetchAnimesRandom = async () => {
    const { data } = await axios.get("https://api.jikan.moe/v4/random/anime");
    return { 
      _id: data.data.mal_id,
      name: data.data.title,
      image: data.data.images["webp"].large_image_url,
      score: data.data.score || 0
    };
  };
  
export const fetchMultipleRandomAnimes = async (count = 4) => {
    const promises = [];
  
    for (let i = 0; i < count; i++) {
      promises.push(fetchAnimesRandom());
    }
  
    const animes = await Promise.all(promises);
  
    return animes;
  };

export const fetchCapituleDetail = async(idAnime, idCapitule) => {
    const {data} = await axios.get(`https://api.jikan.moe/v4/anime/${idAnime}/episodes/${idCapitule}`)
    return data

}

export const fetchSearchAnimeByName = async (animeName, genre = []) => {
  try {
    const {data} = await axios.get('https://api.jikan.moe/v4/anime', {
      params: {
        q: animeName, 
        genre,
        limit: 10,  
        page: 1     
      }
    });
     const animes = data.data.map( anime => {
      return { 
          _id : anime.mal_id,
          name: anime.title,
          image : anime.images["jpg"].large_image_url,
          score : anime.score
      
      }
  })
  console.log(animes)
return {
  animes,
  pagination : data.pagination
} 

  } catch (error) {
    console.error("Error al buscar el anime:", error);
    return null;
  }
};