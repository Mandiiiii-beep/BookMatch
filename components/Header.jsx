'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-sm text-white">B</span>
          BookMatch
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex" aria-label="Main navigation">
          <Link className="text-indigo-600" href="/">Discover</Link>
          <Link className="hover:text-indigo-600" href="/#book-shelf">Catalog</Link>
        </nav>

        <div className="flex items-center gap-3">
          {loading ? null : user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
              >
                Sign out
              </button>
              <Link
                href="/profile"
                aria-label="Open your profile"
                title="Profile"
                className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 text-indigo-700 transition hover:bg-indigo-200"
              >
                <span aria-hidden="true" className="relative block h-6 w-6">
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-current" />
                  <span className="absolute bottom-0 left-1/2 h-3 w-5 -translate-x-1/2 rounded-t-full bg-current" />
                </span>
              </Link>
            </div>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
