export async function checkWishlistStatus(
  accountId: string,
  productId: string,
  marketId: string
) {
  const res = await fetch(
    `/api/wishlist/check?accountId=${accountId}&productId=${productId}&marketId=${marketId}`
  );
  const data = await res.json();
  return data?.exists || false;
}

export async function toggleWishlist(
  accountId: string,
  productId: string,
  marketId: string
) {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({ accountId, productId, marketId }),
  });
  return res.json();
}
