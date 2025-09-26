"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

type OneStarProps = {
  src: StaticImageData | string;
  size?: number; // px
  dur?: number; // s
  delay?: number; // s
  scaleFrom?: number; // 0.8 ~ 1
  scaleTo?: number; // 1 ~ 1.3
  className?: string;
};

// CSS custom properties used by star animation
type CSSVars = React.CSSProperties & {
  ["--dur"]?: string;
  ["--delay"]?: string;
  ["--s0"]?: number | string;
  ["--s1"]?: number | string;
};

export function Star({
  src,
  size = 40,
  dur = 10,
  delay = 0,
  scaleFrom = 0.88,
  scaleTo = 1.12,
  className = "",
}: OneStarProps) {
  return (
    <Image
      src={src}
      alt="star"
      width={size}
      height={size}
      className={`star-spin star-glow ${className}`}
      style={
        {
          "--dur": `${dur}s`,
          "--delay": `${delay}s`,
          "--s0": scaleFrom,
          "--s1": scaleTo,
        } as CSSVars
      }
      priority={false}
    />
  );
}
