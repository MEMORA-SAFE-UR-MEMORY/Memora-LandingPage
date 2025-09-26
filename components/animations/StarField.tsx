"use client";
import Image, { StaticImageData } from "next/image";
import React, { useMemo } from "react";

type StarFieldProps = {
  src: StaticImageData | string;
  count?: number;
  className?: string; // wrapper (thường absolute inset-0 -z-10)
  seed?: number; // để cố định ngẫu nhiên nếu muốn
  minSize?: number; // px
  maxSize?: number; // px
  minDur?: number; // s
  maxDur?: number; // s
};

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarField({
  src,
  count = 12,
  className = "",
  seed,
  minSize = 18,
  maxSize = 40,
  minDur = 6,
  maxDur = 14,
}: StarFieldProps) {
  const rng = useMemo(
    () => (seed != null ? mulberry32(seed) : Math.random),
    [seed]
  );

  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.round((rng() as number) * 100); // %
        const top = Math.round((rng() as number) * 100); // %
        const size = Math.round(
          minSize + (maxSize - minSize) * (rng() as number)
        );
        const dur = +(minDur + (maxDur - minDur) * (rng() as number)).toFixed(
          2
        );
        const delay = +((rng() as number) * 5).toFixed(2);
        const angle = Math.round((rng() as number) * 360); // góc ban đầu
        const s0 = +(0.82 + (rng() as number) * 0.12).toFixed(2);
        const s1 = +(1.06 + (rng() as number) * 0.18).toFixed(2);
        return { key: `star-${i}`, left, top, size, dur, delay, angle, s0, s1 };
      }),
    [count, rng, minSize, maxSize, minDur, maxDur]
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden
    >
      {stars.map((s) => (
        <div
          key={s.key}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            transform: `rotate(${s.angle}deg)`,
          }}
        >
          <Image
            src={src}
            alt="star"
            width={s.size}
            height={s.size}
            className="star-spin star-glow"
            style={
              {
                ["--dur" as any]: `${s.dur}s`,
                ["--delay" as any]: `${s.delay}s`,
                ["--s0" as any]: s.s0,
                ["--s1" as any]: s.s1,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
