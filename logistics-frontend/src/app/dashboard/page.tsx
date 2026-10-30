'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-bg py-10 px-4 animate-fade-in text-slate-100 flex">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* მარცხენა სალტე (Sidebar) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 h-fit shadow-xl">
          <h2 className="text-xl font-extrabold text-white tracking-wide">ლოგისტიკა პანელი</h2>
          
          <nav className="space-y-2">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20"
            >
              მთავარი
            </Link>
            <Link 
              href="/dashboard/orders" 
              className="block px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              შეკვეთები
            </Link>
            <Link 
              href="/routes" 
              className="block px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              მარშრუტები
            </Link>
          </nav>
        </div>

        {/* მარჯვენა მთავარი კონტენტი */}
        <div className="lg:col-span-3 space-y-6">
          {/* მისალმების ბარათი */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h1 className="text-2xl font-extrabold text-white">გამარჯობა, მომხმარებელო! 👋</h1>
          </div>

          {/* სტატისტიკის ქარდები */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl hover:border-blue-500/40 transition">
              <p className="text-sm font-medium text-slate-400">აქტიური შეკვეთები</p>
              <h3 className="text-4xl font-extrabold text-white mt-2">12</h3>
            </div>
            
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl hover:border-indigo-500/40 transition">
              <p className="text-sm font-medium text-slate-400">მიმდინარე მიწოდებები</p>
              <h3 className="text-4xl font-extrabold text-indigo-400 mt-2">5</h3>
            </div>
            
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl hover:border-emerald-500/40 transition">
              <p className="text-sm font-medium text-slate-400">დასრულებული</p>
              <h3 className="text-4xl font-extrabold text-emerald-400 mt-2">48</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}