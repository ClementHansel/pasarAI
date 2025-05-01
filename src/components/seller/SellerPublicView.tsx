// src/components/seller/SellerPublicView.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { SellerHeader } from "./SellerHeader";
import { MarketInfo } from "./MarketInfo";
import { PublicSellerProfile } from "@/lib/data/profile";
import { ProductsTab } from "./ProductTabs";
import { ReviewsTab } from "./ReviewsTab";
import { ContactTab } from "./ContactTab";

export const SellerPublicView = ({
  seller,
}: {
  seller: PublicSellerProfile;
}) => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SellerHeader seller={seller} />
      <MarketInfo seller={seller} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white rounded-lg p-1 shadow-md mb-6">
          <TabsTrigger value="products">
            Products ({seller.products.length})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({seller.reviews.length})
          </TabsTrigger>
          <TabsTrigger value="contact">Contact & Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTab products={seller.products} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab
            reviews={seller.reviews}
            rating={seller.rating}
            products={seller.products}
          />
        </TabsContent>

        <TabsContent value="contact">
          <ContactTab seller={seller} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
