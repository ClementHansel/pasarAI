// src/components/market/MarketList.tsx

import React, { useEffect, useState } from "react";
import { Product } from "../../../prisma/generated/prisma-client";

export default function MarketList() {
  // Set the state to be an array of Product objects
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products"); // Use the appropriate API for products
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
