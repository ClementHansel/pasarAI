import Image from "next/image";
import React, { useState } from "react";

interface UserAvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  imageUrl,
  size = 40,
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (imageUrl && !imageError) {
    return (
      <div
        className="rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image
          width={size}
          height={size}
          src={imageUrl}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to initials
  return (
    <div
      className="rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(size * 0.4, 14),
      }}
    >
      {initials}
    </div>
  );
};
