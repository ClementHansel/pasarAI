import { useState } from "react";
import { FaRobot } from "react-icons/fa";

type AIChatButtonProps = {
  onToggle: (visible: boolean) => void; // Pass a function to toggle visibility
};

export default function AIChatButton({ onToggle }: AIChatButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle button click to toggle visibility of the AI chat panel
  const handleToggle = () => {
    setIsVisible(!isVisible);
    onToggle(!isVisible); // Notify parent to toggle visibility
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Chat with AI"
      className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg ${
        isVisible ? "bg-blue-500" : "bg-green-500"
      } text-white hover:bg-blue-600 transition-all`}
    >
      <FaRobot className="text-2xl" />
    </button>
  );
}
