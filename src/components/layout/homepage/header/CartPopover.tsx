// src/components/layout/homepage/header/CartPopover.tsx

import React from "react";
import { ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const CartPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
          3
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h4 className="font-semibold mb-2">Cart</h4>
        <div className="text-sm text-gray-600">
          Your cart items will appear here.
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
