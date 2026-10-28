"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import axios from "axios";

interface RouteItem {
  id: number;
  fromCity: string;
  toCity: string;
  price: number;
  date: string;
  driverName: string;
  availableSeats: number;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  // მარშრუტების წამოღება .NET API-დან Axios-ით
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("https://localhost:7123/api/Routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("ვერ მოხერხდა მარშრუტების წამოღება API-დან:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const debouncedFrom = useDebounce(searchFrom, 300);
  const debouncedTo = useDebounce(searchTo, 300);

  // საწყისი და საბოლოო პუნქტების მიხედვით ფილტრაცია
  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchFrom = route.fromCity.toLowerCase().includes(debouncedFrom.toLowerCase());
      const matchTo = route.toCity.toLowerCase().includes(debouncedTo.toLowerCase());
      return matchFrom && matchTo;
    });
  }, [routes, debouncedFrom, debouncedTo]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">სატრანსპორტო მარშრუტები</h1>

      {/* ძებნის ინფუთები */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">საიდან</label>
          <Input 
            type="text" 
            placeholder="ქალაქი..." 
            value={searchFrom} 
            onChange={(e) => setSearchFrom(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">სად</label>
          <Input 
            type="text" 
            placeholder="ქალაქი..." 
            value={searchTo} 
            onChange={(e) => setSearchTo(e.target.value)} 
          />
        </div>
      </div>

      {/* რეისების ვიზუალიზაცია Card კომპონენტის გამოყენებით */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">იტვირთება მარშრუტები API-დან... ⏳</div>
      ) : filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-blue-600">{route.fromCity} ➔ {route.toCity}</span>
                  <span className="text-emerald-600 font-semibold">{route.price} ₾</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">მძღოლი: <span className="font-medium text-slate-800">{route.driverName}</span></p>
                <p className="text-sm text-slate-600 mb-1">თარიღი: {route.date}</p>
                <p className="text-sm text-slate-600 mb-4">თავისუფალი ადგილები: {route.availableSeats}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-lg">მსგავსი მარშრუტი ვერ მოიძებნა 📭</p>
        </div>
      )}
    </div>
  );
}