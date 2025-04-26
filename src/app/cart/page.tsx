"use client";

import React, { useState } from "react";
import CartSection from "@/components/Cart/full/CartSection";
import { domesticProducts } from "@/lib/data/products";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Use mock products from products.ts
    return domesticProducts[0].subregions[0].cities[0].products.map(
      (product) => ({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        discountedPrice: product.originalPrice,
        quantity: 1,
        image: product.imageUrls[0],
        marketId: "market-1",
        marketName: "Mock Market",
      })
    );
  });

  const handleUpdate = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleRemove = (ids: string[]) => {
    setCartItems((prev) => prev.filter((item) => !ids.includes(item.id)));
  };

  const handleMoveToWishlist = (id: string) => {
    console.log(`Moved item ${id} to wishlist`);
    handleRemove([id]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartSection
        items={cartItems}
        onUpdate={handleUpdate}
        onRemove={handleRemove}
        onMoveToWishlist={handleMoveToWishlist}
      />
    </div>
  );
};

export default CartPage;
