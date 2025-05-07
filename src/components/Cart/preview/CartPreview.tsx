// src/components/cart/preview/CartPreview.tsx
"use client";
import React from "react";
import { ShoppingBag, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import PreviewItem from "./PreviewItem";

interface CartPreviewProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({
  items,
  onClose,
  onRemoveItem,
}) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-[400px] bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]">
      <header className="p-4 border-b flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-medium">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label="close cart preview"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {items.length === 0 ? (
        <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/product"
            className="text-primary hover:text-primary-dark font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto divide-y">
            {items.map((item) => (
              <PreviewItem key={item.id} item={item} onRemove={onRemoveItem} />
            ))}
          </div>

          <footer className="p-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Estimated Total</span>
              <span className="text-lg font-bold">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <Link
              href="/cart"
              className="flex items-center justify-center w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors gap-2"
            >
              View Full Cart
              <ChevronRight className="w-4 h-4" />
            </Link>
          </footer>
        </>
      )}
    </div>
  );
};

export default CartPreview;
