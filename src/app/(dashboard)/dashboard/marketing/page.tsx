"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductList from "@/components/dashboard/marketing/ProductList";
import MarketingModal from "@/components/dashboard/marketing/MarketingModal";
import { PromotionData } from "@/types/marketing";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Role } from "@prisma/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function MarketingPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.user?.id) return;

      try {
        // Updated to use sellerId as query parameter
        const res = await fetch(`/api/marketing?accountId=${session.user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Error fetching products");
        console.error(err);
      }
    };

    fetchProducts();
  }, [session]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handlePromotionUpdate = async (promotionData: PromotionData) => {
    if (!selectedProduct) return;

    try {
      // Updated PUT request to follow the correct endpoint and include sellerId
      const res = await fetch(`/api/marketing?accountId=${session?.user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedProduct.id, ...promotionData }),
      });

      if (!res.ok) {
        toast.error("Failed to update promotion");
        return;
      }

      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      toast.success("Promotion updated");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <AuthGuard allowedRoles={[Role.SELLER]}>
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
    </AuthGuard>
  );
}
