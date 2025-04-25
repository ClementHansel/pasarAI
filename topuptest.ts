import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET (req: NextRequest) {
    const accountId = req.nextUrl.searchParams.get("accountId");
    const { amount } = await req.json();
    if (amount <= 0) {
        return NextResponse.json({ error: "Top-up amount must be greater than zero." }, { status: 400 });
    }
    if (!accountId) {
        return NextResponse.json({ error: "Account ID is required" }, { status: 400 });
    }
    try {
      const wallet = await db.wallet.findUnique({
        where: { accountId: accountId },
        select: { balance: true },
        data: { balance: wallet.balance + amount },
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }
      setBalance(wallet.balance);
      setTransactionHistory([
        ...transactionHistory,
        {
          type: "Top Up",
          amount,
          date: new Date().toLocaleString(),
        },
      ]);
      alert(`Wallet topped up with $${amount}`);
      setTopUpAmount(0); // Reset the top-up amount after submission
      setError(""); // Clear error after successful top-up
    } catch (error) {
      console.error("Error topping up wallet:", error);
      setError("Failed to top up wallet. Please try again later.");
    }
  };

// Withdraw function
  export async function GET (req: NextRequest) {
    const { amount } = await req.json();
    if (amount <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }
    try {
      if (balance >= amount) {
        const updatedWallet = await prisma.wallet.update({
          where: { id },
          data: { balance: balance - amount },
        });
        setBalance(updatedWallet.balance);
        setTransactionHistory([
          ...transactionHistory,
          {
            type: "Withdraw",
            amount,
            date: new Date().toLocaleString(),
          },
        ]);
        alert(`Successfully withdrew $${amount}`);
        setWithdrawAmount(0); // Reset withdrawal amount after success
        setError(""); // Clear error after successful withdrawal
      } else {
        setError("Insufficient balance for withdrawal.");
      }
    } catch (error) {
      console.error("Error withdrawing from wallet:", error);
      setError("Failed to withdraw from wallet. Please try again later.");
    }
  }
  