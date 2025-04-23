// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth/authUtils";
import { generateReferralCode } from "@/lib/referral/referralUtils";
import { createReferralVouchers } from "@/lib/voucher/generateVoucherCode";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      role,
      referralCode: usedCode,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accountRole =
      role && (role === "SELLER" || role === "account") ? role : "account";

    const existingAccount = await prisma.account.findUnique({
      where: { email },
    });
    if (existingAccount) {
      return NextResponse.json(
        { error: "account already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newReferralCode = generateReferralCode();

    const newAccount = await prisma.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: accountRole,
        referralCode: newReferralCode,
      },
    });

    // Handle referral logic
    if (usedCode) {
      const referrer = await prisma.account.findUnique({
        where: { referralCode: usedCode },
      });

      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: newAccount.id,
          },
        });

        // Trigger referral voucher for both
        await createReferralVouchers(referrer.id, newAccount.id);
      }
    }

    return NextResponse.json({
      message: "account registered successfully",
      account: {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        role: newAccount.role,
        referralCode: newReferralCode,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
