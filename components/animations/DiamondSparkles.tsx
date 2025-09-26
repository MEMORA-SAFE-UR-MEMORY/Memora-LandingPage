"use client";

import React, { useMemo } from "react";

type DiamondProps = {
  count?: number;
  className?: string; // classes cho wrapper
  colors?: string[]; // optional gradient overrides (CSS backgrounds)
  seed?: number; // optional seed để kết quả reproducible
  sizes?: ("small" | "md" | "lg")[]; // sizes pool
};

// Cho phép dùng các CSS custom properties một cách type-safe
type CSSVars = React.CSSProperties & {
  ["--delay"]?: string;
  ["--dur"]?: string;
  ["--floatDur"]?: string;
  ["--fill"]?: string;
  ["--border"]?: string;
  ["--glow1"]?: string;
  ["--glow2"]?: string;
};

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function DiamondSparkles({
  count = 12,
  className = "",
  colors = [
    "linear-gradient(135deg,#fff 0%, rgba(255,200,255,0.28) 60%)",
    "linear-gradient(135deg,#fff 0%, rgba(200,220,255,0.28) 60%)",
    "linear-gradient(135deg,#fff 0%, rgba(255,240,200,0.28) 60%)",
  ],
  seed,
  sizes = ["small", "md", "md", "lg"],
}: DiamondProps) {
  const arr = useMemo(() => {
    const rng: () => number = seed != null ? mulberry32(seed) : Math.random;
    const items = Array.from({ length: count }).map((_, i) => {
      const left = Math.floor(rng() * 100); // percent
      const top = Math.floor(rng() * 80); // percent (not too low)
      const delay = +(rng() * 3).toFixed(2);
      const color = colors[Math.floor(rng() * colors.length)];
      const sizeCls = sizes[Math.floor(rng() * sizes.length)];
      const dur = (2 + rng() * 2.5).toFixed(2); // twinkle dur
      const floatDur = (5 + rng() * 5).toFixed(2); // float duration
      return { left, top, delay, color, sizeCls, dur, floatDur, key: `d-${i}` };
    });
    return items;
  }, [count, colors, seed, sizes]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {arr.map((d) => (
        <span
          key={d.key}
          className={`diamond ${d.sizeCls}`}
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              "--delay": `${d.delay}s`,
              "--dur": `${d.dur}s`,
              "--floatDur": `${d.floatDur}s`,

              /* set trắng + viền/glow */
              "--fill": "#ffffff",
              "--border": "rgba(0,0,0,0.20)", // nếu nền sáng
              // nếu Hero nền tối, đổi thành: "rgba(255,255,255,0.6)"
              "--glow1": "rgba(255,255,255,0.85)",
              "--glow2": "rgba(255,255,255,0.55)",
            } as CSSVars
          }
        />
      ))}
    </div>
  );
}
