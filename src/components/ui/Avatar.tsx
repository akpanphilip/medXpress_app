"use client";

import { useState } from "react";
import { cn, initials, avatarGradient } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}

export default function Avatar({
  src,
  name,
  size = 44,
  className,
  ring,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        ring && "ring-2 ring-surface",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImg ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br font-bold text-white",
            avatarGradient(name),
          )}
          style={{ fontSize: Math.round(size * 0.36) }}
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
}
