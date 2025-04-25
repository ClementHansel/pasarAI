import { db } from "@/lib/db"; // Use db.$transaction as we use lib as a gateway to prisma
import { NextRequest, NextResponse } from "next/server";

//Move this part to schema and lib/auth
// Example prisma.schema
model Wallet {
    id      String  @id @default(uuid())
    balance Float
    // Add other needed fields here. Don't forget the relations.
    
}

model Transaction {
    id        String   @id @default(uuid())
    type      String
    amount    Float
    timestamp DateTime
    walletId  String
    wallet    Wallet   @relation(fields: [walletId], references: [id])
    // Add other needed fields here.
  }

  // npx prisma migrate dev and npx prisma generate after modifying schema.

// Example lib/auth for fetching id and balance to get wallet value
export async function getWalletIdAndBalance(req: NextRequest) {
  // Example: fetch user wallet by session (e.g. from token/cookie)
  const id = "example-wallet-id"; // Replace with real logic
  const balance = 1000; // Mock balance
  return { id, balance };
}
// End of the other file components

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    const amountNum = Number(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { error: "Invalid withdrawal amount." },
        { status: 400 }
      );
    }

    const { id } = await getWalletIdAndBalance(req);

    const updatedWallet = await db.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({ where: { id } });

      if (!wallet) throw new Error("Wallet not found.");
      if (wallet.balance < amountNum) throw new Error("Insufficient balance.");

      // Optional: Log transaction
      await tx.transaction.create({
        data: {
          walletId: id,
          type: "Withdraw",
          amount: amountNum,
          timestamp: new Date(),
        },
      });

      return await tx.wallet.update({
        where: { id },
        data: { balance: wallet.balance - amountNum },
      });
    });

    return NextResponse.json({
      message: `Successfully withdrew $${amountNum}`,
      newBalance: updatedWallet.balance,
    });
} catch (error: unknown) {
    console.error("Withdraw error:", error);
  
    let errorMsg = "Internal server error."; // We use Let because the variable value can be changed based on error type
    let status = 500;
  
    if (error instanceof Error) {
      if (error.message === "Insufficient balance." || error.message === "Wallet not found.") { // This conditional need Let
        errorMsg = error.message;
        status = 400;
      }
    }
  
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
