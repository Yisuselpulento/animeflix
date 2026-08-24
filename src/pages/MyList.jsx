import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";
import useUser from "../hooks/useUser";
import BannerHead from "../components/BannerHead";

const ListSection = ({ title, animes, onRemove }) => (
  <section className="mb-8">
    <BannerHead parrafe={title} />
    {animes.length === 0 ? (
      <p className="text-gray-300">No hay animes en esta lista aún.</p>
    ) : (
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {animes.map(anime => (
          <div key={anime._id} className="relative group">
            <Link to={`/ver/${anime._id}`}>
              <div className="rounded-lg overflow-hidden w-[160px] h-[230px]">
                <img
                  className="w-[160px] h-[230px] object-cover rounded-lg group-hover:scale-105 transition-all"
                  src={anime.image}
                  alt={`imagen del anime ${anime.name}`}
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm mt-1 w-[160px] truncate">{anime.name}</p>
            </Link>
            <button
              onClick={() => onRemove(anime)}
              aria-label="Quitar"
              className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrash className="text-white text-sm" />
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
);

const MyList = () => {
  const { favorites, playlist, toggleFavorite, togglePlaylist } = useUser();

  return (
    <div>
      <div className="flex items-center gap-3 my-6">
        <FaHeart className="text-primary text-3xl" />
        <h1 className="text-3xl font-bold">Mi Lista</h1>
      </div>

      <ListSection title="Favoritos" animes={favorites} onRemove={toggleFavorite} />

      <div className="flex items-center gap-2 mb-2">
        <CgPlayListAdd className="text-primary text-2xl" />
      </div>
      <ListSection title="Playlist" animes={playlist} onRemove={togglePlaylist} />
    </div>
  );
};

export default MyList;
