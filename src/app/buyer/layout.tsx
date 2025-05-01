"use client";

import { RouteGuard } from "@/components/auth/RouteGuard";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["BUYER"]}>
      {children}
    </RouteGuard>
  );
}