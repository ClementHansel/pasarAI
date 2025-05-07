// src/app/(dashboard)/dashboard/marketing/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductList from "@/components/dashboard/marketing/ProductList";
import MarketingModal from "@/components/dashboard/marketing/MarketingModal";
import {
  fetchProducts,
  updateProductPromotion,
} from "@/lib/dashboard/marketing/marketing";
import { PromotionData } from "@/types/marketing";

export default function MarketingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
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

  const handlePromotionUpdate = async (promotionData: PromotionData) => {
    if (selectedProduct) {
      const updatedProduct = await updateProductPromotion(
        selectedProduct.id,
        promotionData
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      closeModal();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Marketing Dashboard</h1>
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
