import { Link } from "react-router-dom"
import { FaEye } from "react-icons/fa";

const CardTopAnime = ({anime, index}) => {


    const { type, score, release, studios,name,image,genres, _id } = anime

  return (
    <div className="flex gap-4 py-5 md:px-20 md:flex-row flex-col">
        <div className="relative flex items-center md:items-start  justify-center md:justify-start">
            <Link 
            to={`/ver/${_id}`}
            >
            <div className="md:w-[180px] md:h-[250px] w-[290px] rounded-lg overflow-hidden">
            <img 
            className="md:w-[180px] md:h-[250px] w-[290px]   rounded-lg border-[4px] border-primary object-cover hover:scale-105 transition-all"
            src={image} alt={`imagen del anime ${name}`} />
            </div>
            </Link>
         
            <div className="bg-primary py-1 px-2 rounded-full w-[45px] text-center absolute -top-1 md:-left-4 left-3 border-[3px] border-gray-800">#{index + 1}</div>
        </div>
        <div className="md:w-[400px] flex flex-col gap-3">
            <h3 className="text-xl">{name}</h3>
            <div  className="flex gap-1 flex-col">
                <div className="flex gap-3">
                    <p className="text-gray-300">Release:</p>
                    <p>{release}</p>
                </div>
                <div className="flex gap-3">
                    <p className="text-gray-300">Type:</p>
                    <p>{type}</p>
                </div>
                <div className="flex gap-3">
                    <p className="text-gray-300">Score:</p>
                    <p>{score}</p>
                </div>
                <div className="flex gap-3">
                    <p className="text-gray-300">Studios:</p>
                    <div className="flex gap-2">
                        {studios.map((studio,i) => (<p key={i}>{studio}</p>))}
                    </div>
                </div>
                <div className="flex gap-3">
                    <p className="text-gray-300">Genres:</p>
                    <div className="flex gap-2">
                        {genres.map((genre,i) => (<p key={i}>{genre}</p>))}
                    </div>
                </div>
            </div>
          
            <Link 
             to={`/ver/${_id}`}
            className="w-full md:mt-16 bg-primary py-2 rounded text-center hover:bg-opacity-70 transition-all flex items-center justify-center gap-1">
                <FaEye className="text-xl" />
                Ver</Link>
            
        </div>
    </div>
  )
}

export default CardTopAnime