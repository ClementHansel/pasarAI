// src/components/payment/PaymentMethodSelector.tsx
"use client";

import React from "react";

interface PaymentMethodSelectorProps {
  value: "card" | "paypal";
  onChange: (value: PaymentMethodSelectorProps["value"]) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
}) => (
  <div className="bg-white p-6 rounded shadow space-y-2">
    <h2 className="text-2xl font-semibold">Payment Method</h2>
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="payment"
        checked={value === "card"}
        onChange={() => onChange("card")}
      />
      <span>Credit Card</span>
    </label>
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="payment"
        checked={value === "paypal"}
        onChange={() => onChange("paypal")}
      />
      <span>PayPal</span>
    </label>
  </div>
);

export default PaymentMethodSelector;
