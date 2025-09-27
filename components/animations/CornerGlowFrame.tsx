"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  size?: number; // px
  blur?: number; // px
  speed?: number; // s
  opacity?: number; // 0..1
  offset?: number; // px: lệch ra ngoài card
  colors?: string[]; // stops cho conic-gradient
  className?: string; // thêm class ngoài nếu cần
};

// Type-safe cho các CSS custom properties dùng trong component
type CSSVars = React.CSSProperties & {
  ["--cg-size"]?: string;
  ["--cg-blur"]?: string;
  ["--cg-speed"]?: string;
  ["--cg-opacity"]?: string;
  ["--cg-offset"]?: string;
  ["--cg-stops"]?: string;
};

export default function CornerGlowFrame({
  children,
  size = 220,
  blur = 56,
  speed = 8,
  opacity = 0.75,
  offset = -40,
  colors = ["#ff1f8f", "#7c3aed", "#06b6d4", "#22c55e", "#fde047", "#ff1f8f"],
  className = "",
}: Props) {
  const styleVars: CSSVars = {
    "--cg-size": `${size}px`,
    "--cg-blur": `${blur}px`,
    "--cg-speed": `${speed}s`,
    "--cg-opacity": opacity.toString(),
    "--cg-offset": `${offset}px`,
    "--cg-stops": colors.join(","),
  };

  return (
    <div className={`cg-frame ${className}`} style={styleVars}>
      {/* 4 góc glow */}
      <span className="corner-glow tl" aria-hidden />
      <span className="corner-glow tr" aria-hidden />
      <span className="corner-glow bl" aria-hidden />
      <span className="corner-glow br" aria-hidden />

      {/* nội dung */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
