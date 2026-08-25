// components/BookList.js

export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No books found in this genre.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2"></div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {book.title}
            </h3>

            {/* Author */}
            <p className="text-indigo-600 font-semibold mb-3">by {book.author}</p>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {book.description}
            </p>

            {/* Rating and Price */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-yellow-500 font-semibold">⭐ {book.rating || 'N/A'}</span>
              <span className="text-lg font-bold text-indigo-600">
                ${book.newBookPrice?.toFixed(2) || 'TBA'}
              </span>
            </div>

            {/* Genre Badge */}
            <div className="mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                {book.genre}
              </span>
            </div>

            {/* Match Score (if available) */}
            {book.matchScore && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-sm font-semibold text-green-600">
                    {Math.round(book.matchScore)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${book.matchScore}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                Buy Used
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}