import { AuthGuard } from "@/components/auth/RouteProtection";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["SELLER"]}>
      <main className="flex min-h-screen flex-col">{children}</main>
    </AuthGuard>
  );
}
