export const dynamic = "force-dynamic";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const dashboardSections = [
  {
    title: "Orders",
    href: "/dashboard/orders",
    description: "View and manage all customer orders.",
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    description: "Track stock levels and product availability.",
  },
  {
    title: "Delivery",
    href: "/dashboard/delivery",
    description: "Oversee shipment and delivery processes.",
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    description: "Analyze marketing campaigns and engagement.",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    description: "Explore performance, revenue, and trends.",
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Home</h1>
        <p className="text-lg text-gray-600 mt-2">
          Get a quick overview and navigate to key management areas.
        </p>
      </header>

      {/* Sections Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="block bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h2>
                <ArrowRight className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-sm text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
