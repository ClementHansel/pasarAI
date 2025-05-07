// src/components/SubmitButton.tsx

import React from "react";

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      className="p-2 bg-blue-500 text-white rounded"
      disabled={loading}
    >
      {loading ? "Creating..." : "Create Product"}
    </button>
  );
};

export default SubmitButton;
