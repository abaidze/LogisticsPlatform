'use client';

import Link from 'next/link';
import { useAuthStore } from '../../lib/store';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ლოგო */}
        <Link href="/" className="text-xl font-bold text-blue-400 flex items-center gap-2 tracking-wide hover:opacity-90 transition">
          <span className="animate-float inline-block">🚚</span> LogistiX
        </Link>

        {/* დესკტოპ ნავიგაცია */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-blue-400 transition">მთავარი</Link>
          <Link href="/routes" className="hover:text-blue-400 transition">მარშრუტები</Link>
          <Link href="/about" className="hover:text-blue-400 transition">ჩვენ შესახებ</Link>
          <Link href="/driver/dashboard" className="text-blue-400 hover:text-blue-300 transition font-semibold">
            + მარშრუტის დამატება
          </Link>
        </nav>

        {/* დესკტოპ ავტორიზაცია */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="text-sm py-1.5 px-3 border-slate-700 text-slate-200 hover:bg-slate-800">პანელი</Button>
              </Link>
              <Button
                variant="danger"
                className="text-sm py-1.5 px-3"
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
              >
                გასვლა
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" className="text-sm py-1.5 px-3 border-slate-700 text-slate-200 hover:bg-slate-800">შესვლა</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" className="text-sm py-1.5 px-3 bg-blue-600 hover:bg-blue-500">რეგისტრაცია</Button>
              </Link>
            </div>
          )}
        </div>

        {/* მობილური ჰამბურგერ ღილაკი */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* მობილური ჩამოსაშლელი მენიუ */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-blue-400 font-medium py-1"
          >
            მთავარი
          </Link>
          <Link
            href="/routes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-blue-400 font-medium py-1"
          >
            მარშრუტები
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-blue-400 font-medium py-1"
          >
            ჩვენ შესახებ
          </Link>
          <Link
            href="/driver/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-blue-400 font-semibold py-1"
          >
            + მარშრუტის დამატება
          </Link>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-sm border-slate-700 text-slate-200">პანელი</Button>
                </Link>
                <Button
                  variant="danger"
                  className="w-full text-sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    router.push('/login');
                  }}
                >
                  გასვლა
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-sm border-slate-700 text-slate-200">შესვლა</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full text-sm bg-blue-600 hover:bg-blue-500">რეგისტრაცია</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};