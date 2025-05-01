import { AuthGuard } from "@/components/auth/RouteProtection";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowPublic={true}>
      <main className="flex min-h-screen flex-col">{children}</main>
    </AuthGuard>
  );
}
