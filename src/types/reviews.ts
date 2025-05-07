// types/review.ts
export interface Review {
  id: string;
  buyerName: string;
  rating: number;
  comment: string;
  date: Date;
  productId?: string;
  sellerResponse?: string;
}
