"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

type CSSVars = React.CSSProperties & {
  ["--dur"]?: string;
  ["--delay"]?: string;
};

type Props = {
  src?: StaticImageData | string;
  alt?: string;
  name?: string; // tên người gắn với badge
  className?: string; // vị trí tuyệt đối
  size?: number; // px
  float?: boolean; // bật hiệu ứng lủng lẳng
  dur?: number; // thời gian 1 chu kỳ (s)
  delay?: number; // trễ bắt đầu (s)
  onSelect?: (name: string) => void;
  children?: React.ReactNode; // fallback text nếu không có ảnh
};

export default function BadgeAvatar({
  src,
  alt = "avatar",
  name,
  className = "",
  size,
  float = true,
  dur = 7,
  delay = 0,
  onSelect,
  children,
}: Props) {
  return (
    <div
      role="button"
      title={name || alt}
      onClick={() => onSelect?.(name || alt)}
      className={[
        "rounded-full overflow-hidden ring-1 ring-black/10 shadow-md bg-white/40 backdrop-blur",
        "flex items-center justify-center cursor-pointer select-none",
        float ? "ba-bob" : "",
        className,
      ].join(" ")}
      style={
        {
          width: size,
          height: size,
          "--dur": `${dur}s`,
          "--delay": `${delay}s`,
        } as CSSVars
      }
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-800">{children}</span>
      )}

      {/* CSS-in-JS cho hiệu ứng lủng lẳng */}
      <style jsx>{`
        @keyframes ba-bob {
          0% {
            transform: translate(0, 0) rotate(-1.2deg);
          }
          50% {
            transform: translate(8px, -8px) rotate(1.2deg);
          }
          100% {
            transform: translate(0, 0) rotate(-1.2deg);
          }
        }
        .ba-bob {
          animation: ba-bob var(--dur, 7s) ease-in-out var(--delay, 0s) infinite;
          transform-origin: 50% 45%;
          will-change: transform;
        }
        .ba-bob:hover {
          animation-duration: calc(var(--dur, 7s) * 0.8);
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
}
