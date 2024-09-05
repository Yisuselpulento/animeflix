import { useEffect,useState } from "react"
import { fetchAnimesRecomend, fetchAnimesReview } from "../services/AnimeFetching"
import CardAnimes from "../components/CardAnimes"
import { FaFire } from "react-icons/fa";
import GenreSelector from "../components/GenerSelector";

const Home = () => {
  const [animesReview, setAnimesReview] = useState([])
  const [animesRecomend, setAnimesRecomend] = useState([])

  useEffect(()=>{

    const getAnimeReview = async ()=> {
      const data = await fetchAnimesReview()
      setAnimesReview(data.animes)
    }


    getAnimeReview()
  },[])

  useEffect(()=>{

    const getAnimeRecomend = async ()=> {
      const data = await fetchAnimesRecomend()
      setAnimesRecomend(data.animes)
    }


    getAnimeRecomend()
  },[])

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-5 text-center my-10">
        <h2 className="text-3xl font-bold">AnimeFlix - Ver Anime en Español</h2>
        <p className="text-gray-300">Bienvenido a la Mejor web de anime en Español, disfruta de miles de videos anime  online subtitulados al español puedes ver en linea o descargar en .mp4 actualizamos nuestros videos anime todos los dias con los videos anime de las ultimas temporadas.</p>
        <GenreSelector />
      </section>
      <div className="flex gap-4 items-center bg-secundary py-4 px-3 rounded-r-lg w-full border-l-[3px] border-primary my-5">
        <FaFire className="text-primary text-2xl" />
        <p>Review Animes</p>
      </div>
      <section className=" flex gap-7 flex-wrap items-center justify-center">
        {animesReview?.map((anime,i) => (
          <CardAnimes key={i} anime={anime} />
        ))}
      </section >
      <div className="flex gap-4 items-center bg-secundary  py-4 px-3 rounded-r-lg w-full border-l-[3px] border-primary my-5">
        <FaFire className="text-primary text-2xl" />
        <p>Recomendados</p>
      </div>
      <section className=" flex gap-7 flex-wrap items-center justify-center">
        {animesRecomend?.map((anime,i) => (
          <CardAnimes key={i} anime={anime} />
        ))}
      </section>
    </div>
  );
};

export default Home