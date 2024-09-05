import { genresAnime } from "../helpers/genresAnime";


const GenreSelector = () => {

  return (
    <div className="mb-4">
      <label htmlFor="genres" className="block text-lg font-medium">Filtrar por Género:</label>
      <select
        id="genres"
        multiple
        className="bg-slate-950 scrollbar scrollbar-thumb-primary p-2 rounded"
      >
        {genresAnime?.map(genre => (
          <option key={genre.id} value={genre}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;