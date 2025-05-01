// src/components/CreateMarket.tsx
"use client";

import { useState } from "react";
import { Building2, MapPin, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateMarket() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [revenue, setRevenue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/markets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, revenue: parseInt(revenue) }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Market created successfully");
        // Reset form
        setName("");
        setLocation("");
        setRevenue("");
      } else {
        toast.error(data.message || "Error creating market");
      }
    } catch (error) {
      toast.error("Failed to create market");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Market
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Building2
            className="absolute left-3 top-3 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Market Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <DollarSign
            className="absolute left-3 top-3 text-gray-400"
            size={20}
          />
          <input
            type="number"
            placeholder="Revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
        >
          {isSubmitting ? "Creating..." : "Create Market"}
        </button>
      </form>
    </div>
  );
}
