

export default function GenreSelector({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose a Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedGenre === genre
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}