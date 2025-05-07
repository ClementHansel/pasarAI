"use client";

import React, { useState } from "react";
import { Product } from "@/types/inventory";
import { Edit, Trash2 } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (ids: string[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (productId: string) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      await onDelete(selected);
      setSelected([]);
    } catch (error) {
      console.error("Failed to delete products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        {selected.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : `Delete Selected (${selected.length})`}
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex items-center justify-between border p-4 rounded-md ${
                selected.includes(product.id)
                  ? "bg-red-50 border-red-400"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={() => handleSelect(product.id)}
                  className="w-4 h-4"
                  aria-label="Checkbox"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete([product.id])}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
