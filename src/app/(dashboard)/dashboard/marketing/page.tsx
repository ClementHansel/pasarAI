// src/app/(dashboard)/dashboard/marketing/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProductList from "@/components/dashboard/marketing/ProductList";
import MarketingModal from "@/components/dashboard/marketing/MarketingModal";
import { Product } from "@/types/product";
import {
  fetchProducts,
  updateProductPromotion,
} from "@/lib/dashboard/marketing/marketing";

export default function MarketingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); // Fallback to empty state
      }
    };
    getProducts();
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handlePromotionUpdate = async (promotionData: {
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
    duration?: number;
    price?: number;
  }) => {
    if (!selectedProduct) return;

    try {
      const updatedProduct = await updateProductPromotion(
        selectedProduct.id,
        promotionData
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      closeModal();
    } catch (error) {
      console.error("Failed to update promotion:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Marketing Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Set promotions and marketing features for your products
        </p>
      </div>

      <ProductList products={products} openModal={openModal} />

      {selectedProduct && (
        <MarketingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          onPromotionUpdate={handlePromotionUpdate}
        />
      )}
    </div>
  );
}
