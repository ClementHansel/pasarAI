// src/components/AuthGuard.tsx (updated)
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
  
  useEffect(() => {
    async function verify() {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        redirectToLogin();
        return;
      }

      if (!session?.user) {
        toast.error("Invalid session");
        redirectToLogin();
        return;
      }

      if (requireVerification && !session.user.isVerified) {
        toast.error("Please verify your email");
        router.push("/verify-account");
        return;
      }

      if (allowedRoles && !allowedRoles.includes(session.user.role)) {
        toast.error("Unauthorized access");
        router.push("/unauthorized");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-session");
        if (!res.ok) throw new Error("Session verification failed");
        
        const { valid } = await res.json();
        if (!valid) throw new Error("Invalid session");

        setIsAuthorized(true);
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Session expired");
        redirectToLogin();
      }
    }

    verify();
  }, [status, session, allowedRoles, requireVerification, router]);

  function redirectToLogin() {
    router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
  }

  if (status === "loading" || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return <>{children}</>;
}