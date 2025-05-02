"use client";

import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/CheckBox";
import SubmitButton from "./SubmitButton";
import { Product } from "@/types/inventory";

// Define props for ProductList component
interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading state
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Toggle selection of a product
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Handle delete action for selected products
  const handleDelete = async (ids: string[]) => {
    if (!confirm("Are you sure you want to delete the selected product(s)?"))
      return;

    setLoading(true); // Start loading state
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => !ids.includes(p.id))); // Filter out deleted products
        setSelected((prev) => prev.filter((id) => !ids.includes(id))); // Clear selected products
      } else {
        alert("Failed to delete products.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during deletion.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Product Inventory</h2>
        <Link href="/dashboard/inventory/new">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            <Plus size={18} />
            Add Product
          </button>
        </Link>
      </div>

      {/* Selected Controls */}
      {selected.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {selected.length} selected
          </span>
          <button
            onClick={() => handleDelete(selected)}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
          >
            <Trash size={16} />
            Delete Selected
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products available.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 relative shadow-sm hover:shadow-md transition"
            >
              <Checkbox
                checked={selected.includes(product.id)}
                onCheckedChange={() => toggleSelect(product.id)}
                className="absolute top-4 left-4"
              />

              <img
                src={product.image || "/placeholder.png"}
                alt={product.name || "Product image"}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="text-lg font-bold truncate">{product.name}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <p className="text-sm text-green-600">
                Sold: {product.soldCount}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onEdit(product)} // Trigger onEdit passed as prop
                  className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete([product.id])}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <Trash size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="mt-4">
          <SubmitButton loading />
        </div>
      )}
    </div>
  );
};

export default ProductList;
