"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requireVerification?: boolean;
}

export function AuthGuard({
  children,
  allowedRoles,
  requireVerification = true,
}: AuthGuardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let hasRedirected = false;

    const safeRedirect = (path: string, message?: string) => {
      if (hasRedirected) return;
      hasRedirected = true;

      if (message) toast.error(message);
      router.push(path);
    };

    const verifySession = async () => {
      if (status === "loading") return;

      if (!session || !session.user) {
        safeRedirect(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`,
          "Please log in"
        );
        return;
      }

      const user = session.user as typeof session.user & {
        role?: Role;
        isVerified?: boolean;
      };

      if (requireVerification && !user.isVerified) {
        safeRedirect("/verify-account", "Please verify your email");
        return;
      }

      if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
        safeRedirect("/unauthorized", "Unauthorized access");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-session");
        if (!res.ok) throw new Error("Session verification failed");

        const { valid } = await res.json();
        if (!valid) throw new Error("Invalid session");

        setIsAuthorized(true);
      } catch (err) {
        console.error("Session verification failed:", err);
        safeRedirect(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`,
          "Session expired"
        );
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [status, session, allowedRoles, requireVerification, router]);

  if (status === "loading" || isVerifying || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return <>{children}</>;
}
