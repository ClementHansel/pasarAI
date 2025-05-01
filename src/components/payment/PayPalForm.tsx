// src/components/payment/PayPalForm.tsx
"use client";

import React from "react";
import Input from "@/components/common/Input";

interface PayPalFormProps {
  email: string;
  onChange: (value: string) => void;
}

const PayPalForm: React.FC<PayPalFormProps> = ({ email, onChange }) => (
  <div className="bg-white p-6 rounded shadow space-y-4">
    <h2 className="text-2xl font-semibold">PayPal Account</h2>
    <Input
      label="PayPal Email"
      value={email}
      onChange={(e) => onChange(e.target.value)}
      placeholder="email@example.com"
    />
  </div>
);

export default PayPalForm;
