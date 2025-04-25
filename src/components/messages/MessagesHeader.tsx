"use client";

import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import Image from "next/image";

type MessagesHeaderProps = {
  title: string;
  onBack?: () => void;
  onOptionsClick?: () => void;
  avatar?: string;
  status?: "online" | "offline" | "away";
};

export default function MessagesHeader({
  title,
  onBack,
  onOptionsClick,
  avatar = "/api/placeholder/40/40",
  status = "online",
}: MessagesHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-black transition md:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative">
          <Image
            width={40}
            height={40}
            src={avatar}
            alt="Contact"
            className="w-8 h-8 rounded-full"
          />
          {status === "online" && (
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          )}
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          {status === "online" && (
            <p className="text-xs text-green-600">Online</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
          aria-label="Voice call"
        >
          <Phone className="w-5 h-5" />
        </button>

        <button
          className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
          aria-label="Video call"
        >
          <Video className="w-5 h-5" />
        </button>

        {onOptionsClick && (
          <button
            onClick={onOptionsClick}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            aria-label="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
