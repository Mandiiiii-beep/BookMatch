// components/GenreSelector.js

export default function GenreSelector({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-sm font-bold text-slate-500">Browse by genre</span>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              selectedGenre === genre
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}