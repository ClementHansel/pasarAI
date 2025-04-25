import React from "react";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ChatSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const ChatSidebar = ({ isCollapsed, toggleSidebar }: ChatSidebarProps) => {
  return (
    <div
      className={cn(
        "h-screen bg-[#1A1F2C] text-white transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <span className="text-sm font-semibold">Chat History</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ArrowRight /> : <ArrowLeft />}
        </Button>
      </div>

      <div className="p-2">
        {!isCollapsed && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span className="truncate">New Chat</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
