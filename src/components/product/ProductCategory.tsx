"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductType, ProductRegion, Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { domesticProducts, globalProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

interface ProductCategoryProps {
  type: ProductType;
  products: Product[];
  searchTerm?: string;
  categoryFilter?: string;
  viewMode?: "grid" | "list";
  selectedFilters?: {
    region?: string;
    subregion?: string;
    city?: string;
  };
  onCategoryChange?: (category: string) => void;
}

const ProductCategory = ({
  type,
  products,
  searchTerm,
  categoryFilter,
  viewMode = "grid",
  selectedFilters = {},
}: ProductCategoryProps) => {
  const [filteredRegions, setFilteredRegions] = useState<ProductRegion[]>([]);

  // Filter products based on the selected filters (region, subregion, city)
  useEffect(() => {
    const marketData = type === "domestic" ? domesticProducts : globalProducts;

    const filtered = marketData
      .filter((region) => {
        if (selectedFilters.region && region.name !== selectedFilters.region)
          return false;

        return true;
      })
      .map((region) => ({
        ...region,
        subregions: region.subregions
          .filter((sub) => {
            if (
              selectedFilters.subregion &&
              sub.name !== selectedFilters.subregion
            )
              return false;

            return true;
          })
          .map((sub) => ({
            ...sub,
            cities: sub.cities.filter((city) => {
              if (selectedFilters.city && city.name !== selectedFilters.city)
                return false;

              return true;
            }),
          })),
      }));

    setFilteredRegions(filtered);
  }, [type, selectedFilters]);

  // Extract and filter the products from filtered regions
  const allProducts = useMemo(() => {
    return filteredRegions.flatMap((region) =>
      region.subregions.flatMap((sub) =>
        sub.cities.flatMap((city) =>
          city.products.filter((product) => {
            // Filter by search term
            const matchesSearch = product.name
              .toLowerCase()
              .includes(searchTerm?.toLowerCase() || "");
            // Filter by category if a category is selected
            const matchesCategory =
              !categoryFilter || product.category?.name === categoryFilter;
            return matchesSearch && matchesCategory;
          })
        )
      )
    );
  }, [filteredRegions, searchTerm, categoryFilter]);

  // Add products that are directly passed through props if selectedFilters are empty
  const filteredProducts = useMemo(() => {
    if (Object.keys(selectedFilters).length === 0) {
      return products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "");
        const matchesCategory =
          !categoryFilter || product.category?.name === categoryFilter;
        return matchesSearch && matchesCategory;
      });
    }
    return allProducts;
  }, [selectedFilters, products, searchTerm, categoryFilter, allProducts]);

  return (
    <div className="space-y-6">
      {filteredProducts.length === 0 ? (
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
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
