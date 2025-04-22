import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image"; // Importing Image component

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
      {/* Image Section */}
      <div className="relative w-full h-48">
        {product.imageUrls?.[0] ? (
          <Image
            src={product.imageUrls[0]} // Use the first image URL
            alt={product.name}
            width={500} // You can adjust the width
            height={300} // You can adjust the height
            className="w-full h-full object-cover rounded-lg"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>

      {/* Product Name and Category */}
      <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
      <p className="text-sm text-gray-500">
        {product.category?.name ?? "No category"}
      </p>

      {/* Additional Product Details */}
      <div className="mt-2 text-lg font-bold text-gray-900">
        {product.price ? `${product.price}` : "Price not available"}
      </div>

      {/* View Details Button */}
      <Link
        href={`/product/${product.id}`}
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
