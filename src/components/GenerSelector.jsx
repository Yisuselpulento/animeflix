import useAnimeDetail from "../hooks/useAnimeDetail";


const GenreSelector = () => {
   const { genresAnime} = useAnimeDetail()

  return (
    <div className="mb-4">
      <label htmlFor="genres" className="block text-lg font-medium">Filtrar por Género:</label>
      <select
        id="genres"
        multiple
        className="bg-slate-950 scrollbar scrollbar-thumb-primary p-2 rounded"
      >
        {genresAnime?.map((genre,i) => (
          <option key={i} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;