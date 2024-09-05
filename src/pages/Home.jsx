import { useEffect, useState } from "react";
import { fetchAnimesRecomend, fetchAnimesReview } from "../services/AnimeFetching";
import CardAnimes from "../components/CardAnimes";
import { FaFire } from "react-icons/fa";
import GenreSelector from "../components/GenerSelector";
import Spinner from "../components/Spinner";

const Home = () => {
  const [animesReview, setAnimesReview] = useState([]);
  const [animesRecomend, setAnimesRecomend] = useState([]);
  const [loadingReview, setLoadingReview] = useState(true);
  const [loadingRecomend, setLoadingRecomend] = useState(true);

  useEffect(() => {
    const getAnimeReview = async () => {
        const data = await fetchAnimesReview();
        setAnimesReview(data.animes);
        setLoadingReview(false); 
    };

    getAnimeReview();
  }, []);

  useEffect(() => {
    const getAnimeRecomend = async () => {
        const data = await fetchAnimesRecomend();
        setAnimesRecomend(data.animes);
        setLoadingRecomend(false);
    };

    getAnimeRecomend();
  }, []);

  const isLoading = loadingReview || loadingRecomend;

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-5 text-center my-10">
        <h2 className="text-3xl font-bold">AnimeFlix - Ver Anime en Español</h2>
        <p className="text-gray-300">Bienvenido a la Mejor web de anime en Español, disfruta de miles de videos anime online subtitulados al español puedes ver en línea o descargar en .mp4 actualizamos nuestros videos anime todos los días con los videos anime de las últimas temporadas.</p>
     {/*    <GenreSelector /> */}
      </section>
      {isLoading &&
      <div className="flex w-full items-center justify-center">
         <Spinner />
      </div>
      } {/* Muestra el Spinner mientras cualquiera de los estados de carga sea verdadero */}
      {!isLoading && (
        <>
          <div className="flex gap-4 items-center bg-secundary py-4 px-3 rounded-r-lg w-full border-l-[3px] border-primary my-5">
            <FaFire className="text-primary text-2xl" />
            <p>Review Animes</p>
          </div>
          <section className="flex gap-7 flex-wrap items-center justify-center">
            {animesReview.length > 0 ? (
              animesReview.map((anime, i) => (
                <CardAnimes key={i} anime={anime} />
              ))
            ) : (
              <p>No se encontraron reseñas.</p>
            )}
          </section>
          <div className="flex gap-4 items-center bg-secundary py-4 px-3 rounded-r-lg w-full border-l-[3px] border-primary my-5">
            <FaFire className="text-primary text-2xl" />
            <p>Recomendados</p>
          </div>
          <section className="flex gap-7 flex-wrap items-center justify-center">
            {animesRecomend.length > 0 ? (
              animesRecomend.map((anime, i) => (
                <CardAnimes key={i} anime={anime} />
              ))
            ) : (
              <p>No se encontraron recomendaciones.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;