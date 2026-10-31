'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface BookingItem {
  id: number;
  route?: string;
  fromCity?: string;
  toCity?: string;
  seatsBooked?: number;
  seats?: number;
  totalAmount?: number;
  price?: number;
  status: string;
  date: string;
  guestName?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get("https://localhost:7123/api/Bookings", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });

        const allOrders: BookingItem[] = response.data;
        
        const currentUsername = (localStorage.getItem("username") || localStorage.getItem("user") || "").toLowerCase().trim();

        const filteredOrders = allOrders.filter(order => {
          if (!order.guestName) return true; // თუ სახელი არ მიებედა, ვაჩვენოთ უსაფრთხოებისთვის
          return order.guestName.toLowerCase().trim() === currentUsername;
        });

        setOrders(filteredOrders.length > 0 ? filteredOrders : allOrders);

      } catch (error) {
        console.error("ვერ მოხერხდა შეკვეთების წამოღება:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

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
              სრული ჯავშნების სია
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
            <h1 className="text-2xl font-extrabold text-white">ჯავშნები 📦</h1>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-blue-400">
                        {order.route || `${order.fromCity || 'ქალაქი'} ➔ ${order.toCity || 'ქალაქი'}`}
                      </h3>
                      <p className="text-sm text-slate-400">
                        ადგილები: {order.seatsBooked || order.seats || 1} | თარიღი: {order.date || 'მიმდინარე'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-400 font-semibold">{order.totalAmount || order.price || 0} ₾</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300">
                        {order.status || "აქტიური"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <p className="text-4xl mb-2">📭</p>
                <p className="text-lg font-medium text-slate-300">თქვენ ჯერ არ გაქვთ შეკვეთები</p>
                <p className="text-sm mt-1">გადადით მარშრუტების გვერდზე და დაჯავშნეთ სასურველი რეისი.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}