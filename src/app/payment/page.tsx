"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import Button from "@/components/common/Button";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliverySelector from "@/components/checkout/DeliverySelector";
import OrderSummary from "@/components/common/OrderSummary";
import { useCartStore } from "@/lib/cartStore";

interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const { balance } = useWallet();
  const router = useRouter();

  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { items: cartItems, clearCart } = useCartStore();

  const deliveryFee = deliveryMethod === "express" ? 5.99 : 0;
  const totalPrice =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    deliveryFee;

  const buyerId = "mock-user-123"; // TODO: Replace with actual session user ID

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
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          cartItems,
          shippingAddress: {
            fullName,
            address,
            city,
            postalCode,
            deliveryMethod,
          },
          paymentMethod: "wallet",
        }),
      });

      const data = (await res.json()) as {
        success: boolean;
        order: { id: string };
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed.");
      }

      // Clear cart and redirect
      clearCart();
      router.push(`/payment?orderId=${data.order.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-10 gap-8">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl font-extrabold">Checkout</h1>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-lg font-semibold">Your Wallet Balance:</p>
          <p className="text-2xl text-green-600 font-bold">
            ${balance.toFixed(2)}
          </p>
        </div>

        <ShippingForm data={shippingData} onChange={setShippingData} />
        <DeliverySelector value={deliveryMethod} onChange={setDeliveryMethod} />

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <Button onClick={handleProceed} className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>

      <aside className="w-full lg:w-1/3 sticky top-20">
        <OrderSummary items={cartItems} deliveryMethod={deliveryMethod} />

        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <p className="text-lg font-semibold">Total Price:</p>
          <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </aside>
    </div>
  );
}
