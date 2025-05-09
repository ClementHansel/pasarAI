// src/app/page.tsx
"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import AiAssistPromo from "@/components/layout/homepage/AiAssistPromo";
import HeroSection from "@/components/layout/homepage/HeroSection";
import { ProductFilterProvider } from "@/context/ProductCategoryContext";
import FinanceCenter from "@/components/layout/homepage/FinanceCenter";
import ProductsExplorer from "@/components/layout/homepage/ProductsExplorer";
import MarketsExplorer from "@/components/layout/homepage/MarketsExplorer";

export default function HomePage() {
  return (
    <>
      <Toaster position="top-right" />
      <main className="flex flex-col items-center bg-gray-50 min-h-screen">
        {/* AI Assistant Promo Banner */}
        <div className="w-full bg-white shadow-md">
          <AiAssistPromo />
        </div>

        {/* Hero Section */}
        <section className="w-full">
          <HeroSection />
        </section>

        {/* Main Content Container */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
          {/* Finance Center (Top-Up, Bills, Redeem) */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <FinanceCenter />
          </div>

          {/* Products Explorer - Wrapped in ProductFilterProvider */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Explore Products
            </h2>
            <ProductFilterProvider>
              <ProductsExplorer />
            </ProductFilterProvider>
          </div>

          {/* Markets Explorer */}
          <div>
            <MarketsExplorer />
          </div>
        </section>
      </main>
    </>
  );
}
