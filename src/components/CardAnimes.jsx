import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const CardAnimes = ({ anime }) => {
  const { image, name, score, _id } = anime;

  return (
    <Link to={`/ver/${_id}`}>
      <div className="rounded-lg overflow-hidden md:w-[180px] md:h-[260px] w-[300px] h-400px relative group">
        <div>
          <img
            className="md:w-[180px] md:h-[260px]  w-[300px] h-400px rounded-lg group-hover:scale-105 transition-all object-cover group-hover:blur-sm duration-500"
            src={image}
            alt={`imagen del anime ${name}`}
          />
        </div>
        <p className="absolute bottom-0 w-full text-center text-white font-bold shadow-lg transition-colors duration-500 group-hover:text-primary">
          {name}
        </p>
        <div className="flex gap-2 items-center bg-gray-800 absolute top-1 right-1 p-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-opacity-70">
          <FaStar className="text-yellow-300 text-md" /> {score}
        </div>
      </div>
    </Link>
  );
};

export default CardAnimes;