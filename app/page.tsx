"use client";

import { useCallback, useRef, useState } from "react";
import BookCard, { SkeletonCard } from "@/components/BookCard";
import { GENRES, type Book, type Genre } from "@/lib/genres";

type Status = "idle" | "loading" | "error" | "success";

export default function Home() {
  const [genre, setGenre] = useState<Genre | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async (g: Genre) => {
    controller.current?.abort();
    const ctrl = new AbortController();
    controller.current = ctrl;
    setGenre(g);
    setStatus("loading");
    try {
      const res = await fetch(`/api/discover?genre=${g.slug}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { books: Book[] };
      setBooks(data.books);
      setStatus("success");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setStatus("error");
    }
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-12 text-center sm:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Discover your next <span className="text-indigo-600">favorite book</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-700 sm:text-lg">
          Discover your next favorite book &amp; find used copies at great prices.
        </p>
      </section>

      <section aria-labelledby="genre-heading">
        <h2 id="genre-heading" className="text-center text-xl font-bold text-slate-900">
          Choose your genre
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
          {GENRES.map((g) => {
            const active = genre?.slug === g.slug;
            return (
              <button
                key={g.slug}
                type="button"
                aria-pressed={active}
                onClick={() => load(g)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-live="polite" aria-busy={status === "loading"}>
        {status === "idle" && (
          <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-indigo-200 bg-white/60 px-6 py-12 text-center">
            <div aria-hidden="true" className="text-5xl">📚</div>
            <p className="mt-3 text-lg font-bold text-slate-900">Select a genre to get started!</p>
            <p className="mt-1 text-sm text-slate-700">Pick one above and we&apos;ll pull up a shelf of books for you.</p>
          </div>
        )}

        {status === "loading" && (
          <>
            <span className="sr-only">Loading books…</span>
            <Grid>{Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)}</Grid>
          </>
        )}

        {status === "error" && genre && (
          <div role="alert" className="mx-auto max-w-md rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-rose-200">
            <p className="font-bold text-slate-900">Oops, we couldn&apos;t load those books.</p>
            <p className="mt-1 text-sm text-slate-700">Open Library may be busy. Please try again.</p>
            <button
              type="button"
              onClick={() => load(genre)}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Try again
            </button>
          </div>
        )}

        {status === "success" && books.length === 0 && (
          <p className="text-center text-slate-700">No books found for {genre?.label}. Try another genre.</p>
        )}

        {status === "success" && books.length > 0 && (
          <Grid>{books.map((b) => <BookCard key={b.key} book={b} />)}</Grid>
        )}
      </section>
    </main>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">{children}</div>;
}
