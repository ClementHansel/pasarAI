//src\components\product\ProductCategory.tsx
"use client";

import { useEffect, useState } from "react";
import { ProductType, Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

export interface ProductCategoryProps {
  type: ProductType;
  searchTerm?: string;
  categoryFilter?: string;
  viewMode?: "grid" | "list";
  selectedFilters?: {
    region?: string;
    subRegion?: string;
    city?: string;
  };
  products: Product[];
  onCategoryChange?: (category: string) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCategory = ({
  type,
  searchTerm,
  categoryFilter,
  viewMode = "grid",
  selectedFilters = {},
}: ProductCategoryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch filtered products from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          type,
          searchTerm: searchTerm || "",
          categoryFilter: categoryFilter || "",
          region: selectedFilters.region || "",
          subRegion: selectedFilters.subRegion || "",
          city: selectedFilters.city || "",
        }).toString();

        const response = await fetch(`/api/products?${queryParams}`);

        if (!response.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Error fetching products");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading products...</div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No products found matching your criteria
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          )}
        >
          {products.length > 0 &&
            products?.map((product: Product) => (
              <ProductCard key={product.id} {...product} viewMode={viewMode} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
