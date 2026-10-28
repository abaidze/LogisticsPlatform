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

  // დაჯავშნასთან დაკავშირებული სტეიტები
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [seatsCount, setSeatsCount] = useState<string>("1");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  // დაჯავშნის POST მოთხოვნის გაგზავნა ბექენდში
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
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">სატრანსპორტო მარშრუტები</h1>

      {/* წარმატების ტოასტ შეტყობინება */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl shadow-sm flex items-center justify-between">
          <span>🎉 {successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 font-bold px-2">✕</button>
        </div>
      )}
      
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
              <Button
                onClick={() => {
                  setSelectedRoute(route);
                  setIsModalOpen(true);
                }}
                className="w-full mt-4"
              >
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

      {/* დაჯავშნის მოდალური ფანჯარა */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="მარშრუტის დაჯავშნა">
        {selectedRoute && (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 space-y-1">
              <p><strong>მიმართულება:</strong> {selectedRoute.fromCity} ➔ {selectedRoute.toCity}</p>
              <p><strong>ფასი 1 ადგილზე:</strong> {selectedRoute.price} ₾</p>
              <p><strong>თარიღი:</strong> {selectedRoute.date}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">მგზავრის სახელი და გვარი:</label>
              <Input
                type="text"
                required
                placeholder="შეიყვანეთ სახელი..."
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ადგილების რაოდენობა:</label>
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
                onBlur={() => {
                  if (seatsCount === "" || Number(seatsCount) < 1) {
                    setSeatsCount("1");
                  }
                }}
                required
              />
            </div>

            <div className="text-right font-bold text-slate-800 text-base pt-2">
              სრული თანხა: <span className="text-emerald-600">{(Number(seatsCount) || 1) * selectedRoute.price} ₾</span>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "მიმდინარეობს დამუშავება..." : "დაჯავშნის დადასტურება"}
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}