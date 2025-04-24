// src/components/checkout/DeliverySelector.tsx
"use client";

import React from "react";

interface DeliverySelectorProps {
  value: "standard" | "express";
  onChange: (value: DeliverySelectorProps["value"]) => void;
}

const DeliverySelector: React.FC<DeliverySelectorProps> = ({
  value,
  onChange,
}) => (
  <div className="bg-white p-6 rounded shadow space-y-2">
    <h2 className="text-2xl font-semibold">Delivery Method</h2>
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="delivery"
        checked={value === "standard"}
        onChange={() => onChange("standard")}
      />
      <span>Standard Delivery - Free</span>
    </label>
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="delivery"
        checked={value === "express"}
        onChange={() => onChange("express")}
      />
      <span>Express Delivery - $5.99</span>
    </label>
  </div>
);

export default DeliverySelector;
