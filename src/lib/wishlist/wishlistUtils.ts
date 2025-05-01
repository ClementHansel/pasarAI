// src/lib/wishlist/wishlistUtils.ts
const mockWishlist = new Set<string>();

export async function checkWishlistStatus(
  accountId: string,
  productId: string,
  marketId: string
) {
  return mockWishlist.has(`${productId}-${marketId}`);
}

export async function toggleWishlist(
  accountId: string,
  productId: string,
  marketId: string
) {
  const key = `${productId}-${marketId}`;
  if (mockWishlist.has(key)) {
    mockWishlist.delete(key);
    return { added: false, message: "Removed from wishlist" };
  }
  mockWishlist.add(key);
  return { added: true, message: "Added to wishlist" };
}
