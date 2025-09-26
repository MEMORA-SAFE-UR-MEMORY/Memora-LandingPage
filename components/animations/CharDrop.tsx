"use client";

import React, { useMemo } from "react";

type VarStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--dur"]?: string;
};
type TagName = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";

type Props = {
  text: string;
  as?: TagName; // thẻ bao ngoài
  className?: string;
  delayStep?: number; // khoảng cách thời gian giữa 2 ký tự (s)
  duration?: number; // thời gian rơi của 1 ký tự (s)
  random?: boolean; // true = rơi ngẫu nhiên
  seed?: number; // tùy chọn: để tái lập ngẫu nhiên (cố định)
};

// RNG theo seed để kết quả ổn định nếu cần
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle<T>(arr: T[], rng: () => number) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CharDrop({
  text,
  as: Tag = "p",
  className = "",
  delayStep = 0.1,
  duration = 1.4,
  random = true,
  seed,
}: Props) {
  const orderMap = useMemo(() => {
    // Lấy index của các ký tự KHÔNG phải khoảng trắng
    const indices: number[] = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " ") indices.push(i);
    }
    const rng = seed != null ? mulberry32(seed) : Math.random;
    const seq = random
      ? shuffle(indices, typeof rng === "function" ? (rng as any) : Math.random)
      : indices;

    // map: index ký tự -> thứ hạng rơi (0,1,2,...)
    const map: Record<number, number> = {};
    seq.forEach((pos, rank) => (map[pos] = rank));
    return map;
  }, [text, random, seed]);

  return (
    <Tag className={className} aria-label={text}>
      {text.split("").map((ch, i) => {
        const rank = ch === " " ? 0 : orderMap[i] ?? 0;
        const style: VarStyle = {
          "--delay": `${rank * delayStep}s`,
          "--dur": `${duration}s`,
        };
        return (
          <span key={`${ch}-${i}`} className="char-drop" style={style}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </Tag>
  );
}
