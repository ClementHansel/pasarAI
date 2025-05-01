// src/components/cart/full/OrderSummary.tsx
"use client";
import React from "react";
import { Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface OrderSummaryProps {
  items: CartItem[];
  selectedItems: string[];
  voucher: string;
  onVoucherChange: (value: string) => void;
  onRemove: (ids: string[]) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  selectedItems,
  voucher,
  onVoucherChange,
  onRemove,
}) => {
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => {
      return sum + (item.discountedPrice || item.price) * item.quantity;
    }, 0);
  };

  const selectedTotal = calculateTotal(
    items.filter((item) => selectedItems.includes(item.id))
  );
  const shipping = selectedItems.length > 0 ? 10 : 0;
  const total = selectedTotal + shipping;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Selected Items ({selectedItems.length})</span>
          <span>{formatCurrency(selectedTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={voucher}
            onChange={(e) => onVoucherChange(e.target.value)}
            placeholder="Enter voucher code"
          />
          <Button variant="primary" className="gap-2">
            <Tag className="w-4 h-4" />
            Apply
          </Button>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => onRemove(selectedItems)}
          disabled={selectedItems.length === 0}
        >
          Remove Selected
        </Button>

        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
