// src/components/product/ProductView.tsx
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductViewProps {
  products: Product[];
}

const ProductView = ({ products }: ProductViewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductView;
