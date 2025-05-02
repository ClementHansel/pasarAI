"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ("BUYER" | "SELLER")[];
  allowPublic?: boolean;
}

export function AuthGuard({
  children,
  allowedRoles,
  allowPublic = false,
}: AuthGuardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (allowPublic) {
      setIsAuthorized(true);
      return;
    }

    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/login");
      return;
    }

    if (
      !allowedRoles ||
      allowedRoles.includes(session.user.role as "BUYER" | "SELLER")
    ) {
      setIsAuthorized(true);
      // Redirect to /market if on /login after successful login
      if (
        typeof window !== "undefined" &&
        window.location.pathname === "/login"
      ) {
        router.push("/market");
      }
    } else {
      // Redirect based on role
      if (session.user.role === "SELLER") {
        router.push("/seller/dashboard");
      } else {
        router.push("/market");
      }
    }
  }, [session, status, allowedRoles, allowPublic, router]);

  if (!isAuthorized && !allowPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  return <>{children}</>;
}
