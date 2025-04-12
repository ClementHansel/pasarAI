import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating?: number; // Optional rating
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  rating = 0,
}) => {
  const router = useRouter();
  const { addToCart } = useCart(); // Cart context to manage cart state
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Navigate to product detail page
  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  // Handle adding the product to the cart
  const handleAddToCart = async () => {
    setIsAdding(true); // Set loading state while adding to cart
    try {
      // Add product to cart (this is where you could call an API in a real application)
      addToCart({ id, name, price, quantity: 1 });

      // You can show a success message or trigger a modal to show the cart
      alert(`${name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("Failed to add to cart.");
    } finally {
      setIsAdding(false); // Reset loading state
    }
  };

  // Handle image loading for lazy loading
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Lazy-loaded image */}
      <div className="relative w-full h-64">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
            <span>Loading...</span>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          onLoadingComplete={handleImageLoad}
          loading="lazy" // Lazy loading enabled
        />
      </div>
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex items-center mt-2">
        <span className="text-lg font-bold">${price.toFixed(2)}</span>
        <div className="ml-2 text-yellow-500">
          {/* Display rating stars */}
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>{index < rating ? "★" : "☆"}</span>
          ))}
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the handleClick when adding to cart
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
