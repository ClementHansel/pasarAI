// src/components/dashboard/EmployeeOperations/TeamCollaborationScore.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TeamCollaboration {
  teamName: string;
  collaborationScore: number; // Collaboration score from 1 to 100
}

const mockCollaborationData: TeamCollaboration[] = [
  { teamName: "Team A", collaborationScore: 80 },
  { teamName: "Team B", collaborationScore: 70 },
  { teamName: "Team C", collaborationScore: 85 },
  { teamName: "Team D", collaborationScore: 65 },
];

export default function TeamCollaborationScore() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Collaboration Score</h2>
        <ul className="space-y-3">
          {mockCollaborationData.map((team) => (
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
      </CardContent>
    </Card>
  );
}
