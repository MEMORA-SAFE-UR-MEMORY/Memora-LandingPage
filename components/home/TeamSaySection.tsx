"use client";

import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";
import StarSvg from "@/public/icons/star.svg";
import AvatarMain from "../../public/images/person/person1.jpg";
import BadgeAvatar from "../animations/BadgeAvatar";
import AN from "../../public/images/person/person2.png";
import TH from "../../public/images/person/person3.png";
import TM from "../../public/images/person/person4.jpg";
import MA from "../../public/images/person/person6.png";
import DA from "../../public/images/person/person5.png";
import { useState } from "react";
import StarField from "../animations/StarField";

export default function TeamSaySection() {
  const [activeName, setActiveName] = useState<string>("Chau");

  return (
    <section className="relative pt-2 lg:pt-10 pb-10 lg:pb-18 overflow-hidden overflow-x-hidden">
      {/* soft edge glows */}

      <span className="pointer-events-none absolute right-[-80px] top-[200px] -z-10 h-[360px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(94vw,1200px)] grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
        {/* CENTERED HEADING */}
        <div className="lg:col-span-2 order-first text-center">
          <p
            className={`${kumbhSans.className} uppercase tracking-[0.25em] text-xl text-rose-500 mb-2`}
          >
            Statement
          </p>
          <h2
            className={`${gravitasOne.className} text-5xl sm:text-6xl leading-tight text-white`}
          >
            What Our Team Says
          </h2>
        </div>
        {/* LEFT — rings + central avatar + small avatars */}
        <div className="relative h-[540px]">
          {/* concentric ellipse rings */}
          <div className="absolute top-10 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg]" />
          <div className="absolute left-6 top-16 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-6" />
          <div className="absolute left-12 top-22 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-12" />

          {/* warm glow behind circle */}
          <span className="absolute left-16 top-24 -z-10 w-[420px] h-[260px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
          <StarField
            src={StarSvg}
            count={36}
            seed={42}
            className="-z-10"
            minSize={12}
            maxSize={32}
            minDur={10}
            maxDur={18}
          />

          <BadgeAvatar
            src={AvatarMain}
            name="Chau" // <-- trùng với tên trong danh sách chips
            alt="Chau"
            size={300}
            float={false} // avatar chính không cần lủng lẳng
            onSelect={setActiveName}
            className={`
    absolute left-25 top-28
    transition ring-1
    ${activeName === "Chau" ? "ring-2 shadow-2xl" : "ring-black/10 shadow-xl"}
    hover:scale-[1.01]
  `}
          />

          {/* quote badge */}
          <div className="absolute left-[370px] top-[250px] h-14 w-14 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center">
            <QuoteIcon />
          </div>

          {/* small avatars around (initials as placeholders) */}
          <BadgeAvatar
            src={MA}
            name="Mai Anh"
            alt="Mai Anh"
            className="absolute left-10 top-7"
            size={100}
            float
            dur={7.5}
            delay={0.2}
            onSelect={setActiveName}
          />
          <BadgeAvatar
            src={TM}
            name="Mai"
            alt="Mai"
            className="absolute left-[400px] top-[80px]"
            float
            size={90}
            dur={8.5}
            delay={0.8}
            onSelect={setActiveName}
          />
          <BadgeAvatar
            src={TH}
            name="Thao"
            alt="Thao"
            className="absolute left-[10px] top-[380px]"
            float
            size={120}
            dur={7.9}
            delay={0.5}
            onSelect={setActiveName}
          />
          <BadgeAvatar
            src={AN}
            name="An"
            alt="An"
            className="absolute left-[340px] top-[440px]"
            float
            size={100}
            dur={9.2}
            delay={0.3}
            onSelect={setActiveName}
          />
          <BadgeAvatar
            src={DA}
            name="Duy Anh"
            alt="Duy Anh"
            className="absolute right-[0px] top-[300px]"
            float
            size={100}
            dur={9.2}
            delay={0.3}
            onSelect={setActiveName}
          />
        </div>
        {/* RIGHT — text */}
        <div className="max-w-xl">
          <h3
            className={`${kumbhSans.className} !font-semibold text-2xl text-white mb-3`}
          >
            The best place for memories to stay.
          </h3>
          <p
            className={`${poiretOne.className} text-xl !font-semibold text-gray-800 leading-relaxed`}
          >
            “Memora turns memories into a little world: capture each moment and
            shape your own exhibition room, a living space for your stories.”
          </p>
          {/* mini team chips */}
          <div
            className={`${kumbhSans.className} mt-6 flex flex-wrap items-center gap-3`}
          >
            {["An", "Chau", "Thao", "Mai", "Duy Anh", "Mai Anh"].map((n) => {
              const active = activeName === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setActiveName(n)}
                  className={`
          inline-flex h-8 px-3 items-center rounded-full text-sm tracking-wide transition
          backdrop-blur-md border
          ${
            active
              ? "chip-active font-semibold"
              : "bg-white/20 border-white/60 text-gray-800/90 shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:bg-white/30"
          }
        `}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <style jsx>{`
            @keyframes chipGradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .chip-active {
              color: #fff !important;
              border-color: rgba(255, 255, 255, 0.35) !important;
              background-image: linear-gradient(
                90deg,
                rgba(244, 114, 182, 0.95),
                /* rose-400 */ rgba(167, 139, 250, 0.95),
                /* violet-400 */ rgba(96, 165, 250, 0.95),
                /* sky-400 */ rgba(244, 114, 182, 0.95)
              );
              background-size: 220% 220%;
              animation: chipGradient 8s ease-in-out infinite;
              box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
            }
          `}</style>

          <div
            className={`${kumbhSans.className} !italic mt-4 text-sm font-semibold text-gray-900`}
          >
            Memora Team
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.8 6C5.7 6 4 7.7 4 9.8c0 1.8 1.2 3.3 2.9 3.7-.2 2-1.4 3.7-2.9 4.7.6.5 1.3.8 2.1.8 2.1 0 3.8-1.7 3.8-3.8V9.8C9.9 7.7 8.2 6 6.1 6h1.7zM16.8 6c-2.1 0-3.8 1.7-3.8 3.8v5.4c0 2.1 1.7 3.8 3.8 3.8.8 0 1.5-.3 2.1-.8-1.5-1-2.7-2.7-2.9-4.7 1.7-.4 2.9-1.9 2.9-3.7C19 7.7 17.3 6 15.2 6h1.6z" />
    </svg>
  );
}
