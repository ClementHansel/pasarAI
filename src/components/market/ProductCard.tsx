"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating?: number;
  labels?: { name: string; id: string };
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  rating = 0,
  labels = { name: "No Label", id: "" },
}) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          price,
          quantity: 1,
          labels,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      toast.success(`${name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart", error);
      toast.error("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full h-64">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
            <span>Loading...</span>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex items-center mt-2">
        <span className="text-lg font-bold">${price.toFixed(2)}</span>
        <div className="ml-2 text-yellow-500">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>{index < rating ? "★" : "☆"}</span>
          ))}
        </div>
        <div className="text-sm mt-2">
          {labels.name} {/* Display label name */}
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
