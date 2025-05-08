// src/app/(dashboard)/page.tsx
export const dynamic = "force-dynamic"; // add this at the top
import { AuthGuard } from "@/components/auth/AuthGuard";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <AuthGuard allowedRoles={["SELLER", "ADMIN"]}>
      <div>
        {/* Dashboard Header Section */}
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-lg text-gray-600">Your performance overview</p>
        </header>

        {/* Stats Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-medium mb-4">Statistics</h2>
          {/* <Stats /> Stats component will display key metrics */}
        </section>

        {/* Additional widgets or sections can be added below */}
        <section>
          {/* Example: Recent Orders, System Status, User Activity, etc. */}
          <h2>Sample Section</h2>
        </section>
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
