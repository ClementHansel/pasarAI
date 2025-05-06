// src/app/profile/seller/page.tsx
"use client";

import React from "react";
import { SellerProfileView } from "@/components/seller/SellerProfileView";
import { mockSellerProfile } from "@/lib/data/profile";
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function SellerProfilePage() {
  return (
    <RouteGuard allowedRoles={["BUYER", "SELLER", "ADMIN"]}>
      <SellerProfileView profile={mockSellerProfile} />
    </RouteGuard>
  );
}
