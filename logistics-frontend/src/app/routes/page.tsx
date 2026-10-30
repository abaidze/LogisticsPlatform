"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
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

  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [seatsCount, setSeatsCount] = useState<string>("1");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchFrom = route.fromCity.toLowerCase().includes(debouncedFrom.toLowerCase());
      const matchTo = route.toCity.toLowerCase().includes(debouncedTo.toLowerCase());
      return matchFrom && matchTo;
    });
  }, [routes, debouncedFrom, debouncedTo]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute) return;

    const parsedSeats = Number(seatsCount) || 1;
    setIsSubmitting(true);

    try {
      await axios.post("https://localhost:7123/api/Bookings", {
        routeId: selectedRoute.id,
        guestName: passengerName,
        seatsBooked: parsedSeats,
        totalAmount: parsedSeats * selectedRoute.price,
      });

      setSuccessMessage(`წარმატებით დაჯავშნა! მარშრუტი: ${selectedRoute.fromCity} ➔ ${selectedRoute.toCity} (${parsedSeats} ადგილი)`);
      setIsModalOpen(false);
      setPassengerName("");
      setSeatsCount("1");
      setSelectedRoute(null);

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (error) {
      console.error("დაჯავშნის შეცდომა:", error);
      alert("დაჯავშნა ვერ მოხერხდა, სცადეთ თავიდან.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg py-10 animate-fade-in text-slate-100">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h1 className="text-3xl font-extrabold text-white mb-6 tracking-tight">სატრანსპორტო მარშრუტები</h1>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-2xl shadow-lg flex items-center justify-between backdrop-blur-md">
            <span>🎉 {successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 font-bold px-2 hover:text-white">✕</button>
          </div>
        )}
        
        {/* ძებნის პანელი შუშის ეფექტით */}
        <div className="glass-card p-6 rounded-2xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">საიდან</label>
            <Input 
              type="text" 
              placeholder="ქალაქი..." 
              value={searchFrom} 
              onChange={(e) => setSearchFrom(e.target.value)} 
              className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">სად</label>
            <Input 
              type="text" 
              placeholder="ქალაქი..." 
              value={searchTo} 
              onChange={(e) => setSearchTo(e.target.value)} 
              className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="glass-card p-6 rounded-2xl shadow-md flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-400">{route.fromCity} ➔ {route.toCity}</span>
                    <span className="text-emerald-400 font-semibold">{route.price} ₾</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-1">მძღოლი: <span className="font-medium text-slate-200">{route.driverName}</span></p>
                  <p className="text-sm text-slate-400 mb-1">თარიღი: {route.date}</p>
                  <p className="text-sm text-slate-400 mb-4">თავისუფალი ადგილები: {route.availableSeats}</p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedRoute(route);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                >
                  არჩევა / დაჯავშნა
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-white">მარშრუტები ვერ მოიძებნა</h3>
            <p className="text-slate-400 text-sm mt-1">სცადეთ სხვა თარიღის ან ქალაქის მითითება.</p>
          </div>
        )}

        {/* დაჯავშნის მოდალი */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="მარშრუტის დაჯავშნა">
          {selectedRoute && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="bg-slate-900/60 p-3 rounded-xl text-sm text-slate-300 space-y-1 border border-slate-800">
                <p><strong>მიმართულება:</strong> {selectedRoute.fromCity} ➔ {selectedRoute.toCity}</p>
                <p><strong>ფასი 1 ადგილზე:</strong> {selectedRoute.price} ₾</p>
                <p><strong>თარიღი:</strong> {selectedRoute.date}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">მგზავრის სახელი და გვარი:</label>
                <Input
                  type="text"
                  required
                  placeholder="შეიყვანეთ სახელი..."
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ადგილების რაოდენობა:</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={seatsCount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      if (val === "" || Number(val) <= selectedRoute.availableSeats) {
                        setSeatsCount(val);
                      }
                    }
                  }}
                  required
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>

              <div className="text-right font-bold text-white text-base pt-2">
                სრული თანხა: <span className="text-emerald-400">{(Number(seatsCount) || 1) * selectedRoute.price} ₾</span>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                {isSubmitting ? "მიმდინარეობს დამუშავება..." : "დაჯავშნის დადასტურება"}
              </Button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
}