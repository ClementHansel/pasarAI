// src/lib/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: "user" | "seller"; // Specific role, either 'user' or 'seller'
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "dev_access_secret";

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: "user" | "seller"; // Support both roles
    };
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

// Middleware to protect API routes and differentiate between user and seller
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const user = verifyAccessToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Attach user info to the request object
    (req as AuthenticatedRequest).user = user;

    // You can now differentiate based on role if needed
    if (user.role === "user") {
      console.log("User is authenticated as a regular user");
    } else if (user.role === "seller") {
      console.log("User is authenticated as a seller");
    }

    // Call the handler with the authenticated request
    return handler(req as AuthenticatedRequest);
  };
}
