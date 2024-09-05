import { useParams } from "react-router-dom";
import { FaStar, FaHome, FaHeart  } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { CgPlayListAdd } from "react-icons/cg";
import { formatDate } from "../helpers/formatDate";
import { FaGithubAlt } from "react-icons/fa6";
import CardAnimes from "../components/CardAnimes";
import BannerHead from "../components/BannerHead";
import useAnimeDetail from "../hooks/useAnimeDetail";

const AnimeDetail = () => {
  const { animeName } = useParams();
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

  const { bgImage, description, episodes, genres, image, name, release, score, studios, type, _id } = animeDetail;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
       <div
      className="w-full h-[670px] bg-cover bg-center opacity-30 blur-xl absolute md:-mx-[270px] md:-my-[160px] -mx-[10px]"
      style={{ backgroundImage: `url(${bgImage})` }}
       >
       </div>
      <section className="relative flex flex-col items-center md:items-start">
        <div className="flex gap-4 items-center text-center">
          <Link to="/">
            <FaHome className="text-primary text-xl hover:opacity-70 hover:scale-125" />
          </Link>
          <p className="text-primary text-4xl pb-5">.</p>
          <Link className="hover:text-primary text-sm" to="/">Animes</Link>
          <p className="text-primary text-4xl pb-5">.</p>
          <Link className="hover:text-primary text-sm" to={`/ver/${_id}`}>{name}</Link>
        </div>
        <div className="flex gap-4 md:flex-row flex-col items-center md:items-start">
          <div className="flex flex-col gap-2">
            <div className="min-w-[300px]">
              <img className="w-[280px] object-cover h-[430px] border-primary border-[4px] rounded-lg" src={image} alt={`imagen del anime ${name}`} />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex gap-1 items-center">
              <FaStar className="text-yellow-300 text-2xl" />
              <FaStar className="text-yellow-300 text-2xl" />
              <FaStar className="text-yellow-300 text-2xl" />
              <FaStar className="text-yellow-300 text-2xl" />
              <FaStar className="text-yellow-300 text-2xl" />
              </div>
              <p className="text-xl font-bold">{score}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center md:text-start">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p>
                {isExpanded ? description : `${description?.slice(0, maxLength)}...`}
                {description?.length > maxLength && (
                  <button 
                    className="text-primary ml-2 hover:text-opacity-80"
                    onClick={toggleDescription}
                  >
                    {isExpanded ? "Leer menos" : "Leer mas"}
                  </button>
                )}
          </p>
            <div className="flex md:justify-between p-5 items-center flex-wrap justify-center gap-5">
              <div>
                <p>Release</p>
                <p className="text-gray-300">{release}</p>
              </div>
              <div>
                <p>Type</p>
                <p className="text-gray-300">{type}</p>
              </div>
              <div>
                <p>Rating</p>
                <p className="text-gray-300">{score}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button>
                <FaHeart className="text-primary hover:text-opacity-80" />
                </button>
                <p className="text-gray-300">0 Favorites</p>
              </div>
              <div className="flex flex-col items-center ">
                <button>
                <CgPlayListAdd className="text-primary text-3xl  hover:text-opacity-80" />
                </button>
                <p className="text-gray-300">Add to playlist</p>
              </div>
            </div>
            <div>
              <p>Genres:</p>
              <div className="flex gap-1 flex-wrap text-sm justify-center md:justify-start">
                {genres?.map((genre, i) => (
                  <p className="rounded-lg bg-primary p-1" key={i}>{genre}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Studios:</p>
              <div className="flex gap-2 flex-wrap text-sm justify-center md:justify-start">
                {studios?.map((studio, i) => (
                  <p className="rounded-lg bg-primary p-1" key={i}>{studio}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
           
      </section>
      <section className="mt-5 flex md:flex-row justify-between flex-col">
        <div className="border-primary border-l-[4px] md:w-[800px] ">
          <div className="-my-5 -ml-[3px] -mb-[17px]">
            <BannerHead parrafe={"Ver Episodios"} />
          </div>
          <div className="flex flex-col gap-4  max-h-[600px] overflow-y-scroll scrollbar scrollbar-thumb-primary ">
          {episodes?.length > 0 ? (
              episodes?.map((epi, i) => (
                <div
                  key={i}
                  className="flex border-t-[1px] border-gray-700 p-2 justify-between"
                >
                  <div className="flex gap-5 items-center">
                    <div className="w-[130px] h-[75px] overflow-hidden rounded-lg">
                      <Link
                      to={`/ver/${animeName}/${epi.id}`}
                      > 
                        <img
                          className="w-[130px] h-[75px] rounded-lg hover:scale-105 transition-all object-cover"
                          src={epi?.image || image}
                          alt={`Imagen del episodio ${epi.title}`}
                        />
                      </Link>
                    </div>
                    <div>
                      <p className="mb-2">{epi.episode}</p>
                      <p className="text-sm md:text-md max-w-[140px]">
                        {epi.title}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm md:block hidden text-gray-300">
                      {formatDate(epi.release)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-10">
                <p className="text-center text-gray-300">No hay episodios disponibles.</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center mt-10">
          <div className="flex gap-2 flex-col justify-center items-center ">
            <p>publicidad</p>
            <img 
            className="w-[300px] rounded-lg"
            src="/wallpaper4.webp" alt="imagen de publicidad"/>
          </div>
          <Link 
          to="https://github.com/Yisuselpulento"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2">
             <FaGithubAlt className="text-6xl text-pink-500"/>
             <p className="text-6xl font-extrabold">GitHub</p>
          </Link>
        </div>
      </section>
      <section className="mt-5 md:w-[800px]">
         <BannerHead parrafe={"Ver Mas"} />
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
      <section className="mt-5">
          <BannerHead parrafe={"Tags"} />
          <div className="flex gap-1 flex-wrap justify-center md:justify-start">
            {genresAnime?.map((genre,i)=> (
              <p 
              className="bg-primary rounded-lg p-1 text-sm"
              key={i}>{genre}</p>
            ) )}

          </div>
      </section>
    </div>
  );
};

export default AnimeDetail;