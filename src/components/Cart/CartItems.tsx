// src/components/cart/full/CartItem.tsx
import React from "react";
import Image from "next/image";
import { Minus, Plus, Heart, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import { Checkbox } from "../ui/CheckBox";

interface CartItemProps {
  item: CartItem;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: () => void;
  onMoveToWishlist: (id: string) => void;
}

const CartItems: React.FC<CartItemProps> = ({
  item,
  selected,
  onSelect,
  onUpdate,
  onRemove,
  onMoveToWishlist,
}) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="mt-1"
      />

      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.marketName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onMoveToWishlist(item.id)}
              className="text-gray-400 hover:text-primary"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-destructive"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => onUpdate(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
            <button
              onClick={() => onUpdate(item.id, item.quantity + 1)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            {item.discountPercentage && (
              <p className="text-sm text-green-600">
                Save {item.discountPercentage}%
              </p>
            )}
            <p className="text-lg font-medium">
              {formatCurrency(
                (item.discountedPrice || item.price) * item.quantity
              )}
            </p>
            {item.discountedPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(item.price * item.quantity)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
