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
      // POST მოთხოვნა ბექენდის მარშრუტების ენდფოინთზე
      await axios.post("https://localhost:7123/api/Routes", {
        fromCity,
        toCity,
        price: Number(price),
        date,
        availableSeats: Number(availableSeats),
        driverName,
      });

      setSuccessMessage("მარშრუტი წარმატებით დაემატა! 🎉");
      // ფორმის გასუფთავება
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
    <div className="max-w-3xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">მძღოლის პანელი — მარშრუტის დამატება</h1>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl shadow-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleCreateRoute} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">მძღოლის სახელი:</label>
          <Input
            type="text"
            required
            placeholder="მაგ: გიორგი"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">საიდან (ქალაქი):</label>
            <Input
              type="text"
              required
              placeholder="თბილისი"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">სად (ქალაქი):</label>
            <Input
              type="text"
              required
              placeholder="ბათუმი"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ფასი (₾):</label>
            <Input
              type="number"
              required
              placeholder="35"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">თარიღი:</label>
            <Input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">თავისუფალი ადგილები:</label>
            <Input
              type="number"
              min="1"
              required
              placeholder="4"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          {isSubmitting ? "მიმდინარეობს დამატება..." : "მარშრუტის გამოქვეყნება"}
        </Button>
      </form>
    </div>
  );
}