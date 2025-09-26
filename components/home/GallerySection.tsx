"use client";

import React, { JSX } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gravitasOne, poiretOne } from "@/fonts/font";

type CSSVars = React.CSSProperties & {
  ["--duration"]?: string;
  ["--gap"]?: string;
  ["--card-w"]?: string;
  ["--pad"]?: string;
};

type Feedback = {
  quote: string;
  name: string;
  title: string;
  rating: number; // 1..5
};

const FEEDBACKS: Feedback[] = [
  {
    quote:
      "Memora helps me relive small moments I would’ve forgotten. The reminders on rainy days are my favorite.",
    name: "An Nguyen",
    title: "Travel creator",
    rating: 5,
  },
  {
    quote:
      "I love how rooms keep photos and notes together. It feels like a cozy place for my memories.",
    name: "Chau Le",
    title: "Designer",
    rating: 5,
  },
  {
    quote:
      "Simple, private, and beautifully organized. Finding a memory now takes seconds.",
    name: "Thao Nguyen",
    title: "Photographer",
    rating: 5,
  },
  {
    quote:
      "The ‘On this day’ resurfacing is perfect. It brings back the right moment at the right time.",
    name: "Mai Tran",
    title: "Journaler",
    rating: 4,
  },
  {
    quote:
      "I shared a public room with friends—everyone could react and add notes. It’s wholesome.",
    name: "Duy Anh",
    title: "Community lead",
    rating: 5,
  },
  {
    quote:
      "Memora’s privacy controls are clear and reassuring. I decide who sees what.",
    name: "Mai Anh",
    title: "Product manager",
    rating: 5,
  },
  {
    quote:
      "It’s my digital memory room: calm, organized, and easy to come back to.",
    name: "Liam Pham",
    title: "Engineer",
    rating: 5,
  },
  {
    quote:
      "The design makes my old photos feel new again. A gentle way to remember.",
    name: "Avery Do",
    title: "Artist",
    rating: 4,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

function RatingStars({ rating = 5 }: { rating?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "w-4 h-4 text-yellow-400 fill-current"
              : "w-4 h-4 text-white/25"
          }
          {...(i < rating ? { stroke: "transparent" } : {})}
        />
      ))}
    </div>
  );
}

function FeedbackRow({
  items,
  duration = 30, // s
  gapPxMin = 12, // px cho clamp
  gapPxMax = 30, // px cho clamp
  cardMin = 240, // px tối thiểu của card
  cardMax = 560, // px tối đa của card
  cardVW = 42, // % viewport width cho card (ví dụ 42vw)
  reverse = false,
}: {
  items: Feedback[];
  duration?: number;
  gapPxMin?: number;
  gapPxMax?: number;
  cardMin?: number;
  cardMax?: number;
  cardVW?: number; // dùng % để responsive theo yêu cầu
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="animate-marquee"
      style={
        {
          "--duration": `${duration}s`,
          // gap responsive: clamp(12px, 3vw, 30px)
          "--gap": `clamp(${gapPxMin}px, 3vw, ${gapPxMax}px)`,
          animationDirection: reverse ? "reverse" : undefined,
        } as CSSVars
      }
    >
      {doubled.map((fb, idx) => (
        <Card
          key={idx}
          // width responsive theo %: clamp(MINpx, cardVW vw, MAXpx)
          style={
            {
              "--card-w": `clamp(${cardMin}px, ${cardVW}vw, ${cardMax}px)`,
              "--pad": `clamp(16px, 2.4vw, 24px)`,
            } as CSSVars
          }
          className="group flex-shrink-0 w-[var(--card-w)] bg-[#0d0d0d] border-transparent rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="px-[var(--pad)] py-[var(--pad)]">
            {/* top: rating + quote icon */}
            <div className="flex items-center justify-between mb-2.5">
              <RatingStars rating={fb.rating} />
              <Quote className="w-5 h-5 text-white/40" />
            </div>

            {/* quote (font-size responsive) */}
            <p className="text-white/90 text-[clamp(1rem,1.2vw,1.125rem)] leading-[clamp(1.6rem,2vw,1.9rem)]">
              “{fb.quote}”
            </p>

            {/* user */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-white/90 text-xs font-semibold backdrop-blur">
                {getInitials(fb.name)}
              </div>
              <div className="leading-tight">
                <div className="text-white font-semibold text-[clamp(0.9rem,1vw,1rem)]">
                  {fb.name}
                </div>
                <div className="text-white/50 text-[clamp(0.7rem,0.9vw,0.8rem)]">
                  {fb.title}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* CSS marquee fallback */}
      <style jsx global>{`
        .animate-marquee {
          display: flex;
          gap: var(--gap, 30px);
          will-change: transform;
          animation: marquee var(--duration, 30s) linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export const GallerySection = (): JSX.Element => {
  return (
    <section className="relative flex flex-col pt-6 lg:pt-10 pb-12 lg:pb-20 items-center gap-[clamp(48px,8vw,112px)] w-full">
      {/* Heading */}
      <span
        className="
          pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 -top-4
          h-[150px] w-[900px] rounded-full blur-[100px] opacity-95 mix-blend-multiply
          bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]
        "
      />
      <div className="flex flex-col w-full max-w-[min(92vw,1100px)] items-center gap-[clamp(12px,2.4vw,28px)]">
        <h2
          className={`${gravitasOne.className} text-center font-medium text-white text-[clamp(28px,5vw,48px)] leading-[clamp(36px,6vw,56px)] tracking-[-0.02em]`}
        >
          What our users say
        </h2>

        <p
          className={`${poiretOne.className} text-center text-white/60 text-[clamp(14px,1.1vw,16px)] leading-[clamp(22px,2vw,28px)] max-w-[75ch]`}
        >
          Real stories from people who made a room for their memories. Private,
          gentle, and always there when it matters.
        </p>
      </div>

      {/* Rows */}
      <div className="w-full overflow-hidden">
        <div className="flex flex-col gap-[clamp(16px,2.8vw,28px)]">
          {/* Hàng 1: card ~42vw */}
          <FeedbackRow items={FEEDBACKS} duration={30} cardVW={42} />

          {/* Hàng 2 đảo chiều: card ~38vw */}
          <FeedbackRow items={FEEDBACKS} duration={40} cardVW={38} reverse />
        </div>
      </div>
    </section>
  );
};
