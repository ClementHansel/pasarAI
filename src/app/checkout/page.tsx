// src/app/checkout/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import Button from "@/components/common/Button";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliverySelector from "@/components/checkout/DeliverySelector";
import OrderSummary from "@/components/common/OrderSummary";

export default function CheckoutPage() {
  const { balance } = useWallet();
  const router = useRouter();

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with real cart data
  const cartItems = [
    { id: "1", name: "Product 1", price: 10.0 },
    { id: "2", name: "Product 2", price: 15.0 },
  ];

  const totalPrice =
    cartItems.reduce((sum, item) => sum + item.price, 0) +
    (deliveryMethod === "express" ? 5.99 : 0);

  const handleProceed = () => {
    const { fullName, address, city, postalCode } = shippingData;
    if (!fullName || !address || !city || !postalCode) {
      setError("Please complete all required shipping fields.");
      return;
    }
    setError(null);
    // Persist shippingData and deliveryMethod here
    router.push("/payment");
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-10 gap-8">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-extrabold">Checkout</h1>
        <ShippingForm data={shippingData} onChange={setShippingData} />
        <DeliverySelector value={deliveryMethod} onChange={setDeliveryMethod} />
        {error && <p className="text-red-600">{error}</p>}
        <Button onClick={handleProceed} className="w-full">
          Continue to Payment
        </Button>
      </div>
      <aside className="w-full lg:w-1/3 sticky top-20">
        <OrderSummary items={cartItems} deliveryMethod={deliveryMethod} />
      </aside>
    </div>
  );
}
