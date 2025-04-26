// src/components/cart/full/MarketGroup.tsx
"use client";
import React from "react";
import { Trash } from "lucide-react";
import type { CartItem } from "@/types/cart";
import Button from "@/components/common/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import CartItems from "../CartItems";

interface MarketGroupProps {
  items: CartItem[];
  selectedItems: string[];
  onSelect: (ids: string[]) => void;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (ids: string[]) => void;
  onMoveToWishlist: (id: string) => void;
}

const MarketGroup: React.FC<MarketGroupProps> = ({
  items,
  selectedItems,
  onSelect,
  onUpdate,
  onRemove,
  onMoveToWishlist,
}) => {
  const marketName = items[0]?.marketName || "Market";
  const allSelected = items.every((item) => selectedItems.includes(item.id));

  const handleBulkSelect = (checked: boolean) => {
    const ids = items.map((item) => item.id);
    onSelect(
      checked
        ? [...selectedItems, ...ids]
        : selectedItems.filter((id) => !ids.includes(id))
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Checkbox checked={allSelected} onCheckedChange={handleBulkSelect} />
          <h2 className="text-lg font-semibold">{marketName}</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(items.map((item) => item.id))}
          className="text-destructive hover:text-destructive-dark"
        >
          <Trash className="w-4 h-4 mr-2" />
          Remove All
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItems
            key={item.id}
            item={item}
            selected={selectedItems.includes(item.id)}
            onSelect={(checked) =>
              onSelect(
                checked
                  ? [...selectedItems, item.id]
                  : selectedItems.filter((id) => id !== item.id)
              )
            }
            onUpdate={onUpdate}
            onRemove={() => onRemove([item.id])}
            onMoveToWishlist={onMoveToWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketGroup;
