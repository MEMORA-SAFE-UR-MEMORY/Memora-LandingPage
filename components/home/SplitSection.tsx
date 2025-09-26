"use client";

import Image from "next/image";
import Phone1 from "../../public/images/ip1.svg";
import AppStore from "../../public/icons/AppStore.svg";
import StarSvg from "../../public/icons/star.svg";
import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";
import StarField from "../animations/StarField";

export default function SplitSection() {
  return (
    <section className="relative pb-10 lg:pb-14">
      <span className="pointer-events-none absolute -z-10 left-1/2 top-4 -translate-x-1/2 w-[900px] h-[380px] rounded-full blur-[120px] opacity-90 mix-blend-multiply  bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]" />

      <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="relative h-[520px]">
          {/* vòng tròn outline */}
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
          <div className="absolute left-12 -top-6 w-[400px] h-[400px] rounded-full border-[2px] border-white" />
          <div className="absolute left-20 top-4 w-[400px] h-[400px] rounded-full border-[2px] border-white" />
          <div className="absolute left-28 top-10 w-[400px] h-[400px] rounded-full border-[2px] border-white" />

          {/* vệt đỏ loang dưới điện thoại */}
          {/* <span className="absolute left-16 bottom-10 -z-10 w-[400px] h-[220px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" /> */}

          <Image
            src={Phone1}
            alt="phone-mockup"
            width={520}
            height={1040}
            priority
            className="absolute left-2 top-0 rotate-6 drop-shadow-2xl
                       w-[360px] sm:w-[440px] lg:w-[520px] xl:w-[560px] 2xl:w-[620px] h-auto
                       scale-[1.2] lg:scale-[1.4] 
                       transition-all"
          />
        </div>
        {/* RIGHT */}
        <div className="relative">
          <h1
            className={`${gravitasOne.className} relative z-10 font-extrabold text-[42px] sm:text-[56px] leading-[1.05] tracking-tight text-white`}
          >
            Your{" "}
            <span className="relative inline-block">
              Memory Room
              {/* pink glow behind the key phrase */}
              <span
                aria-hidden
                className="pointer-events-none absolute -z-10 left-2/3 -translate-x-1/2 -top-6
             h-[180px] w-[420px] rounded-full blur-[64px] opacity-100 mix-blend-screen
          bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]
"
              />
            </span>
          </h1>

          <p
            className={`${poiretOne.className} mt-4 text-[22px] text-white max-w-xl relative z-10`}
          >
            Capture moments, pin feelings, and organize memories by albums,
            people, and places. Sync safely across devices with a privacy-first
            design—turn every photo into a story inside your own room.
          </p>

          {/* ribbon + ticket nghiêng dưới */}
          <div className="mt-5 relative h-28">
            <h3
              className={`${kumbhSans.className} relative font-extrabold text-[30px] leading-[1.05] tracking-tight text-white`}
            >
              DOWNLOAD APP NOW
            </h3>
            <Image
              src={AppStore}
              alt="download"
              width={200}
              height={200}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
