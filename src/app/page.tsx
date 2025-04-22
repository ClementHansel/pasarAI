"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import HeroSection from "@/components/layout/homepage/HeroSection";
import BentoGrid from "@/components/layout/homepage/BentoGrid";
import FeaturedProducts from "@/components/layout/homepage/FeaturedProducts";
import TopUpAndBills from "@/components/layout/homepage/TopUpAndBills";
import SelectedCategorySection from "@/components/layout/homepage/SelectedCategorySection";
import RecentSearchProducts from "@/components/layout/homepage/RecentSearchProducts";
import ProductsSection from "@/components/layout/homepage/ProductsSection";
import CategoryButtons from "@/components/layout/homepage/CategoryButtons";

import { Product } from "@/types/product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const productsData = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 py-12">
        <BentoGrid />
        <FeaturedProducts />
        <TopUpAndBills />
        <SelectedCategorySection />
        <RecentSearchProducts />
        <ProductsSection products={products} loading={loading} />
        <CategoryButtons />
      </div>
    </>
  );
};

export default HomePage;
