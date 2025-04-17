"use client";

import React from "react";
import ProductRow from "@/components/layout/homepage/ProductRow";
import { Product } from "@/types/product";

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products = [],
  loading,
}) => {
  // Group products by category name
  const newArrivals = products.filter(
    (product) => product.category?.name === "New Arrivals"
  );
  const bestSellers = products.filter(
    (product) => product.category?.name === "Best Sellers"
  );
  const onSale = products.filter(
    (product) => product.category?.name === "On Sale"
  );

  return (
    <section className="py-8">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductRow title="New Arrivals" products={newArrivals} />
          <ProductRow title="Best Sellers" products={bestSellers} />
          <ProductRow title="On Sale" products={onSale} />
        </>
      )}
    </section>
  );
};

export default ProductsSection;
