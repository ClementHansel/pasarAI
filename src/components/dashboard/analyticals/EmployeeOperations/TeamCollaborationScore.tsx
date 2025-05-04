// src/components/dashboard/EmployeeOperations/TeamCollaborationScore.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TeamCollaborationScoreData } from "@/types/analytical/employeeInsights";

interface TeamCollaborationScoreProps {
  data?: TeamCollaborationScoreData[];
}

const TeamCollaborationScore: React.FC<TeamCollaborationScoreProps> = ({
  data,
}) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Collaboration Score</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((team) => (
              <li
                key={team.teamName}
                className="flex items-center justify-between border-b pb-2 last:border-none"
              >
                <span className="font-medium">{team.teamName}</span>
                <span className="text-sm text-gray-500">
                  {team.collaborationScore}%
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No collaboration data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamCollaborationScore;
