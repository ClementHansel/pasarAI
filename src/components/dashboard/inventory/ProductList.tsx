"use client";

import React, { useState } from "react";
import { Product } from "@/types/inventory";
import { Edit, Trash2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useSession } from "next-auth/react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (ids: string[]) => Promise<void>;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const { data: session } = useSession();
  const accountId = session?.user?.id || "";
  const { addNotification } = useNotifications(accountId); // ✅ Fixed: Pass accountId
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

    try {
      setLoading(true);
      await onDelete(selected);
      addNotification({
        id: Date.now().toString(),
        title: "Success",
        message: `Deleted ${selected.length} product(s) successfully`,
        content: `Deleted ${selected.length} product(s) successfully`,
        timestamp: new Date().toISOString(),
        recipientEmail: session?.user?.email ?? "",
        read: false,
      });
      setSelected([]);
    } catch {
      addNotification({
        id: Date.now().toString(),
        title: "Error",
        message: "Failed to delete products. Please try again.",
        content: "Failed to delete products. Please try again.",
        timestamp: new Date().toISOString(),
        recipientEmail: session?.user?.email ?? "",
        read: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSingleDelete = async (productId: string) => {
    try {
      setLoading(true);
      await onDelete([productId]);
      addNotification({
        id: Date.now().toString(),
        title: "Success",
        message: "Product deleted successfully",
        content: "Product deleted successfully",
        timestamp: new Date().toISOString(),
        recipientEmail: session?.user?.email ?? "",
        read: false,
      });
    } catch {
      addNotification({
        id: Date.now().toString(),
        title: "Error",
        message: "Failed to delete product",
        content: "Failed to delete product",
        timestamp: new Date().toISOString(),
        recipientEmail: session?.user?.email ?? "",
        read: false,
      });
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
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
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
              className={`flex items-center justify-between border p-4 rounded-md transition-colors ${
                selected.includes(product.id)
                  ? "bg-red-50 border-red-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={() => handleSelect(product.id)}
                  className="w-4 h-4 cursor-pointer"
                  aria-label={`Select ${product.name}`}
                />
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {product.description}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm font-medium">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                    <span
                      className={`text-sm ${
                        product.isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  title="Edit"
                  disabled={loading}
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleSingleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                  title="Delete"
                  disabled={loading}
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
