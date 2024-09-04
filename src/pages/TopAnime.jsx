import { useEffect, useState } from "react"
import { fetchAnimeTop } from "../services/AnimeFetching"
import Spinner from "../components/Spinner";
import CardTopAnime from "../components/CardTopAnime";
import BannerHead from "../components/BannerHead";

const TopAnime = () => {
   const [animeTops, setAnimeTops] = useState([])
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const getTopAnimes = async () => {
      setLoading(true); 
      const { animes } = await fetchAnimeTop();
      console.log(animes);
      setAnimeTops(animes);
      setLoading(false);
    };

    getTopAnimes();
  }, []);

  return (
    <div className="md:w-[850px]">
      <BannerHead parrafe={"Top 10 Animes"} />
      <div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner /> 
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {animeTops.map((anime, i) => (
              <CardTopAnime key={i} anime={anime} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopAnime