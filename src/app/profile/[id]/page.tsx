// src/app/profile/[id]/page.tsx
import { notFound } from "next/navigation";
import Head from "next/head";

import ProductView from "@/components/product/ProductView";
import SellerReview from "@/components/review/SellerReview";
import { Account } from "@/types/account";
import { Product } from "@/types/product";
import { Review } from "@/types/review";

interface ProfilePageProps {
  params: { id: string };
}

async function getAccountData(id: string): Promise<Account | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/public/account/${id}`,
    {
      cache: "no-cache",
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

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const sellerId = params.id;

  const account = await getAccountData(sellerId);
  if (!account || account.role.toUpperCase() !== "SELLER") {
    notFound();
  }

  const { products, reviews } = await getSellerData(sellerId);

  return (
    <>
      <Head>
        <title>{account.name} - Store Profile</title>
        <meta
          name="description"
          content={`Discover products and reviews from ${account.name}`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${account.name}'s Store`} />
        <meta
          property="og:description"
          content={`View the storefront and reviews for ${account.name}`}
        />
      </Head>

      <div className="p-4 space-y-4 max-w-6xl mx-auto">
        {/* Section 1: Public Account Info */}
        <div className="bg-white shadow p-6 rounded">
          <h1 className="text-2xl font-bold text-gray-800">{account.name}</h1>
          <p className="text-sm text-gray-500">
            Verified {account.role.toLowerCase()}
          </p>
        </div>

        {/* Section 2: Products */}
        <div className="bg-white shadow p-6 rounded space-y-4">
          <h2 className="text-xl font-semibold">Products</h2>
          {products?.length > 0 ? (
            <ProductView products={products} viewMode="grid" />
          ) : (
            <p className="text-gray-500">This seller has no products yet.</p>
          )}
        </div>

        {/* Section 3: Reviews */}
        <div className="bg-white shadow p-6 rounded space-y-4">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          {reviews?.length > 0 ? (
            <SellerReview
              sellerId={sellerId}
              reviews={reviews}
              currentUserId=""
              currentUserRole="BUYER"
            />
          ) : (
            <p className="text-gray-500">No reviews for this seller yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
