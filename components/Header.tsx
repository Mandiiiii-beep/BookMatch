import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-indigo-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight text-slate-900">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-sm text-white">B</span>
          BookMatch
        </Link>
        <span className="text-xs font-medium text-slate-600">Powered by Open Library</span>
      </div>
    </header>
  );
}
