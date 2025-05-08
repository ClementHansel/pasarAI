// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/authUtils";
import { generateReferralCode } from "@/lib/referral/referralUtils";
import { validateEmail, validatePassword } from "@/lib/validation/utils";
import { createReferralVouchers } from "@/lib/voucher/generateVoucherCode";
import {
  createAccount,
  getAccountByEmail,
  getAccountByReferralCode,
} from "@/services/account/accountService";
import { generateMagicLinkToken } from "@/lib/auth/authUtils";
import { sendEmail } from "@/lib/mailer.server";
import { Role } from "@prisma/client";
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
      currencyCode, // New field
    } = body;

    // 1) Required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing name, email, or password" },
        { status: 400 }
      );
    }

    // 2) Format checks
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

    // 3) Already exists?
    if (await getAccountByEmail(email)) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists. Please log in or use a different email.",
        },
        { status: 409 }
      );
    }

    // 4) Hash & referral code
    const hashed = await hashPassword(password);
    const newReferralCode = generateReferralCode();

    // 5) Currency validation
    let currencyId: string | undefined;
    if (currencyCode) {
      const currency = await db.currency.findFirst({
        where: { code: currencyCode },
      });

      if (!currency) {
        return NextResponse.json(
          { error: `Currency code "${currencyCode}" not found` },
          { status: 400 }
        );
      }

      currencyId = currency.id;
    }

    // 6) Create unverified account
    const newAccount = await createAccount({
      name,
      email,
      password: hashed,
      role: role === "SELLER" ? Role.SELLER : Role.BUYER,
      referralCode: newReferralCode,
      phone,
      address,
      country,
      province,
      city,
      profileImage,
      currencyId, // <-- Added here
    });

    // 7) Referral vouchers
    if (usedCode) {
      const referrer = await getAccountByReferralCode(usedCode);
      if (referrer) {
        await createReferralVouchers(referrer.id, newAccount.id);
      }
    }

    // 8) Safety check for email
    if (!newAccount.email) {
      throw new Error("New account created without an email address");
    }

    // 9) Generate verification token (after email check)
    const token = generateMagicLinkToken(newAccount.email);
    if (!token) {
      throw new Error("Failed to generate verification token");
    }

    // 10) Ensure NEXT_PUBLIC_SITE_URL is set
    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!rawBaseUrl) {
      throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
    }
    const baseUrl = rawBaseUrl.replace(/\/$/, "");
    const verifyUrl = `${baseUrl}/verify-account?token=${encodeURIComponent(
      token
    )}`;

    // 11) Send verification email
    console.log("Sending verification email to:", newAccount.email);
    await sendEmail(
      "Verify your new PasarAI account", // subject
      newAccount.email, // to
      `Welcome ${newAccount.name}! Please verify your account by clicking: ${verifyUrl}`,
      `<p>Welcome <strong>${newAccount.name}</strong>!</p>
       <p>Click <a href="${verifyUrl}">here</a> to verify your email address and complete registration.</p>`
    );

    // 12) Respond success
    return NextResponse.json(
      {
        message:
          "Account created! Check your email for a verification link before logging in.",
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
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
