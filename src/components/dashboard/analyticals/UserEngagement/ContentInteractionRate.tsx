// src/components/dashboard/UserEngagement/ContentInteractionRate.tsx
import React from "react";

interface ContentInteractionData {
  title: string;
  interactionRate: number;
}

const interactionData: ContentInteractionData[] = [
  { title: "How to Grow Your Business", interactionRate: 75 },
  { title: "Effective Marketing Strategies", interactionRate: 82 },
  { title: "Customer Retention Tips", interactionRate: 90 },
  { title: "Leveraging Social Media", interactionRate: 78 },
];

const ContentInteractionRate: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Content Interaction Rate</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Content Title
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Interaction Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {interactionData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.title}</td>
              <td className="px-6 py-4">{data.interactionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentInteractionRate;
