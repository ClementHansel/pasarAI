"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/dashboard/inventory/ProductForm";
import ProductList from "@/components/dashboard/inventory/ProductList";

import { Spinner } from "react-bootstrap";
import { Market, Product } from "@/types/inventory";

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch("/api/products/seller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Unauthorized");
      }

      const data = await res.json();
      setProducts(data.products || []);
      setMarkets(data.markets || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch products");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (ids: string[]) => {
    try {
      const token = localStorage.getItem("accessToken");

      await Promise.all(
        ids.map((id) =>
          fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      fetchProducts();
    } catch {
      setError("Failed to delete product(s)");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      {markets.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold">Your Markets:</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {markets.map((market) => (
              <li key={market.id}>{market.name}</li>
            ))}
          </ul>
        </div>
      )}

      {showForm ? (
        <ProductForm
          initialData={selectedProduct}
          onSuccess={() => {
            fetchProducts();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={handleAddNew}
          >
            Add Product
          </button>

          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </>
      )}
    </div>
  );
};

export default InventoryPage;
