// components/GenreSelector.js

export default function GenreSelector({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Choose Your Genre
      </h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50'
                : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-gray-700 hover:text-white'
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}