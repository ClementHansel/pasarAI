import ChurnRate from "@/components/dashboard/analyticals/UserEngagement/ChurnRate";
import ContentInteractionRate from "@/components/dashboard/analyticals/UserEngagement/ContentInteractionRate";
import CustomerSatisfaction from "@/components/dashboard/analyticals/UserEngagement/CustomerSatisfaction";
import EngagementOverTime from "@/components/dashboard/analyticals/UserEngagement/EngagementOverTime";
import MostViewedContent from "@/components/dashboard/analyticals/UserEngagement/MostViewedContent";
import RetentionRate from "@/components/dashboard/analyticals/UserEngagement/RetentionRate";
import SessionDuration from "@/components/dashboard/analyticals/UserEngagement/SessionDuration";
import TopPerformingContent from "@/components/dashboard/analyticals/UserEngagement/TopPerformingContent";
import UserAcquisitionGrowth from "@/components/dashboard/analyticals/UserEngagement/UserAcquisitionGrowth";
import UserActions from "@/components/dashboard/analyticals/UserEngagement/UserActions";
import UserFeedback from "@/components/dashboard/analyticals/UserEngagement/UserFeedback";
import UserSegments from "@/components/dashboard/analyticals/UserEngagement/UserSegments";

export default function UserEngagementPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">👥 User Engagement</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ChurnRate />
        <ContentInteractionRate />
        <CustomerSatisfaction />
        <EngagementOverTime />
        <MostViewedContent />
        <RetentionRate />
        <SessionDuration />
        <TopPerformingContent />
        <UserAcquisitionGrowth />
        <UserActions />
        <UserFeedback />
        <UserSegments />
      </div>
    </div>
  );
}
