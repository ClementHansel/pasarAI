// src/components/cart/full/CartSection.tsx
"use client";
import React, { useState } from "react";
import type { CartItem } from "@/types/cart";
import MarketGroup from "./MarketGroup";
import OrderSummary from "./OrderSummary";

interface CartSectionProps {
  items: CartItem[];
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (ids: string[]) => void;
  onMoveToWishlist: (id: string) => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  items,
  onUpdate,
  onRemove,
  onMoveToWishlist,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [voucher, setVoucher] = useState("");

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.marketId]) acc[item.marketId] = [];
    acc[item.marketId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {Object.entries(groupedItems).map(([marketId, marketItems]) => (
          <MarketGroup
            key={marketId}
            items={marketItems}
            selectedItems={selectedItems}
            onSelect={setSelectedItems}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onMoveToWishlist={onMoveToWishlist}
          />
        ))}
      </div>

      <OrderSummary
        items={items}
        selectedItems={selectedItems}
        voucher={voucher}
        onVoucherChange={setVoucher}
        onRemove={onRemove}
      />
    </div>
  );
};

export default CartSection;
