"use client";
import { RouteGuard } from "@/components/auth/RouteGuard";
import CustomerLifetimeValuePrediction from "@/components/dashboard/analyticals/ForecastingAnalytics/CustomerLifetimeValuePrediction";
import CustomerPredictions from "@/components/dashboard/analyticals/ForecastingAnalytics/CustomerPredictions";
import DemandForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/DemandForecast";
import InventoryForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/InventoryForecast";
import PerformanceIndicators from "@/components/dashboard/analyticals/ForecastingAnalytics/PerformanceIndicators";
import ProfitabilityForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/ProfitabilityForecast";
import RegionalComparison from "@/components/dashboard/analyticals/ForecastingAnalytics/RegionalComparison";
import RevenueForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/RevenueForecast";
import ROIPerformance from "@/components/dashboard/analyticals/ForecastingAnalytics/ROIPerformance";
import SalesForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/SalesForecast";
import SeasonalDemandForecast from "@/components/dashboard/analyticals/ForecastingAnalytics/SeasonalDemandForecast";
import TrendAnalysis from "@/components/dashboard/analyticals/ForecastingAnalytics/TrendAnalysis";
import TrendPrediction from "@/components/dashboard/analyticals/ForecastingAnalytics/TrendPrediction";
import TrendSummary from "@/components/dashboard/analyticals/ForecastingAnalytics/TrendSummary";
import YearComparison from "@/components/dashboard/analyticals/ForecastingAnalytics/YearComparison";

export default function ForecastingAnalyticsPage() {
  return (
    <RouteGuard allowedRoles={["SELLER"]}>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">📊 Forecasting Analytics</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CustomerLifetimeValuePrediction />
          <CustomerPredictions />
          <DemandForecast />
          <InventoryForecast />
          <PerformanceIndicators />
          <ProfitabilityForecast />
          <RegionalComparison />
          <RevenueForecast />
          <ROIPerformance />
          <SalesForecast />
          <SeasonalDemandForecast />
          <TrendAnalysis />
          <TrendPrediction />
          <TrendSummary />
          <YearComparison />
        </div>
      </div>
    </RouteGuard>
  );
}
