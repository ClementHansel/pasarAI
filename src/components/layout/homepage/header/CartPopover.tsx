// component/homepage/header/CartPopover.tsx
"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import CartPreview from "@/components/Cart/preview/CartPreview";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";

const CartPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state: CartState) => state.items);
  const removeItem = useCartStore((state: CartState) => state.removeItem);
  const totalItems = useCartStore((state: CartState) => state.totalCount());

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="relative">
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none shadow-xl max-h-[300px] overflow-y-auto"
        align="end"
      >
        <CartPreview
          items={items}
          onClose={() => setIsOpen(false)}
          onRemoveItem={(id) => removeItem(id)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
