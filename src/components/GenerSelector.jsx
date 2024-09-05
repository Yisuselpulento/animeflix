import useAnimeSearch from '../hooks/useAnimeSearch';
import { genresAnime } from '../helpers/genresAnime';

const GenreSelector = () => {
  const { selectedGenre, handleGenreChange } = useAnimeSearch();

  const handleChange = (e) => {
    const options = e.target.options;
    const selectedGenres = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);

    handleGenreChange(selectedGenres);
  };

  return (
    <div className="mb-4">
      <label htmlFor="genres" className="block text-lg font-medium">Filtrar por Género:</label>
      <select
        id="genres"
        multiple
        value={selectedGenre}
        onChange={handleChange}
        className="bg-slate-950 scrollbar scrollbar-thumb-primary p-2 rounded"
      >
        {genresAnime.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;