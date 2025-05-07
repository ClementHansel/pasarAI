// src/components/dashboard/UserEngagement/MostViewedContent.tsx
import React from "react";

interface ContentViewData {
  title: string;
  views: number;
}

const contentViews: ContentViewData[] = [
  { title: "How to Grow Your Business", views: 10000 },
  { title: "Effective Marketing Strategies", views: 9500 },
  { title: "Customer Retention Tips", views: 9000 },
  { title: "Leveraging Social Media", views: 8700 },
];

const MostViewedContent: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Most Viewed Content</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Content Title
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Views
            </th>
          </tr>
        </thead>
        <tbody>
          {contentViews.map((content, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{content.title}</td>
              <td className="px-6 py-4">{content.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostViewedContent;
