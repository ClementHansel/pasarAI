"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/common/Button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  ClipboardList,
  TruckIcon,
  Megaphone,
  PieChart,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const toggleAnalytics = () => setAnalyticsOpen((prev) => !prev);

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
          {/* Main Menu Items */}
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Home size={18} />
              {isOpen && <span className="text-sm">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/inventory"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ClipboardList size={18} />
              {isOpen && <span className="text-sm">Inventory</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ShoppingCart size={18} />
              {isOpen && <span className="text-sm">Orders</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/delivery"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <TruckIcon size={18} />
              {isOpen && <span className="text-sm">Delivery</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/marketing"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Megaphone size={18} />
              {isOpen && <span className="text-sm">Marketing</span>}
            </Link>
          </li>

          {/* Analytics Section with Submenu */}
          <li>
            <button
              onClick={toggleAnalytics}
              className="w-full flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <PieChart size={18} />
                {isOpen && <span className="text-sm">Analytics</span>}
              </span>
              {isOpen &&
                (analyticsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>
          </li>
          {analyticsOpen && (
            <ul className="pl-6 space-y-1">
              <li>
                <Link
                  href="/dashboard/analytics/CustomerInsights"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Users size={18} />
                  {isOpen && <span className="text-sm">Customer Insights</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/EmployeeOperations"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Briefcase size={18} />
                  {isOpen && (
                    <span className="text-sm">Employee Operations</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/FinancialOverview"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <DollarSign size={18} />
                  {isOpen && (
                    <span className="text-sm">Financial Overview</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/ForecastingAnalytics"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <TrendingUp size={18} />
                  {isOpen && <span className="text-sm">Forecasting</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/MarketingPerformance"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <LineChart size={18} />
                  {isOpen && (
                    <span className="text-sm">Marketing Performance</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/OrdersInventory"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Package size={18} />
                  {isOpen && (
                    <span className="text-sm">Orders & Inventory</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/SalesPerformance"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <BarChart2 size={18} />
                  {isOpen && <span className="text-sm">Sales Performance</span>}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/ShippingDelivery"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Truck size={18} />
                  {isOpen && (
                    <span className="text-sm">Shipping & Delivery</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/analytics/UserEngagement"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserCheck size={18} />
                  {isOpen && <span className="text-sm">User Engagement</span>}
                </Link>
              </li>
            </ul>
          )}

          {/* Optional: Add Settings */}
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings size={18} />
              {isOpen && <span className="text-sm">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
