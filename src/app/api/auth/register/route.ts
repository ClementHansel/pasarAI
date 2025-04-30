import { Role } from "@prisma/client"; // Import the Role enum
import { hashPassword } from "@/lib/auth/authUtils";
import { generateReferralCode } from "@/lib/referral/referralUtils";
import { validateEmail, validatePassword } from "@/lib/validation/utils";
import { createReferralVouchers } from "@/lib/voucher/generateVoucherCode";
import {
  createAccount,
  getAccountByEmail,
  getAccountByReferralCode,
} from "@/services/account/accountService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
      currencyId,
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

    // Adjusted to use "BUYER" instead of "CONSUMER" in the role mapping.
    let accountRole: Role = Role.BUYER; // Default to BUYER
    if (role === "SELLER") {
      accountRole = Role.SELLER;
    } else {
      accountRole = Role.BUYER; // Default to BUYER for all other cases
    }

    // Check if the account already exists
    const existingAccount = await getAccountByEmail(email);
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
      currencyId,
    });

    // Handle referral if a code was provided
    if (usedCode) {
      const referrer = await getAccountByReferralCode(usedCode);

      if (referrer) {
        // Create referral entry
        await createReferralVouchers(referrer.id, newAccount.id);

        // Generate referral vouchers for both referrer and referred
        await createReferralVouchers(referrer.id, newAccount.id);
      }
    }

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
