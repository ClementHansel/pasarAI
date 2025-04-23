export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // "XJ9A2P"
}
