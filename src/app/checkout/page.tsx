"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import Button from "@/components/common/Button";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliverySelector from "@/components/checkout/DeliverySelector";
import OrderSummary from "@/components/common/OrderSummary";
import axios from "axios";

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
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch cart data from the API
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/cart"); // Replace with actual API endpoint
        setCartItems(response.data.items); // Assuming response contains the items
      } catch {
        setError("Failed to load cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const totalPrice =
    cartItems.reduce((sum, item) => sum + item.price, 0) +
    (deliveryMethod === "express" ? 5.99 : 0);

  const handleProceed = async () => {
    const { fullName, address, city, postalCode } = shippingData;
    if (!fullName || !address || !city || !postalCode) {
      setError("Please complete all required shipping fields.");
      return;
    }
    if (balance < totalPrice) {
      setError("Insufficient balance. Please top up your wallet.");
      return;
    }
    setError(null);

    try {
      // Send shipping data and delivery method to the backend
      await axios.post("/api/checkout", {
        shippingData,
        deliveryMethod,
        totalPrice,
      });

      // Proceed to the payment page
      router.push("/payment");
    } catch {
      setError("Failed to proceed to payment.");
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-10 gap-8">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-extrabold">Checkout</h1>

        {/* Show user's balance */}
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-lg font-semibold">Your Wallet Balance:</p>
          <p className="text-2xl text-green-600 font-bold">
            ${balance.toFixed(2)}
          </p>
        </div>

        <ShippingForm data={shippingData} onChange={setShippingData} />
        <DeliverySelector value={deliveryMethod} onChange={setDeliveryMethod} />

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <Button onClick={handleProceed} className="w-full">
          Continue to Payment
        </Button>
      </div>

      <aside className="w-full lg:w-1/3 sticky top-20">
        <OrderSummary items={cartItems} deliveryMethod={deliveryMethod} />

        {/* Show Total Price */}
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <p className="text-lg font-semibold">Total Price:</p>
          <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </aside>
    </div>
  );
}
