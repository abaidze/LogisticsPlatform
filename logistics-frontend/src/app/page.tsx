import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 p-4 text-center">
      <h1 className="text-4xl font-extrabold text-blue-900">ლოჯისტიკის პლატფორმა</h1>
      <p className="text-lg text-slate-600">კეთილი იყოს თქვენი მობრძანება B2B/B2C ლოჯისტიკურ სისტემაში</p>
      
      <div className="flex gap-4 mt-2">
        <Link 
          href="/login" 
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition shadow-sm"
        >
          შესვლა
        </Link>
        <Link 
          href="/register" 
          className="rounded-lg border border-blue-600 px-6 py-2.5 text-blue-600 font-medium hover:bg-blue-50 transition shadow-sm"
        >
          რეგისტრაცია
        </Link>
      </div>
    </div>
  );
}