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
    <div className="mb-4 bg-gray-800 px-4 py-2 rounded-lg md:h-[360px] flex items-center flex-col w-[300px] my-5">
      <label htmlFor="genres" className="block text-lg font-medium">Filtrar por Género:</label>
      <select
        id="genres"
        multiple
        value={selectedGenre}
        onChange={handleChange}
        className="bg-slate-900 scrollbar scrollbar-thumb-primary p-1 my-2 h-[300px] w-[260px] "
      >
        {genresAnime.map(genre => (
          <option 
          className='p-2 border-b border-slate-800 hover:bg-slate-700 cursor-pointer rounded'
          key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;