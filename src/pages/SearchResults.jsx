import { useSearchParams } from 'react-router-dom';
import {  useState } from 'react';
import CardAnimes from '../components/CardAnimes';
import { FaFire } from "react-icons/fa";
import Spinner from '../components/Spinner';
import useAnimeSearch from '../hooks/useAnimeSearch';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState('');
  const query = searchParams.get('q'); 

  const { results, loading } = useAnimeSearch(query, selectedGenre);


  return (
    <div>
      <div className="flex gap-4 items-center bg-secundary py-4 px-3 rounded-r-lg w-full border-l-[3px] border-primary my-5">
        <FaFire className="text-primary text-2xl" />
        <p>Resultados de {query}</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          {results.length > 0 ? (
            results.map((anime, i) => (
              <CardAnimes key={i} anime={anime} />
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;