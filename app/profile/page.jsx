'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <main className="grid min-h-screen place-items-center text-sm font-bold text-slate-500">Loading profile...</main>;

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="text-3xl font-black text-slate-900">Sign in to view your profile</h1>
        <Link href="/auth" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white">Go to sign in</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-5 py-10">
      <section className="mx-auto max-w-2xl rounded-[24px] bg-white p-7 shadow-sm sm:p-10">
        <Link href="/" className="text-sm font-bold text-indigo-600">← Back to discover</Link>
        <div className="mt-10 flex items-center gap-5">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-100 text-2xl font-black text-indigo-600">{user.email?.[0]?.toUpperCase()}</div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Reader profile</p>
            <h1 className="mt-1 text-2xl font-black text-slate-900">Your BookMatch account</h1>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email address</p>
          <p className="mt-2 font-semibold text-slate-700">{user.email}</p>
          <p className="mt-6 text-sm leading-6 text-slate-500">Your saved preferences and future recommendations will live here as your reading profile grows.</p>
        </div>
        <button onClick={handleSignOut} className="mt-8 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600">Sign out</button>
      </section>
    </main>
  );
}