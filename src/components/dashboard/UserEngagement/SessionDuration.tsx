// src/components/dashboard/UserEngagement/SessionDuration.tsx
import React from "react";

interface SessionDurationData {
  month: string;
  avgSessionDuration: number;
}

const sessionData: SessionDurationData[] = [
  { month: "January", avgSessionDuration: 5.2 },
  { month: "February", avgSessionDuration: 5.5 },
  { month: "March", avgSessionDuration: 5.3 },
  { month: "April", avgSessionDuration: 5.8 },
  { month: "May", avgSessionDuration: 6.0 },
];

const SessionDuration: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Session Duration</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Avg. Session Duration (min)
            </th>
          </tr>
        </thead>
        <tbody>
          {sessionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.month}</td>
              <td className="px-6 py-4">{data.avgSessionDuration} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionDuration;
