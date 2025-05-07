import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ("BUYER" | "SELLER")[];
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

    if (!allowedRoles.includes(session.user.role as "BUYER" | "SELLER")) {
      toast.error("You don't have permission to access this page");
      router.push(
        session.user.role === "SELLER" ? "/seller/dashboard" : "/market"
      );
      return;
    }

    setAuthorized(true);
  }, [router, allowedRoles, session, status]);

  return authorized ? <>{children}</> : null;
}
