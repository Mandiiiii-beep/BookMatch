import { NextResponse } from "next/server";
import { GENRES, type Book } from "@/lib/genres";

type OpenLibraryWork = {
  key: string;
  title: string;
  cover_id?: number | null;
  first_publish_year?: number | null;
  authors?: { name: string }[];
};

export async function GET(request: Request) {
  const genre = new URL(request.url).searchParams.get("genre") ?? "";
  // Only allow known subjects so the endpoint can't be used as an open proxy.
  if (!GENRES.some((g) => g.slug === genre)) {
    return NextResponse.json({ error: "Unknown genre" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://openlibrary.org/subjects/${genre}.json?limit=12`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`Open Library responded ${res.status}`);
    const data = (await res.json()) as { works?: OpenLibraryWork[] };

    const books: Book[] = (data.works ?? []).map((w) => ({
      key: w.key,
      title: w.title,
      author: w.authors?.[0]?.name ?? null,
      year: w.first_publish_year ?? null,
      coverId: w.cover_id ?? null,
    }));
    return NextResponse.json({ books });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Open Library" },
      { status: 502 },
    );
  }
}
