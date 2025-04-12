// src/components/dashboard/OrdersInventory/ReorderLevel.tsx
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  reorderLevel: number;
  currentStock: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Product A", reorderLevel: 50, currentStock: 30 },
  { id: 2, name: "Product B", reorderLevel: 20, currentStock: 25 },
  { id: 3, name: "Product C", reorderLevel: 40, currentStock: 50 },
];

const ReorderLevel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Product A", reorderLevel: 50, currentStock: 30 },
        { id: 2, name: "Product B", reorderLevel: 20, currentStock: 25 },
        { id: 3, name: "Product C", reorderLevel: 40, currentStock: 50 },
      ]);
    }, 2000);
  }, []);

  const productsToReorder = products.filter(
    (product) => product.currentStock <= product.reorderLevel
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Reorder Level Alerts</h2>
      <ul>
        {productsToReorder.length > 0 ? (
          productsToReorder.map((product) => (
            <li key={product.id} className="text-sm text-red-600">
              {product.name} - Current stock: {product.currentStock}
            </li>
          ))
        ) : (
          <li className="text-sm text-green-600">
            All products are above reorder level.
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReorderLevel;
