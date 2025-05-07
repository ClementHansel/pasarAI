// src/components/dashboard/UserEngagement/UserFeedback.tsx
import React from "react";

interface FeedbackData {
  user: string;
  feedback: string;
}

const feedbackData: FeedbackData[] = [
  { user: "User1", feedback: "Great platform! Very user-friendly." },
  { user: "User2", feedback: "Could use more customization options." },
  { user: "User3", feedback: "Amazing content, would love more tutorials!" },
  { user: "User4", feedback: "Good app, but needs performance improvements." },
];

const UserFeedback: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">User Feedback</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{data.user}</td>
              <td className="px-6 py-4">{data.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFeedback;
