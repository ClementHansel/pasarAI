import { hashPassword, generateMagicLinkToken } from "@/lib/auth/authUtils";
import { generateReferralCode } from "@/lib/referral/referralUtils";
import { validateEmail, validatePassword } from "@/lib/validation/utils";
import { createReferralVouchers } from "@/lib/voucher/generateVoucherCode";
import {
  createAccount,
  getAccountByEmail,
  getAccountByReferralCode,
} from "@/services/account/accountService";
import { sendEmail } from "@/lib/mailer.server";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Register API received body:", body);

    const {
      name,
      email,
      password,
      role,
      referralCode: usedCode,
      phone,
      address,
      country,
      province,
      city,
      profileImage,
      currency,
    } = body;

    // Basic validations
    if (!name || !email || !password) {
      console.error("Missing required fields:", { name, email, password });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email and password
    if (!validateEmail(email)) {
      console.error("Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      console.error("Invalid password format");
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and include a special character",
        },
        { status: 400 }
      );
    }

    // Map role string to Prisma Role enum
    let accountRole: Role = Role.BUYER; // Default to BUYER
    if (role === "SELLER") {
      accountRole = Role.SELLER;
    } else {
      accountRole = Role.BUYER;
    }

    // Check if the account already exists
    const existingAccount = await getAccountByEmail(email);
    if (existingAccount) {
      // Return a clear error for the frontend
      return NextResponse.json(
        {
          error:
            "An account with this email already exists. Please log in or use a different email.",
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Generate a new referral code
    const newReferralCode = generateReferralCode();

    // Look up currency by name (since name is not unique, use findFirst)
    const currencyRecord = await db.currency.findFirst({
      where: { name: currency },
    });
    if (!currencyRecord) {
      return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
    }

    // Create a new account using service layer
    const newAccount = await createAccount({
      name,
      email,
      password: hashedPassword,
      role: accountRole,
      referralCode: newReferralCode,
      phone,
      address,
      country,
      province,
      city,
      profileImage,
      currencyId: currencyRecord.id, // <-- pass currencyId directly
    });

    // Handle referral if a code was provided
    if (usedCode) {
      const referrer = await getAccountByReferralCode(usedCode);

      if (referrer) {
        // Create referral entry and generate vouchers
        await createReferralVouchers(referrer.id, newAccount.id);
        await createReferralVouchers(referrer.id, newAccount.id);
      }
    }

    // --- MAGIC LINK EMAIL VERIFICATION ---
    if (!process.env.EMAIL_ACCOUNT || !process.env.EMAIL_PASS) {
      console.error(
        "Missing EMAIL_ACCOUNT or EMAIL_PASS environment variables"
      );
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }
    const token = generateMagicLinkToken(email);
    const verifyUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/auth/verify?token=${token}`;
    const subject = "Verify your email address";
    const text = `Welcome to PasarAI! Please verify your email by clicking the following link: ${verifyUrl}`;
    await sendEmail(subject, email, text);

    // Return successful response with minimal account info
    return NextResponse.json(
      {
        message:
          "Account registered successfully. Please check your email to verify your account.",
        account: {
          id: newAccount.id,
          email: newAccount.email,
          name: newAccount.name,
          role: newAccount.role,
          referralCode: newReferralCode,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Register Error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
