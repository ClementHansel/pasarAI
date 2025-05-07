// src/components/layout/homepage/RedeemGiftCard.tsx
"use client";

import React, { useState } from "react";
import { Gift, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function RedeemGiftCard() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRedeem = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/voucher/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          `🎉 Voucher redeemed! You got $${
            data.voucher.discount ?? data.voucher.value
          } off.`
        );
        setCode("");
      } else {
        throw new Error(data.error || "Failed to redeem voucher");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center mb-4">
        <Gift className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Redeem Gift Card</h2>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Enter gift card code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        />
        <Gift className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <button
        onClick={handleRedeem}
        disabled={loading || !code.trim()}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        <span>{loading ? "Redeeming..." : "Redeem"}</span>
      </button>

      {message && (
        <div className="mt-4 flex items-start gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 text-red-700 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
