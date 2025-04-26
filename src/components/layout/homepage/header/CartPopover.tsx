// component/homepage/header/CartPopover.tsx
"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import CartPreview from "@/components/Cart/preview/CartPreview";
import { CartItem } from "@/types/cart";
import { domesticProducts } from "@/lib/data/products";

interface CartPopoverProps {
  items?: CartItem[]; // Tambahkan tanda ? untuk prop opsional
  onRemoveItem: (id: string) => void;
}

const CartPopover: React.FC<CartPopoverProps> = ({
  items = [],
  onRemoveItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mockItems, setMockItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Use mock products from products.ts
    const mockCartItems =
      domesticProducts[0].subregions[0].cities[0].products.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        discountedPrice: product.originalPrice,
        quantity: 1,
        image: product.imageUrls[0],
        marketId: "market-1",
        marketName: "Mock Market",
      }));
    setMockItems(mockCartItems);
  }, []);

  const totalItems = mockItems.reduce(
    (sum, item) => sum + (item?.quantity || 0),
    0
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="relative">
        <ShoppingCart className="w-6 h-6" />
        {mockItems.length > 0 && (
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
          items={mockItems}
          onClose={() => setIsOpen(false)}
          onRemoveItem={(id) =>
            setMockItems((prev) => prev.filter((item) => item.id !== id))
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
