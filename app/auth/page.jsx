'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState('sign-in'); // 'sign-in' | 'sign-up'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const result = mode === 'sign-in'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` }
        });
      const { error: authError, data } = result;

      if (authError) {
        setError(authError.message);
        return;
      }

      if (mode === 'sign-up' && !data.session) {
        setMessage('Account created. Check your email to verify your address before signing in.');
        setMode('sign-in');
      } else {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-8">
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Welcome to BookMatch</p>
        <h1 className="mb-6 text-center text-3xl font-black tracking-tight text-slate-900">
          {mode === 'sign-in' ? 'Sign In' : 'Create an Account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold leading-5 text-emerald-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          {mode === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
            className="text-indigo-600 font-medium hover:text-indigo-800"
          >
            {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
