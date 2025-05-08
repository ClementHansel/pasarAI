// src/middleware.ts (updated)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { db } from "./src/lib/db/db";

const PUBLIC_PATHS = [
  "/",
  "/market",
  "/product",
  "/product/:path*",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-account",
];

const ADMIN_PATHS = ["/admin/:path*"];
const SELLER_PATHS = ["/seller/:path*", "/products/create", "/products/edit"];
const AUTH_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;

  // Check public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Validate session
  if (!sessionToken) {
    return redirectToLogin(req, pathname);
  }

  try {
    const dbSession = await db.session.findUnique({
      where: { sessionToken },
      include: { account: true },
    });

    if (!dbSession || new Date(dbSession.expires) < new Date()) {
      return redirectToLogin(req, pathname);
    }

    const { account } = dbSession;
    if (!account.isVerified && pathname !== "/verify-account") {
      return NextResponse.redirect(new URL("/verify-account", req.url));
    }

    // Role-based path checks
    if (isAdminPath(pathname) && account.role !== Role.ADMIN) {
      return redirectToUnauthorized(req);
    }

    if (isSellerPath(pathname) && !isSellerAuthorized(account.role)) {
      return redirectToUnauthorized(req);
    }

    // Redirect authenticated users from auth pages
    if (AUTH_PATHS.some(p => pathname.startsWith(p))) {
      return redirectToDashboard(account.role, req);
    }

    // Track session activity
    await trackSessionActivity(req, dbSession);

    // Add user headers
    const headers = new Headers(req.headers);
    headers.set("x-user-id", account.id);
    headers.set("x-user-role", account.role);

    return NextResponse.next({ request: { headers } });
  } catch (error) {
    console.error("Middleware error:", error);
    return redirectToLogin(req, pathname);
  }
}

// Helper functions
function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(p => 
    pathname === p || pathname.startsWith(p.replace(":path*", ""))
  );
}

function isAdminPath(pathname: string) {
  return ADMIN_PATHS.some(p => pathname.startsWith(p.replace(":path*", "")));
}

function isSellerPath(pathname: string) {
  return SELLER_PATHS.some(p => pathname.startsWith(p.replace(":path*", "")));
}

function isSellerAuthorized(role: Role) {
  return [Role.SELLER, Role.ADMIN].includes(role);
}

async function trackSessionActivity(req: NextRequest, session: any) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0];
  await db.sessionActivity.create({
    data: {
      accountId: session.accountId,
      activity: `PAGE_VISIT:${req.nextUrl.pathname}`,
      ipAddress: ip || "unknown",
      userAgent: req.headers.get("user-agent") || undefined,
    },
  });
}

function redirectToLogin(req: NextRequest, pathname: string) {
  const url = new URL("/login", req.url);
  url.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(url);
}

function redirectToUnauthorized(req: NextRequest) {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

function redirectToDashboard(role: Role, req: NextRequest) {
  const dashboardPaths = {
    [Role.ADMIN]: "/admin/dashboard",
    [Role.SELLER]: "/seller/dashboard",
    [Role.BUYER]: "/dashboard",
  };
  return NextResponse.redirect(new URL(dashboardPaths[role] || "/dashboard", req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};