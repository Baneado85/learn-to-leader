"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { getAssetUrl } from "@/lib/assetUrl";

interface AvatarImageProps {
  avatarUrl?: string | null;
  name?: string;
  className?: string;
  iconSize?: number;
}

export default function AvatarImage({
  avatarUrl,
  name,
  className = "w-full h-full",
  iconSize = 20
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  const fullUrl = avatarUrl ? getAssetUrl(avatarUrl) : null;

  if (fullUrl && !hasError) {
    return (
      <img
        src={fullUrl}
        alt={name || "Avatar"}
        className={`${className} object-cover`}
        onError={() => setHasError(true)}
      />
    );
  }

  // Default "Sin foto" avatar placeholder
  return (
    <div className={`${className} bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center text-brand-primary font-bold overflow-hidden shadow-inner`}>
      {name ? (
        <span className="font-fredoka text-sm uppercase">{name[0]}</span>
      ) : (
        <User size={iconSize} className="text-brand-primary opacity-80" />
      )}
    </div>
  );
}
