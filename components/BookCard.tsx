/* eslint-disable @next/next/no-img-element -- remote Open Library covers, no image optimizer needed */
"use client";

import { useState } from "react";
import type { Book } from "@/lib/genres";

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100" aria-hidden="true">
      <div className="aspect-[2/3] bg-slate-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-4/5 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="mt-4 h-9 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}

export default function BookCard({ book }: { book: Book }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const showCover = book.coverId !== null && !coverFailed;
  const query = encodeURIComponent([book.title, book.author].filter(Boolean).join(" "));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[2/3] bg-indigo-50">
        {showCover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div role="img" aria-label="No cover available" className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-indigo-700">
            <span aria-hidden="true" className="text-4xl">📖</span>
            <span className="text-xs font-semibold">No cover available</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-bold leading-snug text-slate-900">{book.title}</h3>
        <p className="mt-1 text-sm text-slate-700">{book.author ?? "Unknown author"}</p>
        <p className="text-xs text-slate-600">{book.year ? `First published ${book.year}` : "Year unknown"}</p>
        <a
          href={`https://www.abebooks.com/servlet/SearchResults?kn=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Find used copies<span className="sr-only"> of {book.title} (opens in new tab)</span>
        </a>
      </div>
    </article>
  );
}
