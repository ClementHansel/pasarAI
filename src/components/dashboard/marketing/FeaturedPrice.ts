// src/components/dashboard/marketing/FeaturedPrice.ts

export interface FeaturedPriceProps {
  price: number;
  duration: number;
}

/**
 * Calculates the advertising price for making a product featured
 */
export function calculateFeaturedPrice({
  price,
  duration,
}: FeaturedPriceProps): number {
  const config: Record<number, { percent: number; max: number }> = {
    24: { percent: 0.001, max: 5000 },
    168: { percent: 0.005, max: 50000 },
    720: { percent: 0.01, max: 100000 },
  };

  const { percent, max } = config[duration] || { percent: 0, max: 0 };
  const fee = price * percent;
  return Math.min(Math.round(fee), max);
}
