import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Spinner from "../components/Spinner";
import CardAnimes from "../components/CardAnimes";
import BannerHead from "../components/BannerHead";
import useAnimeDetail from "../hooks/useAnimeDetail";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

const EpisodeDetail = () => {
  const { animeName, episodeNumber } = useParams();
  const navigate = useNavigate();
  const {
    animeDetail,
    genresAnime,
    randomAnimes,
    loading,
    loadingRandom,
    isExpanded,
    toggleDescription,
    maxLength
  } = useAnimeDetail(animeName);

  const [selectedEpisode, setSelectedEpisode] = useState(episodeNumber);

  const { bgImage, description, genres, name, _id, episodes, trailer } = animeDetail;

  useEffect(() => {
    setSelectedEpisode(episodeNumber);
  }, [episodeNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const episodeNumbers = episodes.map(ep => ep.id);

  const handleSelectChange = (event) => {
    const selectedEpisodeNumber = event.target.value;
    navigate(`/ver/${_id}/${selectedEpisodeNumber}`);
  };

  const handlePrevious = () => {
    const currentIndex = episodeNumbers.indexOf(Number(selectedEpisode));
    if (currentIndex > 0) {
      navigate(`/ver/${_id}/${episodeNumbers[currentIndex - 1]}`);
    }
  };

  const handleNext = () => {
    const currentIndex = episodeNumbers.indexOf(Number(selectedEpisode));
    if (currentIndex < episodeNumbers.length - 1) {
      navigate(`/ver/${_id}/${episodeNumbers[currentIndex + 1]}`);
    }
  };

  return (
    <div>
      <section>
        <div
          className="w-screen h-[670px] bg-cover bg-center opacity-30 blur-xl absolute md:-mx-[270px] md:-my-[160px] -mx-[10px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
        </div>
        <div className="relative flex gap-10 items-center md:flex-row flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center text-center">
              <Link to="/">
                <FaHome className="text-primary text-xl hover:opacity-70 hover:scale-125" />
              </Link>
              <p className="text-primary text-4xl pb-5">.</p>
              <Link className="hover:text-primary text-sm" to="/">Animes</Link>
              <p className="text-primary text-4xl pb-5">.</p>
              <Link className="hover:text-primary text-sm" to={`/ver/${_id}`}>{name}</Link>
              <p className="text-primary text-4xl pb-5">.</p>
              <Link className="hover:text-primary text-sm" to={`/ver/${_id}/${episodeNumber}`}>Episode {episodeNumber}</Link>
            </div>
            <div>
              <p className="text-3xl font-semibold">{name} - Episodio {episodeNumber}</p>
            </div>
            <div className="md:h-[500px] md:w-[900px] h-[240px]">
              {trailer ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.split('v=')[1]}`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-center text-lg font-semibold">No video disponible</p>
              )}
            </div>
            <div className="flex md:justify-between flex-col md:flex-row  gap-4 ">
              <select
                value={selectedEpisode}
                onChange={handleSelectChange}
                className="p-2  rounded bg-primary scrollbar scrollbar-thumb-orange-500"
              >
                {episodes.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    Episode {ep.id}
                  </option>
                ))}
              </select>
              <div className="flex">
                <button
                 className="bg-primary hover:bg-opacity-90 rounded-l-lg p-1 text-sm  flex items-center px-2"
                  onClick={handlePrevious}
                  disabled={episodeNumbers.indexOf(Number(selectedEpisode)) === 0}
                >
                  <IoIosArrowBack className="text-lg font-bold" />
                  Anterior
                </button>
                <button
                 className="bg-primary hover:bg-opacity-90 text-sm p-1 px-4"
                >Info </button>
                <button
                className="bg-primary hover:bg-opacity-90 rounded-r-lg p-1 text-sm flex items-center px-2"
                  onClick={handleNext}
                  disabled={episodeNumbers.indexOf(Number(selectedEpisode)) === episodeNumbers.length - 1}
                >
                  Siguiente
                  <IoIosArrowForward  className="text-lg font-bold" />
                </button>
              </div>
            </div>
            <div className="md:w-[900px]">
              <BannerHead parrafe={"Descripcion Anime"} />
              <div>
                <p>
                  {isExpanded ? description : `${description?.slice(0, maxLength)}...`}
                  {description?.length > maxLength && (
                    <button
                      className="text-primary ml-2 hover:text-opacity-80"
                      onClick={toggleDescription}
                    >
                      {isExpanded ? "Leer menos" : "Leer más"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p>Publicidad</p>
            <img
              className="w-[250px] h-[370px] rounded-lg"
              src="/wallpaper2.webp"
              alt="imagen de publicidad 2"
            />
          </div>
        </div>
      </section>
      <section className="md:w-[900px]">
        <BannerHead parrafe={"Ver Más"} />
        <div className="flex md:flex-row flex-col gap-4 items-center">
          {loadingRandom ? (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          ) : (
            randomAnimes?.map((anime, i) => (
              <CardAnimes key={i} anime={anime} />
            ))
          )}
        </div>
      </section>
      <section>
        <BannerHead parrafe={"Género(s)"} />
        <div className="flex gap-1">
          {genres?.map((genre, i) => (
            <p
              className="bg-primary text-sm p-1 rounded-lg"
              key={i}
            >
              {genre}
            </p>
          ))}
        </div>
        <BannerHead parrafe={"Tags"} />
        <div className="flex gap-1 flex-wrap justify-center md:justify-start">
          {genresAnime?.map((genre, i) => (
            <p
              className="bg-primary rounded-lg p-1 text-sm"
              key={i}
            >
              {genre}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EpisodeDetail;