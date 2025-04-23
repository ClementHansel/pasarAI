"use client";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function CheckoutPage() {
  const { balance, deductAmount } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Simulated total price (for demonstration purposes)
  const totalPrice = 25.0;

  // Proceed to payment after checking if wallet balance is sufficient
  const handlePayment = async () => {
    if (balance < totalPrice) {
      setError("Insufficient balance. Would you like to top up your wallet?");
      return;
    }

    setIsLoading(true);

    // Deduct the total price from the wallet
    const paymentSuccess = await deductAmount(totalPrice);

    if (paymentSuccess) {
      setError(null);
      router.push("/payment-success"); // Redirect to payment success page
    } else {
      setError("An error occurred while processing the payment.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <div className="bg-white p-4 rounded shadow space-y-4">
          <label className="block">
            <span className="block mb-1 font-medium">Full Name</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="John Doe"
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium">Address</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="123 Street Name"
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium">City</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="City"
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium">Postal Code</span>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="12345"
            />
          </label>
        </div>
      </section>

      {/* Delivery Method */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Method</h2>
        <div className="bg-white p-4 rounded shadow">
          <label htmlFor="deliveryMethod" className="block mb-2 font-medium">
            Choose a delivery method
          </label>
          <select
            id="deliveryMethod"
            name="deliveryMethod"
            className="w-full border rounded p-2"
          >
            <option>Standard Delivery - Free</option>
            <option>Express Delivery - $5.99</option>
          </select>
        </div>
      </section>

      {/* Order Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Product 1</span>
              <span>$10.00</span>
            </li>
            <li className="flex justify-between">
              <span>Product 2</span>
              <span>$15.00</span>
            </li>
            <li className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
