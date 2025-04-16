// src/app/(dashboard)/page.tsx
import React from "react";
import Stats from "@/components/dashboard/Stats";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-lg text-gray-600">Your performance overview</p>
      </header>

      {/* Stats Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-medium mb-4">Statistics</h2>
        <Stats /> {/* Stats component will display key metrics */}
      </section>

      {/* Additional widgets can be added below */}
      <section>
        {/* e.g., Recent Orders, System Status, User Activity, etc. */}
      </section>
    </div>
  );
};

export default DashboardPage;
