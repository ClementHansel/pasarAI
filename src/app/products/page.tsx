"use client";

import { useState } from "react";
import { ProductType } from "@/types/product";
import ProductCategory from "@/components/product/ProductCategory";
import ProductFilter from "@/components/product/ProductFilter";

const ProductPage = () => {
  const [productType, setProductType] = useState<ProductType>("domestic");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Handle search term change
  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  // Toggle between domestic and global products
  const toggleProductType = (type: ProductType) => {
    setProductType(type);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Products</h1>

      {/* Toggle buttons for switching between product types */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          className={`px-4 py-2 border rounded-md ${
            productType === "domestic"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleProductType("domestic")}
        >
          Domestic Products (IDR)
        </button>
        <button
          className={`px-4 py-2 border rounded-md ${
            productType === "global" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleProductType("global")}
        >
          Global Products (USD)
        </button>
      </div>

      <div className="space-y-6">
        <ProductFilter
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
        <ProductCategory
          type={productType}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
        />
      </div>
    </div>
  );
};

export default ProductPage;
