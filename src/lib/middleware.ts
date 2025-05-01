// src/lib/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: "BUYER" | "SELLER";
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "dev_access_secret";

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: "BUYER" | "SELLER";
    };
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

// Enhanced middleware with public access support
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>,
  options: {
    allowedRoles?: ("BUYER" | "SELLER")[];
    allowPublic?: boolean;
  } = {}
) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    // If no token is provided
    if (!token) {
      // Allow public access if configured
      if (options.allowPublic) {
        return handler(req as AuthenticatedRequest);
      }
      return NextResponse.json(
        { error: "Please login to access this resource" },
        { status: 401 }
      );
    }

    const user = verifyAccessToken(token);

    if (!user) {
      // Allow public access if configured
      if (options.allowPublic) {
        return handler(req as AuthenticatedRequest);
      }
      return NextResponse.json(
        { error: "Your session has expired. Please login again" },
        { status: 401 }
      );
    }

    // Role-based access control (only if roles are specified)
    if (options.allowedRoles && !options.allowedRoles.includes(user.role)) {
      return NextResponse.json(
        {
          error:
            "Access denied. You don't have permission to access this resource",
          requiredRole: options.allowedRoles,
          currentRole: user.role,
        },
        { status: 403 }
      );
    }

    // Attach user info to request
    (req as AuthenticatedRequest).user = user;

    return handler(req as AuthenticatedRequest);
  };
}

// Helper middleware for seller-only routes
export function withSellerAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return withAuth(handler, { allowedRoles: ["SELLER"] });
}

// Helper middleware for buyer-only routes
export function withBuyerAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return withAuth(handler, { allowedRoles: ["BUYER"] });
}

// Helper middleware for any authenticated user
export function withAnyAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return withAuth(handler, { allowedRoles: ["BUYER", "SELLER"] });
}
