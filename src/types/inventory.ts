export interface Market {
  id: string;
  name: string;
}

export interface Product {
  id: string; // Example property
  name: string;
  description?: string;
  price: string; // Ensure these match
  image: string;
  stock: string;
  soldCount: string;
  unit: string;
  tags: string;
  categoryId: string;
  ecoCertifications: string;
  origin: string;
  sku: string;
  isActive: boolean;
  accountId: string;
  marketId: string;
  label: string;
  discount: string;
  featured: boolean;
  createdAt: string;
  market: string;
}
