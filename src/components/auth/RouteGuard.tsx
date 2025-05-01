import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ("BUYER" | "SELLER")[];
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();

        if (!response.ok || !data.user) {
          throw new Error("Not authenticated");
        }

        if (!allowedRoles.includes(data.user.role)) {
          toast.error("You don't have permission to access this page");
          router.push(
            data.user.role === "SELLER" ? "/seller/dashboard" : "/market"
          );
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthorized(false);
        toast.error("Please log in to continue");
        router.push("/login");
      }
    }

    checkAuth();
  }, [router, allowedRoles]);

  return authorized ? <>{children}</> : null;
}
