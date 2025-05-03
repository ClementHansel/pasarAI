export type DurationOption = "24h" | "1w" | "1m";

interface FeaturedPriceProps {
  price: number;
  duration: DurationOption;
}

/**
 * Calculates the advertising price for making a product featured
 */
export function calculateFeaturedPrice({
  price,
  duration,
}: FeaturedPriceProps): number {
  let percentage = 0;
  let max = 0;

  switch (duration) {
    case "24h":
      percentage = 0.001;
      max = 5000;
      break;
    case "1w":
      percentage = 0.005;
      max = 50000;
      break;
    case "1m":
      percentage = 0.01;
      max = 100000;
      break;
    default:
      return 0;
  }

  const fee = price * percentage;
  return Math.min(Math.round(fee), max);
}
