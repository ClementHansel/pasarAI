// src/app/wishlist/page.tsx
"use client";

import WishlistList from "@/components/wishlist/WishlistList";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

export default function WishlistPage() {
  //   const { data: session, status } = useSession();

  //   if (status === "loading") {
  //     return <div className="text-center py-10">Loading your wishlist...</div>;
  //   }

  //   if (!session?.account?.id) {
  //     // Redirect to login if not authenticated
  //     redirect("/auth/login");
  //   }

  // Temporary mock until session is fully set up
  const mockAccountId = "demo-account-id-123";

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <WishlistList
        accountId={
          mockAccountId
          // session.account.id
        }
      />
    </main>
  );
}
