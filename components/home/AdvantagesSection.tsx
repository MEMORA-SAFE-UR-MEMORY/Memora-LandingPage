import Image from "next/image";
import Phone3 from "@/public/images/ip3.svg";
import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";
import StarField from "../animations/StarField";
import StarSvg from "@/public/icons/star.svg";

export default function AdvantagesSection() {
  return (
    <section className="relative pt-10 lg:pt-18 pb-12 lg:pb-20 overflow-hidden">
      {/* edge glows */}
      <span className="pointer-events-none absolute left-[-100px] top-[280px] -z-10 h-[200px] w-[500px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffd4b8_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      <span className="pointer-events-none absolute right-[-60px] top-[320px] -z-10 h-[250px] w-[500px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(92vw,1100px)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT: phone + rings + glow + floating card */}
        <div className="relative h-[560px] sm:h-[620px]">
          {/* concentric ellipse rings */}
          <div className="absolute right-6 top-[-6px] h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="absolute right-0 top-[26px]  h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="absolute right-[-40px] top-[58px] h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />

          {/* warm glow */}
          <span className="absolute right-24 top-28 -z-10 w-[420px] h-[260px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffd4b8_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
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
          {/* phone */}
          <Image
            src={Phone3}
            alt="phone"
            priority
            className="
    absolute -top-10 drop-shadow-2xl h-auto
    w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[460px]
    origin-top-right transform-gpu transition-transform
    scale-[0.7] sm:scale-[0.8] lg:scale-[0.9] xl:scale-[1]
  "
          />

          {/* floating payment card */}
          <div
            className="
    absolute right-5 top-[120px]
    px-4 py-3 flex items-center gap-3
    rounded-xl
    bg-white/25
    backdrop-blur-xl
    border border-white/50
    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
    supports-[backdrop-filter]:bg-white/20"
          >
            <div>
              <div
                className={`${kumbhSans.className} text-[11px] !italic text-gray-800 -mt-0.5`}
              >
                From Team Memora
              </div>
              <div
                className={`${poiretOne.className} text-md font-bold text-black`}
              >
                <b>What you lived should last.</b>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: copy */}
        <div className="max-w-xl">
          <p
            className={`${kumbhSans.className} uppercase tracking-[0.25em] text-lg text-rose-500 mb-2`}
          >
            Advantages
          </p>
          <h2
            className={`${gravitasOne.className} text-5xl sm:text-6xl leading-tight text-white mb-4`}
          >
            Why Choose Memora?
          </h2>

          <p
            className={`${poiretOne.className} text-gray-900 text-xl leading-relaxed`}
          >
            Memora is your <b>digital room</b> for every moment—photos, notes,
            and feelings. It <b>auto-organizes by date, people, and places</b>,
            then gently resurfaces memories on anniversaries, <i>On this day</i>
            , or even on rainy days you once loved. You decide who can see what,
            and when; <b>privacy comes first</b>. So the little things don’t get
            left behind.
          </p>
        </div>
      </div>
    </section>
  );
}
