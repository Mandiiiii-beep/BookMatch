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
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          📚 BookMatch
        </Link>

        <div>
          {loading ? null : user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
