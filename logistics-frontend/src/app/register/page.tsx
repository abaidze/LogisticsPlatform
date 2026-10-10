'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    if (password.length < 6) {
      setError('პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/register', { fullName, email, password });
      
      // წარმატებული რეგისტრაციის შემდეგ გადავამისამართებთ ლოგინზე
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'რეგისტრაცია ვერ მოხერხდა.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">რეგისტრაცია</h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">სრული სახელი</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none"
              placeholder="სრული სახელი"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ელ.ფოსტა</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">პაროლი</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'იტვირთება...' : 'რეგისტრაცია'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          უკვე გაქვს ანგარიში?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            შესვლა
          </Link>
        </p>
      </div>
    </div>
  );
}