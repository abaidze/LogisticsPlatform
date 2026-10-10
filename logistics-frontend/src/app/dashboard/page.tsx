'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    // თუ ტოკენი არ არის, ვუშვებთ რედირექტს ლოგინზე
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return null; // სანამ რედირექტი შესრულდება, არაფერს აჩვენებს
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* გვერდითი მენიუ */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-6">ლოჯისტიკა პანელი</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">მთავარი</a>
            <a href="#" className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">შეკვეთები</a>
            <a href="#" className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">მარშრუტები</a>
          </nav>
        </div>

        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="w-full rounded-lg bg-red-50 py-2 text-red-600 font-medium hover:bg-red-100 transition"
        >
          გასვლა
        </button>
      </aside>

      {/* მთავარი კონტენტი */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800">გამარჯობა, {user?.fullName || 'მომხმარებელო'}!</h1>
          <span className="text-sm text-slate-500">{user?.email}</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">აქტიური შეკვეთები</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">მიმდინარე მიწოდებები</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium">დასრულებული</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">48</p>
          </div>
        </div>
      </main>
    </div>
  );
}