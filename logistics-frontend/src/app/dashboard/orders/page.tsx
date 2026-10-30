'use client';

import React from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  // დემო შეკვეთების სია (შეგიძლიათ შეცვალოთ ან API-დან წამოიღოთ)
  const orders = [
    { id: 1, route: "თბილისი ➔ ბათუმი", seats: 2, price: 70, status: "აქტიური", date: "2026-11-01" },
    { id: 2, route: "ქუთაისი ➔ თბილისი", seats: 1, price: 25, status: "დასრულებული", date: "2026-10-28" },
    { id: 3, route: "თბილისი ➔ რუსთავი", seats: 3, price: 45, status: "მიმდინარე", date: "2026-10-25" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-bg py-10 px-4 animate-fade-in text-slate-100 flex">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* მარცხენა სალტე (Sidebar) */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 h-fit shadow-xl">
          <h2 className="text-xl font-extrabold text-white tracking-wide">ლოგისტიკა პანელი</h2>
          
          <nav className="space-y-2">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              მთავარი
            </Link>
            <Link 
              href="/dashboard/orders" 
              className="block px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20"
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
          <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <h1 className="text-2xl font-extrabold text-white">ჩემი შეკვეთები 📦</h1>
            
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-400">{order.route}</h3>
                    <p className="text-sm text-slate-400">ადგილები: {order.seats} | თარიღი: {order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-semibold">{order.price} ₾</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}