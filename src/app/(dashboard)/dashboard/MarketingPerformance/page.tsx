import AdSpendROI from "@/components/dashboard/MarketingPerformance/AdSpendROI";
import CampaignPerformance from "@/components/dashboard/MarketingPerformance/CampaignPerformance";
import ConversionRate from "@/components/dashboard/MarketingPerformance/ConversionRate";
import CostPerLead from "@/components/dashboard/MarketingPerformance/CostPerLead";
import CustomerAcquisitionChannels from "@/components/dashboard/MarketingPerformance/CustomerAcquisitionChannels";
import EmailMarketingStats from "@/components/dashboard/MarketingPerformance/EmailMarketingStats";
import FunnelBreakdown from "@/components/dashboard/MarketingPerformance/FunnelBreakdown";
import LandingPagePerformance from "@/components/dashboard/MarketingPerformance/LandingPagePerformance";
import TrafficSources from "@/components/dashboard/MarketingPerformance/TrafficSources";

export default function MarketingPerformancePage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">📈 Marketing Performance</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
