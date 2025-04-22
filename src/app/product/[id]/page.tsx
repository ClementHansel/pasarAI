// src/app/products/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { domesticProducts, globalProducts } from "@/lib/data/products";
import Image from "next/image"; // Import the Image component

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch the product details based on the ID
  useEffect(() => {
    if (id) {
      // Convert id to a number
      const productId = typeof id === "string" ? parseInt(id, 10) : NaN;

      // Flatten both domestic and global products
      const allProducts = [
        ...domesticProducts.flatMap((region) =>
          region.subregions.flatMap((sub) =>
            sub.cities.flatMap((city) => city.products)
          )
        ),
        ...globalProducts.flatMap((region) =>
          region.subregions.flatMap((sub) =>
            sub.cities.flatMap((city) => city.products)
          )
        ),
      ];

      const selectedProduct = allProducts.find((p) => p.id === productId);
      setProduct(selectedProduct || null);
    }
  }, [id]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <Image
        src={product.imageUrls[0]} // Assuming product.imageUrls is an array
        alt={product.name}
        width={500} // Specify the image width
        height={500} // Specify the image height
        className="w-full h-72 object-cover mt-6"
        priority // Optional: Loads the image as high priority (good for product images)
      />
      <p className="text-lg mt-4">{product.description}</p>
      <p className="text-xl mt-4 font-bold">{product.price}</p>
    </div>
  );
};

export default ProductDetailPage;
