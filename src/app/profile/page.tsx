// src/app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

import ProductView from "@/components/product/ProductView";
import SellerReview from "@/components/review/SellerReview";
import { Account } from "@/types/account";
import { Product } from "@/types/product";
import { Review } from "@/types/review";

async function getAccountData(): Promise<Account | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/account/me`,
    {
      cache: "no-cache",
      credentials: "include",
    }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getSellerData(id: string): Promise<{
  products: Product[];
  reviews: Review[];
}> {
  const [productsRes, reviewsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products?sellerId=${id}`),
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews/seller?sellerId=${id}`
    ),
  ]);
  const products = await productsRes.json();
  const reviews = await reviewsRes.json();
  return { products, reviews };
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const account = await getAccountData();

  if (!account) {
    notFound();
  }

  const isSeller = account.role.toUpperCase() === "SELLER";

  let products: Product[] = [];
  let reviews: Review[] = [];

  if (isSeller) {
    const sellerData = await getSellerData(account.id);
    products = sellerData.products;
    reviews = sellerData.reviews;
  }

  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      {/* Section 1: Account Info */}
      <div className="bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold text-gray-800">{account.name}</h1>
        <p className="text-sm text-gray-500">
          Logged in as a {account.role.toLowerCase()}
        </p>
      </div>

      {/* Section 2: Products (Seller Only) */}
      {isSeller && (
        <div className="bg-white shadow p-6 rounded space-y-4">
          <h2 className="text-xl font-semibold">Your Products</h2>
          {products?.length > 0 ? (
            <ProductView products={products} viewMode="grid" />
          ) : (
            <p className="text-gray-500">
              You have not added any products yet.
            </p>
          )}
        </div>
      )}

      {/* Section 3: Reviews (Seller Only) */}
      {isSeller && (
        <div className="bg-white shadow p-6 rounded space-y-4">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          {reviews?.length > 0 ? (
            <SellerReview
              sellerId={account.id}
              reviews={reviews}
              currentUserId={account.id}
              currentUserRole={account.role}
            />
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
