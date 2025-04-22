"use client";

import { useEffect, useMemo, useState } from "react";
import { Product, ProductType } from "@/types/product";
import ProductCard from "./ProductCard";
import { domesticProducts, globalProducts } from "@/lib/data/products";

interface ProductCategoryProps {
  type: ProductType;
  searchTerm?: string;
  categoryFilter?: string;
}

const ProductCategory = ({
  type,
  searchTerm,
  categoryFilter,
}: ProductCategoryProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Memoize the selected product data based on the type
  const selectedProductData = useMemo(() => {
    return type === "domestic" ? domesticProducts : globalProducts;
  }, [type]);

  // Flatten hierarchical product data into a single array and apply filters
  useEffect(() => {
    // Flatten the product data
    const flatProducts = selectedProductData.flatMap((region) =>
      region.subregions.flatMap((sub) =>
        sub.cities.flatMap((city) => city.products)
      )
    );

    // Filter by search term
    let filteredProducts = flatProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );

    // Apply category filter if provided
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category?.name === categoryFilter
      );
    }

    setProducts(filteredProducts); // Update the products state with filtered products
  }, [selectedProductData, searchTerm, categoryFilter]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        {type === "domestic" ? "Domestic Products" : "Global Products"}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
