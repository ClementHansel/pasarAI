// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart2,
  Settings,
  Users,
  DollarSign,
  TrendingUp,
  Briefcase,
  LineChart,
  ShoppingCart,
  Package,
  Truck,
  UserCheck,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { label: "Home", icon: <Home size={18} />, href: "/dashboard/home" },
  {
    label: "Customer Insights",
    icon: <Users size={18} />,
    href: "/dashboard/CustomerInsights",
  },
  {
    label: "Employee Operations",
    icon: <Briefcase size={18} />,
    href: "/dashboard/EmployeeOperations",
  },
  {
    label: "Financial Overview",
    icon: <DollarSign size={18} />,
    href: "/dashboard/FinancialOverview",
  },
  {
    label: "Forecasting Analytics",
    icon: <TrendingUp size={18} />,
    href: "/dashboard/ForecastingAnalytics",
  },
  {
    label: "Marketing Performance",
    icon: <LineChart size={18} />,
    href: "/dashboard/MarketingPerformance",
  },
  {
    label: "Orders Inventory",
    icon: <ShoppingCart size={18} />,
    href: "/dashboard/OrdersInventory",
  },
  {
    label: "Sales Performance",
    icon: <Package size={18} />,
    href: "/dashboard/SalesPerformance",
  },
  {
    label: "Shipping & Delivery",
    icon: <Truck size={18} />,
    href: "/dashboard/ShippingDelivery",
  },
  {
    label: "User Engagement",
    icon: <UserCheck size={18} />,
    href: "/dashboard/UserEngagement",
  },
  {
    label: "Reports",
    icon: <BarChart2 size={18} />,
    href: "/dashboard/reports",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    href: "/dashboard/settings",
  },
];

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`h-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && <span className="text-lg font-bold">Dashboard</span>}
        <Button size="sm" variant="primary" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <nav className="px-2">
        <ul className="space-y-1">
          {menuItems.map(({ label, icon, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {icon}
                {isOpen && <span className="text-sm">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
