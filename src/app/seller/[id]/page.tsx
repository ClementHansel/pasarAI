// seller/public/[id]/page.tsx
"use client";

import { mockSellerProfile, toPublicSellerProfile } from "@/lib/data/profile";
import { SellerPublicView } from "@/components/seller/SellerPublicView";

const SellerPage = () => {
  // Convert to public profile format
  const publicProfile = toPublicSellerProfile(mockSellerProfile);
  return <SellerPublicView seller={publicProfile} />;
};

export default SellerPage;
