// src/app/wishlist/page.tsx
"use client";

import WishlistList from "@/components/wishlist/WishlistList";
import { RouteGuard } from "@/components/auth/RouteGuard";

// Mock session data for development
const useMockSession = () => ({
  data: {
    account: {
      id: "mock-account-123",
    },
  },
  status: "authenticated",
});

export default function WishlistPage() {
  return (
    <RouteGuard allowedRoles={["BUYER", "SELLER", "ADMIN"]}>
      <WishlistPageContent />
    </RouteGuard>
  );
}

function WishlistPageContent() {
  // Use mock session instead of real auth
  const { data: session, status } = useMockSession();

  if (status === "loading") {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Manage your favorite products from various markets
        </p>
      </div>
      <WishlistList accountId={session.account.id} />
    </main>
  );
}
