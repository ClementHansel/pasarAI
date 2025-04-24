// src/components/checkout/ShippingForm.tsx
"use client";

import React from "react";
import Input from "@/components/common/Input";

interface ShippingFormProps {
  data: { fullName: string; address: string; city: string; postalCode: string };
  onChange: (data: ShippingFormProps["data"]) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold">Shipping Information</h2>
      <Input
        label="Full Name"
        value={data.fullName}
        onChange={(e) => onChange({ ...data, fullName: e.target.value })}
        placeholder="John Doe"
      />
      <Input
        label="Address"
        value={data.address}
        onChange={(e) => onChange({ ...data, address: e.target.value })}
        placeholder="123 Main St"
      />
      <Input
        label="City"
        value={data.city}
        onChange={(e) => onChange({ ...data, city: e.target.value })}
        placeholder="City"
      />
      <Input
        label="Postal Code"
        value={data.postalCode}
        onChange={(e) => onChange({ ...data, postalCode: e.target.value })}
        placeholder="12345"
      />
    </div>
  );
};

export default ShippingForm;
