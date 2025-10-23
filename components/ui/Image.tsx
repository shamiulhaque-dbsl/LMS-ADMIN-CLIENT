"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-utils";
import FallbackSVG from "./fallback/CourseCallback";

interface ReusableImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  paddingBottom?: string;
  rounded?: string;
  shadow?: string;
  border?: string;
  fallbackSrc?: string; // Default fallback image
  fallbackComponent?: React.ReactNode; // Custom fallback content (e.g., SVG)\
  priority?: boolean;
}

const ReusableImage: React.FC<ReusableImageProps> = ({
  src,
  alt = "Image",
  width = 200,
  height = 200,
  className = "",
  paddingBottom = "",
  fallbackSrc = "/images/hero.webp",
  fallbackComponent = <FallbackSVG />, // Default fallback is an SVG
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Error handling when image fails to load
  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", paddingBottom, className)}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="absolute inset-0 h-full w-auto object-cover"
          quality={100}
          priority={priority}
          onError={handleError}
        />
      ) : fallbackComponent ? (
        <div className="absolute inset-0 w-auto">{fallbackComponent}</div>
      ) : (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className="absolute inset-0 h-auto w-auto object-cover"
          quality={100}
          priority={priority}
        />
      )}
    </div>
  );
};

export default React.memo(ReusableImage);
