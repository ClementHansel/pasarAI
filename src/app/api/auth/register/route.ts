import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth/authUtils";
import { generateReferralCode } from "@/lib/referral/referralUtils";
import { createReferralVouchers } from "@/lib/voucher/generateVoucherCode";
import { validateEmail, validatePassword } from "@/lib/validation/utils";

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

    // Basic validations
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email and password
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and include a special character",
        },
        { status: 400 }
      );
    }

    // Determine the account role with fallback
    const accountRole =
      role && (role === "SELLER" || role === "ACCOUNT") ? role : "ACCOUNT";

    // Check if the account already exists
    const existingAccount = await prisma.account.findUnique({
      where: { email },
    });
    if (existingAccount) {
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Generate a new referral code
    const newReferralCode = generateReferralCode();

    // Create a new account in a transaction to ensure atomicity
    const newAccount = await prisma.$transaction(async (prisma) => {
      // Create account first
      const account = await prisma.account.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: accountRole,
          referralCode: newReferralCode,
        },
      });

      // Handle referral if a code was provided
      if (usedCode) {
        const referrer = await prisma.account.findUnique({
          where: { referralCode: usedCode },
        });

        if (referrer) {
          // Create referral entry
          await prisma.referral.create({
            data: {
              referrerId: referrer.id,
              referredId: account.id,
            },
          });

          // Generate referral vouchers for both referrer and referred
          await createReferralVouchers(referrer.id, account.id);
        }
      }

      return account;
    });

    // Return successful response with minimal account info
    return NextResponse.json({
      message: "Account registered successfully",
      account: {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        role: newAccount.role,
        referralCode: newReferralCode,
      },
    });
  } catch (error: unknown) {
    console.error("Register Error:", error);

    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    }

    // Fallback if the error is not an instance of Error
    return NextResponse.json(
      { error: "Internal server error", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
