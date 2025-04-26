// src/app/payment/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import Button from "@/components/common/Button";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import CardDetailsForm from "@/components/payment/CardDetailsForm";
import PayPalForm from "@/components/payment/PayPalForm";
import OrderSummary from "@/components/common/OrderSummary";

export default function PaymentPage() {
  const { balance, deductAmount } = useWallet();
  const router = useRouter();

  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: Replace with real cart data
  const cartItems = [
    { id: "1", name: "Product 1", price: 10.0 },
    { id: "2", name: "Product 2", price: 15.0 },
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    if (method === "card") {
      const { name, number, expiry, cvv } = cardData;
      if (!name || !number || !expiry || !cvv) {
        setError("Please complete all credit card details.");
        return;
      }
    } else if (!paypalEmail) {
      setError("Please enter your PayPal email.");
      return;
    }

    if (balance < totalAmount) {
      setError("Insufficient wallet balance. Please top up.");
      return;
    }

    setError(null);
    setLoading(true);
    const success = await deductAmount(totalAmount);
    setLoading(false);

    if (success) {
      router.push("/payment-success");
    } else {
      setError("Payment processing failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto px-6 py-10 gap-8">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-extrabold">Payment</h1>
        <PaymentMethodSelector value={method} onChange={setMethod} />
        {method === "card" ? (
          <CardDetailsForm data={cardData} onChange={setCardData} />
        ) : (
          <PayPalForm email={paypalEmail} onChange={setPaypalEmail} />
        )}
        {error && <p className="text-red-600">{error}</p>}
        <Button onClick={handlePayment} disabled={loading} className="w-full">
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </Button>
      </div>
      <aside className="w-full lg:w-1/3 sticky top-20">
        <OrderSummary items={cartItems} />
      </aside>
    </div>
  );
}
