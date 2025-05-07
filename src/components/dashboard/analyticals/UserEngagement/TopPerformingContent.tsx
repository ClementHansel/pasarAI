// src/components/dashboard/UserEngagement/TopPerformingContent.tsx
import React from "react";

interface ContentData {
  title: string;
  views: number;
  engagementRate: number;
}

const contentData: ContentData[] = [
  { title: "How to Grow Your Business", views: 5000, engagementRate: 75 },
  { title: "Effective Marketing Strategies", views: 4500, engagementRate: 80 },
  { title: "Customer Retention Tips", views: 4000, engagementRate: 85 },
  { title: "Leveraging Social Media", views: 3500, engagementRate: 90 },
];

const TopPerformingContent: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Top Performing Content</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Views
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Engagement Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((content, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{content.title}</td>
              <td className="px-6 py-4">{content.views}</td>
              <td className="px-6 py-4">{content.engagementRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformingContent;
