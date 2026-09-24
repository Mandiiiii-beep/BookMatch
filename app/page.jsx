
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import GenreSelector from '@/components/GenreSelector';
import BookList from '@/components/BookList';

const GENRES = ['mystery', 'romance', 'scifi', 'fantasy', 'thriller'];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [authorQuery, setAuthorQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [booksError, setBooksError] = useState(null);

  const visibleBooks = books.filter((book) =>
    book.author?.toLowerCase().includes(authorQuery.toLowerCase())
  );

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setBooksError(null);

      try {
        const response = await fetch('/api/books');
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Could not load books from MongoDB.');
        }

        setBooks(data.data);
      } catch (error) {
        setBooksError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

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
      setBooksError('Could not load recommendations from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <main className="mx-auto max-w-7xl px-5 py-8 pb-16 lg:px-10 lg:py-12">
        <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[22px] bg-[#dce8ff] p-7 sm:p-10">
            <div className="relative z-10 max-w-md">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Curated for curious minds</p>
              <h1 className="max-w-sm text-4xl font-black leading-[0.98] tracking-tight text-slate-900 sm:text-5xl">Find a story that stays with you.</h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">Personalized recommendations, thoughtful collections, and better books for every kind of reader.</p>
              <button onClick={() => scrollToSection('book-shelf')} className="mt-7 rounded-full bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">Explore the collection <span className="ml-2">→</span></button>
            </div>
            <div className="absolute -bottom-9 right-10 hidden h-56 w-36 rotate-6 rounded bg-[#f3c967] p-4 text-center text-xs font-black text-slate-800 shadow-xl sm:block">
              <span className="block text-[9px] uppercase tracking-widest">Featured read</span>
              <span className="mt-12 block text-xl leading-tight">The Midnight Library</span>
              <span className="mt-8 block text-[10px]">Matt Haig</span>
            </div>
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/40" />
          </div>
          <div className="rounded-[22px] bg-[#f5d9d5] p-7 sm:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">Reader&apos;s pick</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900">Stories for every version of you.</h2>
              </div>
              <div className="mt-8 flex items-end justify-between gap-4">
                <p className="max-w-[190px] text-sm leading-6 text-slate-600">From page-turners to quiet classics, your next favorite is waiting.</p>
                <button onClick={() => scrollToSection('book-shelf')} aria-label="View recommended books" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-xl text-rose-500 transition hover:scale-105">↗</button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <GenreSelector genres={GENRES} selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Refine your search</p>
            <h2 className="mt-1 text-lg font-black text-slate-900">Looking for a particular author?</h2>
          </div>
          <div className="relative mt-4 sm:mt-0 sm:w-80">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
            <input
              type="search"
              value={authorQuery}
              onChange={(event) => setAuthorQuery(event.target.value)}
              placeholder="Search by author"
              aria-label="Search books by author"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </section>

        {loading ? (
          <div className="py-24 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            <p className="mt-4 text-sm font-semibold text-slate-500">Finding your next favorite...</p>
          </div>
        ) : (
          <section id="book-shelf" className="mt-10 scroll-mt-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{selectedGenre ? `${selectedGenre} collection` : 'Fresh from the shelf'}</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{selectedGenre ? 'Books picked for you' : 'New books this week'}</h2>
              </div>
              <span className="hidden text-sm font-bold text-slate-400 sm:block">Scroll to browse →</span>
            </div>
            {booksError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">{booksError}</div>
            ) : (
              <BookList books={visibleBooks} />
            )}
          </section>
        )}

        <section className="mt-12 rounded-[22px] bg-[#e8f1e8] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Read more, spend less</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Used books marketplace</h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">Affordable pre-loved copies from independent readers. Every listing is used, inspected, and ready for a new shelf.</p>
            </div>
            <button onClick={() => scrollToSection('market-listings')} className="w-fit rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-md shadow-emerald-200 hover:bg-emerald-800">Browse all listings →</button>
          </div>
          <div id="market-listings" className="mt-7 grid scroll-mt-6 gap-3 md:grid-cols-3">
            {books.slice(0, 3).map((book, index) => (
              <article key={`market-${book.title}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <div className="grid h-20 w-14 shrink-0 place-items-center rounded bg-slate-800 p-2 text-center text-[9px] font-black leading-tight text-white" style={{ backgroundColor: ['#4f46e5', '#e85d75', '#d3922e'][index] }}>
                  {book.title}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black text-slate-800">{book.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{book.author}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-black text-emerald-700">${(book.newBookPrice * 0.45).toFixed(2)}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">Good condition</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Your reading journey</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900">Make your next read count.</h2>
            </div>
            <button onClick={() => scrollToSection('book-shelf')} className="w-fit rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:border-indigo-400 hover:text-indigo-600">View your library →</button>
          </div>
        </section>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-slate-200 bg-white/95 px-4 py-3 text-xs font-bold text-slate-400 backdrop-blur md:hidden" aria-label="Mobile navigation">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-indigo-600">⌂<br />Home</button>
        <button onClick={() => scrollToSection('book-shelf')}>▦<br />Catalog</button>
        <Link href="/profile" aria-label="Open your profile">
          <span aria-hidden="true" className="relative mx-auto mb-1 block h-5 w-5">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-current" />
            <span className="absolute bottom-0 left-1/2 h-2.5 w-4 -translate-x-1/2 rounded-t-full bg-current" />
          </span>
          Profile
        </Link>
      </nav>
    </div>
  );
}