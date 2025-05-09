import AdSpendROI from "@/components/dashboard/analyticals/MarketingPerformance/AdSpendROI";
import CampaignPerformance from "@/components/dashboard/analyticals/MarketingPerformance/CampaignPerformance";
import ConversionRate from "@/components/dashboard/analyticals/MarketingPerformance/ConversionRate";
import CostPerLead from "@/components/dashboard/analyticals/MarketingPerformance/CostPerLead";
import CustomerAcquisitionChannels from "@/components/dashboard/analyticals/MarketingPerformance/CustomerAcquisitionChannels";
import EmailMarketingStats from "@/components/dashboard/analyticals/MarketingPerformance/EmailMarketingStats";
import FunnelBreakdown from "@/components/dashboard/analyticals/MarketingPerformance/FunnelBreakdown";
import LandingPagePerformance from "@/components/dashboard/analyticals/MarketingPerformance/LandingPagePerformance";
import TrafficSources from "@/components/dashboard/analyticals/MarketingPerformance/TrafficSources";

export default function MarketingPerformancePage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">📈 Marketing Performance</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdSpendROI />
        <CampaignPerformance />
        <ConversionRate />
        <CostPerLead />
        <CustomerAcquisitionChannels />
        <EmailMarketingStats />
        <FunnelBreakdown />
        <LandingPagePerformance />
        <TrafficSources />
      </div>
    </div>
  );
}
