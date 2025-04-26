// src/components/payment/CardDetailsForm.tsx
"use client";

import React from "react";
import Input from "@/components/common/Input";

interface CardDetailsProps {
  data: { name: string; number: string; expiry: string; cvv: string };
  onChange: (data: CardDetailsProps["data"]) => void;
}

const CardDetailsForm: React.FC<CardDetailsProps> = ({ data, onChange }) => (
  <div className="bg-white p-6 rounded shadow space-y-4">
    <h2 className="text-2xl font-semibold">Card Details</h2>
    <Input
      label="Cardholder Name"
      value={data.name}
      onChange={(e) => onChange({ ...data, name: e.target.value })}
      placeholder="John Doe"
    />
    <Input
      label="Card Number"
      value={data.number}
      onChange={(e) => onChange({ ...data, number: e.target.value })}
      placeholder="•••• •••• •••• ••••"
    />
    <div className="flex space-x-4">
      <Input
        label="Expiry Date"
        value={data.expiry}
        onChange={(e) => onChange({ ...data, expiry: e.target.value })}
        placeholder="MM/YY"
      />
      <Input
        label="CVV"
        value={data.cvv}
        onChange={(e) => onChange({ ...data, cvv: e.target.value })}
        placeholder="123"
      />
    </div>
  </div>
);

export default CardDetailsForm;
