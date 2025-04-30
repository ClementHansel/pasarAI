export async function fetchWallet(accountId: string) {
  const res = await fetch(`/api/wallet?accountId=${accountId}`);
  return res.json();
}

export async function createTransaction(
  accountId: string,
  amount: number,
  type: string
) {
  const res = await fetch("/api/wallet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, amount, type }),
  });
  return res.json();
}
