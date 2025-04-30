// src/components/cart/preview/PreviewItem.tsx
import React from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

interface PreviewItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const PreviewItem: React.FC<PreviewItemProps> = ({ item, onRemove }) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500"
              aria-label="remove item from cart"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="text-sm">
              <span className="text-gray-500">Qty: </span>
              <span className="font-medium">{item.quantity}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(
                  (item.discountedPrice || item.price) * item.quantity
                )}
              </p>
              {item.discountPercentage && (
                <p className="text-xs text-green-600">
                  {item.discountPercentage}% off
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewItem;
