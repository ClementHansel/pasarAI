// seller/public/[id]/page.tsx
"use client";

import SellerPublicProfile from "@/components/seller/SellerPublicView";
import { mockSellerProfile, toPublicSellerProfile } from "@/lib/data/profile";

const SellerPage = ({ params }: { params: { id: string } }) => {
  // Convert to public profile format
  const publicProfile = toPublicSellerProfile(mockSellerProfile);
  return <SellerPublicProfile seller={publicProfile} id={params.id} />;
};

export default SellerPage;
