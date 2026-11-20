"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  fallbackClassName?: string;
};

export function SafeImage({
  alt,
  className,
  fallbackClassName,
  src,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-stone via-ivory to-stone/70 ${fallbackClassName ?? className ?? ""}`}
        role="img"
        aria-label={alt || undefined}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={src}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
