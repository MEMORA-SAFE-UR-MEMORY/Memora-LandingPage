"use client";

import Image from "next/image";
import Phone2 from "@/public/images/ip2.svg";
import StarSvg from "@/public/icons/star.svg";
import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";
import StarField from "../animations/StarField";

export default function FeatureSection() {
  return (
    <section className="relative pt-6 lg:pt-14 pb-10 lg:pb-18 overflow-hidden overflow-x-hidden">
      {/* edge glows like the reference */}
      <span className="pointer-events-none absolute left-[-80px] top-70 -z-10 h-[300px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      {/* <span className="pointer-events-none absolute right-[-80px] bottom-[-40px] -z-10 h-[300px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" /> */}

      <div className="mx-auto w-[min(92vw,1120px)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* RIGHT: copy + list */}
        <div>
          <p
            className={`${kumbhSans.className} uppercase tracking-[0.25em] text-lg text-black mb-1`}
          >
            Features
          </p>
          <h2
            className={`${gravitasOne.className} text-4xl sm:text-5xl leading-tight text-white mb-6`}
          >
            DISCOVERY MODE
          </h2>

          <div className={`${poiretOne.className} space-y-8`}>
            <FeatureRow
              icon={<CompassIcon />}
              title="Explore Memory Rooms"
              desc="Browse curated Memory Rooms from creators and friends. Find inspiration from trips, milestones, and everyday moments—beautifully organized."
            />
            <FeatureRow
              icon={<EyeIcon />}
              title="View & Interact"
              desc="Peek into public rooms, react with heart. Follow rooms you love to see new drops in your feed."
            />
            <FeatureRow
              icon={<ShieldIcon />}
              title="Privacy, Your Way"
              desc="Choose who can discover your room: private, friends, or public. Share one link, revoke anytime—your memories stay in your control."
            />
          </div>
        </div>

        <div className="relative h-[560px] sm:h-[600px]">
          {/* concentric ellipse rings */}
          <div className="absolute top-20 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg]" />
          <div className="absolute left-8 top-26 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-6" />
          <div className="absolute left-14 top-32 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-12" />

          {/* red glow behind the phone */}
          <span className="absolute left-20 top-40 -z-10 w-[420px] h-[260px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
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
          {/* the phone */}
          <Image
            src={Phone2}
            alt="phone"
            priority
            className="
    absolute top-[25%] drop-shadow-2xl h-auto
    w-[360px] sm:w-[380px] lg:w-[420px] xl:w-[460px]
    origin-top-left transform-gpu transition-transform
    scale-[1.25] sm:scale-[1.3] lg:scale-[1.4] xl:scale-[1.5]
  "
          />
        </div>
      </div>
    </section>
  );
}

/* --- small red outline icons to match the look --- */
function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-rose-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v6M12 22v-6M2 12h6M22 12h-6M5 5l4.2 4.2M19 19l-4.2-4.2M5 19l4.2-4.2M19 5l-4.2 4.2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-rose-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l9 5-9 5-9-5 9-5Z" />
      <path d="M21 7v10l-9 5-9-5V7" />
      <path d="M12 12v10" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-rose-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4l3-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-rose-200">
        {icon}
      </div>
      <div>
        <h4 className="!font-black text-black text-[20px]">{title}</h4>
        <p
          className={`${kumbhSans.className} text-gray-700 mt-1 text-[18px] leading-relaxed`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
