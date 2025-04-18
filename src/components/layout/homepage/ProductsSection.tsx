"use client";

import React from "react";
import ProductRow from "@/components/layout/homepage/ProductRow";
import { Product } from "@/types/product";

interface ProductsSectionProps {
  products: Product[] | undefined;
  loading: boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  loading,
}) => {
  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Debug: log to help detect issues in production
  console.log("ProductsSection received products:", safeProducts);

  // Group products by label name (not category)
  const newArrivals = safeProducts.filter(
    (product) => product.labels?.name === "New Arrivals"
  );
  const bestSellers = safeProducts.filter(
    (product) => product.labels?.name === "Best Sellers"
  );
  const onSale = safeProducts.filter(
    (product) => product.labels?.name === "On Sale"
  );

  return (
    <section className="py-8">
      {loading ? (
        <p>Loading products...</p>
      ) : safeProducts.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <ProductRow title="New Arrivals" products={newArrivals} />
          )}
          {bestSellers.length > 0 && (
            <ProductRow title="Best Sellers" products={bestSellers} />
          )}
          {onSale.length > 0 && (
            <ProductRow title="On Sale" products={onSale} />
          )}
        </>
      )}
    </section>
  );
};

export default ProductsSection;
