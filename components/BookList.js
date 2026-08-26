// components/BookList.js

export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-400">No books found in this genre.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-purple-600/50 rounded-xl hover:shadow-lg hover:shadow-purple-600/20 transition-all overflow-hidden group"
        >
          {/* Header Accent */}
          <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
              {book.title}
            </h3>

            {/* Author */}
            <p className="text-purple-400 text-sm font-medium mb-3">by {book.author}</p>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {book.description}
            </p>

            {/* Rating and Price */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-yellow-400 font-bold text-sm">⭐ {book.rating || 'N/A'}</span>
              <span className="text-pink-400 font-bold text-lg">
                ${book.newBookPrice?.toFixed(2) || 'TBA'}
              </span>
            </div>

            {/* Genre Badge */}
            <div className="mb-4">
              <span className="inline-block bg-purple-900/40 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-600/30">
                {book.genre.toUpperCase()}
              </span>
            </div>

            {/* Match Score */}
            {book.matchScore && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Match Score</span>
                  <span className="text-xs font-bold text-green-400">
                    {Math.round(book.matchScore)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${book.matchScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-100 py-2 rounded-lg font-medium text-sm transition">
                View Details
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-medium text-sm transition shadow-lg shadow-purple-600/30">
                Buy Used
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}