"use client";

import React, { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import axios from "axios";

export default function DriverDashboardPage() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [driverName, setDriverName] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("https://localhost:7123/api/Routes", {
        fromCity,
        toCity,
        price: Number(price),
        date,
        availableSeats: Number(availableSeats),
        driverName,
      });

      setSuccessMessage("მარშრუტი წარმატებით დაემატა! 🎉");
      setFromCity("");
      setToCity("");
      setPrice("");
      setDate("");
      setAvailableSeats("");
      setDriverName("");

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (error) {
      console.error("მარშრუტის დამატების შეცდომა:", error);
      alert("მარშრუტის დამატება ვერ მოხერხდა.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg py-12 px-4 animate-fade-in text-slate-100 flex items-center justify-center">
      <div className="max-w-2xl w-full glass-card p-8 rounded-3xl shadow-2xl border border-slate-800">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">მძღოლის პანელი</h1>
        <p className="text-slate-400 text-sm mb-8">შეიყვანეთ რეისის დეტალები ახალი მარშრუტის გამოსაქვეყნებლად.</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-2xl shadow-lg backdrop-blur-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleCreateRoute} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">მძღოლის სახელი:</label>
            <Input
              type="text"
              required
              placeholder="მაგ: გიორგი"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">საიდან (ქალაქი):</label>
              <Input
                type="text"
                required
                placeholder="თბილისი"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">სად (ქალაქი):</label>
              <Input
                type="text"
                required
                placeholder="ბათუმი"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ფასი (₾):</label>
              <Input
                type="number"
                required
                placeholder="35"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">თარიღი:</label>
              <Input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ადგილები:</label>
              <Input
                type="number"
                min="1"
                required
                placeholder="4"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 shadow-lg shadow-blue-600/30">
            {isSubmitting ? "მიმდინარეობს დამატება..." : "მარშრუტის გამოქვეყნება"}
          </Button>
        </form>
      </div>
    </div>
  );
}