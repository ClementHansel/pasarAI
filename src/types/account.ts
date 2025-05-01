// src/types/product.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  originalPrice: number;
  stock: number;
  category: string;
  images: string[];
  sellerId: string;
  // ... any additional fields
};

// src/types/review.ts
export type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId?: string;
  createdAt?: string;
};

// src/types/account.ts
export type Account = {
  id: string;
  name: string;
  email: string;
  role: "SELLER" | "BUYER";
};

export type ProductType = "SELLER" | "BUYER" | "ADMIN";

export interface ProductSectionProps {
  type: ProductType;
}
