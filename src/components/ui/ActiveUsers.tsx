import { useState, useEffect } from "react";
import SkeletonCard from "@/components/ui/SkeletonCard";

const ActiveUsers = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <SkeletonCard />;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Active Users</h3>
      <p>Here is the data for active users...</p>
    </div>
  );
};

export default ActiveUsers;
