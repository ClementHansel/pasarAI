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
      currencyCode,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing name, email, or password" },
        { status: 400 }
      );
    }
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
    if (await getAccountByEmail(email)) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists. Please log in or use a different email.",
        },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);
    const newReferralCode = generateReferralCode();

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
      currencyId,
    });

    if (usedCode) {
      const referrer = await getAccountByReferralCode(usedCode);
      if (referrer) {
        await createReferralVouchers(referrer.id, newAccount.id);
      }
    }

    if (!newAccount.email) {
      throw new Error("New account created without an email address");
    }

    const token = generateMagicLinkToken(newAccount.email);
    if (!token) {
      throw new Error("Failed to generate verification token");
    }
    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!rawBaseUrl) throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
    const baseUrl = rawBaseUrl.replace(/\/$/, "");
    // ▶️ NEW API ROUTE PATH:
    const verifyUrl = `${baseUrl}/api/auth/verify-account?token=${encodeURIComponent(
      token
    )}`;

    await sendEmail(
      "Verify your new PasarAI account",
      newAccount.email,
      `Welcome ${newAccount.name}! Please verify your account by clicking: ${verifyUrl}`,
      `<p>Welcome <strong>${newAccount.name}</strong>!</p>
       <p>Click <a href="${verifyUrl}">here</a> to verify your email address and complete registration.</p>`
    );

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
