"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface PackageDamageRateProps {
  damageRate: number; // e.g., 1.2 (percentage)
  trend: "up" | "down"; // e.g., "up" or "down"
  comparison: string; // e.g., "compared to last month"
}

const PackageDamageRate: React.FC<PackageDamageRateProps> = ({
  damageRate,
  trend,
  comparison,
}) => {
  // Ensure that trend is properly handled
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === "up" ? "text-red-500" : "text-green-500";

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Package Damage Rate
            </h3>
            <p className="text-2xl font-bold">{damageRate.toFixed(1)}%</p>
          </div>
          <div className={`flex items-center ${trendColor}`}>
            <TrendIcon className="w-5 h-5 mr-1" />
            <span className="text-sm">{comparison}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDamageRate;
