import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const analyticsPages = [
  {
    title: "Customer Insights",
    href: "/dashboard/analytics/CustomerInsights",
    description: "Understand customer behavior and preferences.",
  },
  {
    title: "Employee Operations",
    href: "/dashboard/analytics/EmployeeOperations",
    description: "Monitor employee performance and tasks.",
  },
  {
    title: "Financial Overview",
    href: "/dashboard/analytics/FinancialOverview",
    description: "View your revenue, expenses, and profit summaries.",
  },
  {
    title: "Forecasting Analytics",
    href: "/dashboard/analytics/ForecastingAnalytics",
    description: "Predict sales trends and inventory demands.",
  },
  {
    title: "Marketing Performance",
    href: "/dashboard/analytics/MarketingPerformance",
    description: "Analyze your campaigns and ad performance.",
  },
  {
    title: "Orders & Inventory",
    href: "/dashboard/analytics/OrdersInventory",
    description: "Track orders, stock levels, and fulfillment.",
  },
  {
    title: "Sales Performance",
    href: "/dashboard/analytics/SalesPerformance",
    description: "Get insights into top-selling products and trends.",
  },
  {
    title: "Shipping & Delivery",
    href: "/dashboard/analytics/ShippingDelivery",
    description: "Monitor delivery timelines and shipping efficiency.",
  },
  {
    title: "User Engagement",
    href: "/dashboard/analytics/UserEngagement",
    description: "Track user activity and retention metrics.",
  },
];

export default function AnalyticsOverviewPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsPages.map((page) => (
          <Link key={page.href} href={page.href}>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{page.title}</h2>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {page.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
