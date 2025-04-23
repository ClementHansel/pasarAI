// src/app/page.tsx
"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import HeroSection from "@/components/layout/homepage/HeroSection";
import FeaturedProducts from "@/components/layout/homepage/FeaturedProducts";
import TopUpAndBills from "@/components/layout/homepage/TopUpAndBills";
import SelectedCategorySection from "@/components/layout/homepage/SelectedCategorySection";
import RecentSearchProducts from "@/components/layout/homepage/RecentSearchProducts";
import ProductsSection from "@/components/layout/homepage/ProductsSection";
import CategoryButtons from "@/components/layout/homepage/CategoryButtons";

const HomePage = () => (
  <>
    <Toaster position="top-right" />
    <HeroSection />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 py-12">
      <FeaturedProducts />
      <TopUpAndBills />
      <SelectedCategorySection />
      <RecentSearchProducts />
      <ProductsSection />
      <CategoryButtons />
    </div>
  </>
);

export default HomePage;
