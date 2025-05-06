// src/app/(dashboard)/page.tsx
"use client";
export const dynamic = "force-dynamic"; // add this at the top
import React from "react";
import { RouteGuard } from "@/components/auth/RouteGuard";

const DashboardPage: React.FC = () => {
  return (
    <RouteGuard allowedRoles={["SELLER", "ADMIN"]}>
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
    </RouteGuard>
  );
};

export default DashboardPage;
