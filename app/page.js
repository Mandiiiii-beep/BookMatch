// app/page.js

'use client';

import { useState } from 'react';
import GenreSelector from '@/components/GenreSelector';
import BookList from '@/components/BookList';

const GENRES = ['mystery', 'romance', 'scifi', 'fantasy', 'thriller'];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
    setLoading(true);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre })
      });

      const data = await response.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-indigo-600">📚 BookMatch</h1>
          <p className="text-gray-600 mt-2">Discover your next favorite book & find used copies at great prices</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Genre Selector */}
        <GenreSelector 
          genres={GENRES}
          selectedGenre={selectedGenre}
          onSelectGenre={handleGenreSelect}
        />

        {/* Books Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Finding your perfect books...</p>
          </div>
        ) : selectedGenre ? (
          <BookList books={books} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">👈 Select a genre to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
}