"use client";

import React, { useState, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

interface RouteItem {
  id: number;
  fromCity: string;
  toCity: string;
  price: number;
  date: string;
  driverName: string;
  availableSeats: number;
}

// იმიტირებული მონაცემები ტესტირებისთვის
const MOCK_ROUTES: RouteItem[] = [
  { id: 1, fromCity: "თბილისი", toCity: "ბათუმი", price: 35, date: "2026-06-10", driverName: "გიორგი მ.", availableSeats: 3 },
  { id: 2, fromCity: "თბილისი", toCity: "ქუთაისი", price: 25, date: "2026-06-11", driverName: "დავით ბ.", availableSeats: 2 },
  { id: 3, fromCity: "ქუთაისი", toCity: "ბათუმი", price: 20, date: "2026-06-12", driverName: "ლევან კ.", availableSeats: 4 },
  { id: 4, fromCity: "თბილისი", toCity: "თელავი", price: 15, date: "2026-06-13", driverName: "ნიკა ს.", availableSeats: 5 },
];

export default function RoutesPage() {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  // Debounce-ის გამოყენება 300 მილიწამიანი დაყოვნებით
  const debouncedFrom = useDebounce(searchFrom, 300);
  const debouncedTo = useDebounce(searchTo, 300);

  // useMemo-ს გამოყენება ფილტრაციის ოპტიმიზაციისთვის (მძიმე გამოთვლებისგან დასაცავად)
  const filteredRoutes = useMemo(() => {
    return MOCK_ROUTES.filter((route) => {
      const matchFrom = route.fromCity.toLowerCase().includes(debouncedFrom.toLowerCase());
      const matchTo = route.toCity.toLowerCase().includes(debouncedTo.toLowerCase());
      return matchFrom && matchTo;
    });
  }, [debouncedFrom, debouncedTo]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">ლოჯისტიკური მარშრუტები</h1>

      {/* ძებნის და ფილტრაციის პანელი */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">საიდან</label>
          <Input
            type="text"
            placeholder="ქალაქი (მაგ: თბილისი)"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">სად</label>
          <Input
            type="text"
            placeholder="ქალაქი (მაგ: ბათუმი)"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
          />
        </div>
      </div>

      {/* შედეგების სია / Card ბადე */}
      {filteredRoutes.length > 0 ? (
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
              <Button onClick={() => alert(`არჩეულია მარშრუტი: ${route.fromCity} - ${route.toCity}`)} className="w-full">
                არჩევა / დაჯავშნა
              </Button>
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