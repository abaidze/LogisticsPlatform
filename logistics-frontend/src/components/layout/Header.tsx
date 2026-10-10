'use client';

import Link from 'next/link';
import { useAuthStore } from '../../lib/store';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ლოგო */}
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          🚚 LogistiX
        </Link>

        {/* ნავიგაცია */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">მთავარი</Link>
          <Link href="/routes" className="hover:text-blue-600 transition">მარშრუტები</Link>
          <Link href="/about" className="hover:text-blue-600 transition">ჩვენ შესახებ</Link>
        </nav>

        {/* ავტორიზაციის ღილაკები / იუზერი */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="text-sm py-1.5 px-3">პანელი</Button>
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
                <Button variant="outline" className="text-sm py-1.5 px-3">შესვლა</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" className="text-sm py-1.5 px-3">რეგისტრაცია</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};