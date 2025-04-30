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
  onClearCart: () => void; // Added onClearCart prop
}

const CartSection: React.FC<CartSectionProps> = ({
  items,
  onUpdate,
  onRemove,
  onMoveToWishlist,
  onClearCart, // Destructured onClearCart
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

      <div className="lg:col-span-1 space-y-6">
        <OrderSummary
          items={items}
          selectedItems={selectedItems}
          voucher={voucher}
          onVoucherChange={setVoucher}
          onRemove={onRemove}
        />

        {/* Add a Clear Cart Button */}
        <button
          onClick={onClearCart}
          className="w-full bg-red-500 text-white py-2 rounded-md mt-4"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSection;
