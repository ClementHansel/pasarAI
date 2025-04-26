// // src/app/seller/[id].tsx
// "use client";

// import { useRouter } from "next/router";

// const SellerPage = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get seller ID from the URL

//   // Fetch the seller details based on the `id`
//   // For now, use a mock or static data for seller info
//   // Update after seed is made and migrated to db

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-3xl font-semibold">Seller: {id}</h1>
//       {/* Render seller details here, fetch data based on `id` */}
//     </div>
//   );
// };

// export default SellerPage;
// src/app/seller/[id]/page.tsx
// src/app/seller/[id]/page.tsx
// src/app/seller/[id]/page.tsx
import SellerPublicProfile from "@/components/profile/SellerPublicView";
import { mockSellerProfile, toPublicSellerProfile } from "@/lib/data/profile";

const SellerPage = ({ params }: { params: { id: string } }) => {
  // Convert to public profile format
  const publicProfile = toPublicSellerProfile(mockSellerProfile);
  return <SellerPublicProfile seller={publicProfile} id={params.id} />;
};

export default SellerPage;
