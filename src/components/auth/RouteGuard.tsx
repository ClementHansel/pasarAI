"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ("BUYER" | "SELLER" | "ADMIN")[];
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      setAuthorized(false);
      toast.error("Please log in to continue");
      router.push("/login");
      return;
    }

    const userRole = session.user.role as "BUYER" | "SELLER" | "ADMIN";
    if (!allowedRoles.includes(userRole)) {
      toast.error("You don't have permission to access this page");
      if (userRole === "SELLER" || userRole === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/market");
      }
      return;
    }

    setAuthorized(true);
  }, [router, allowedRoles, session, status]);

  return authorized ? <>{children}</> : null;
}
