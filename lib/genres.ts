export type Genre = { label: string; slug: string };

export const GENRES: Genre[] = [
  { label: "Mystery", slug: "mystery" },
  { label: "Romance", slug: "romance" },
  { label: "Sci-Fi", slug: "science_fiction" },
  { label: "Fantasy", slug: "fantasy" },
  { label: "Thriller", slug: "thriller" },
];

export type Book = {
  key: string;
  title: string;
  author: string | null;
  year: number | null;
  coverId: number | null;
};
