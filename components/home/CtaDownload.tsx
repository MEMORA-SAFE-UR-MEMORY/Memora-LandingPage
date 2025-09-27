import Image from "next/image";
import { gravitasOne, kumbhSans } from "@/fonts/font";
import Phone4 from "@/public/images/ip4.svg";
import AppStore from "@/public/icons/download.svg";
import CornerGlowFrame from "../animations/CornerGlowFrame";

export default function CtaDownload() {
  return (
    <section className="relative pt-2 lg:pt-10 pb-10 lg:pb-18">
      {/* edge glows ngoài card */}
      <span className="pointer-events-none absolute -z-10 left-[6%] -top-6 h-[320px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      <span className="pointer-events-none absolute -z-10 right-[6%] top-10 h-[300px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(92vw,1100px)]">
        <CornerGlowFrame
          size={600}
          blur={50}
          speed={9}
          opacity={20}
          offset={-70}
          colors={["#fa72b6", "#A78BFA", "#06b6d4", "#22c55e", "#facc15"]}
        >
          {/* CARD */}
          <div className="relative overflow-hidden rounded-2xl bg-black text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {/* glow đỏ bên trong card (dưới cụm phone) */}
            <span className="absolute -z-0 right-8 bottom-0 w-[520px] h-[260px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

            {/* corner rings (clip bởi overflow-hidden) */}
            {/* bottom-left */}
            <div className="pointer-events-none absolute -left-20 -bottom-32 w-[520px] h-[520px] rotate-[-18deg]">
              <i className="absolute inset-0 rounded-full border border-white/25" />
              <i className="absolute inset-6 rounded-full border border-white/25" />
              <i className="absolute inset-12 rounded-full border border-white/25" />
            </div>
            {/* top-right */}
            <div className="pointer-events-none absolute -right-20 -top-40 w-[500px] h-[500px] rotate-[18deg]">
              <i className="absolute inset-0 rounded-full border border-white/25" />
              <i className="absolute inset-5 rounded-full border border-white/25" />
              <i className="absolute inset-10 rounded-full border border-white/25" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-5 p-6 lg:p-8 items-center">
              {/* LEFT PHONES */}
              <div className="relative h-[260px] sm:h-[320px] lg:h-[360px]">
                {/* phone sau (phải) */}
                <span
                  className="pointer-events-none absolute z-0 left-1/2 bottom-2 -translate-x-1/2
                           w-[720px] h-[220px] rounded-full blur-[110px] opacity-90 mix-blend-multiply
                           bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]"
                />
                <Image
                  src={Phone4}
                  alt="phone"
                  priority
                  className="
                    absolute z-10 top-[75%] rotate-[-6deg]
                    w-[180px]
                    transform-gpu origin-bottom-left
                    scale-[2.8] sm:scale-[2.9] lg:scale-[3]
                    drop-shadow-2xl opacity-90"
                />
              </div>
              {/* RIGHT COPY */}
              <div className="relative z-10">
                <h2
                  className={`${gravitasOne.className} text-3xl sm:text-4xl lg:text-[40px] leading-tight`}
                >
                  Ready To Get Started?
                </h2>
                <p
                  className={`${kumbhSans.className} mt-3 text-white/70 max-w-[42ch]`}
                >
                  Keep trips, milestones, and everyday moments in one calm,
                  private space. Organize by people & places, and let the right
                  memories resurface when it matters.
                </p>

                <button>
                  <Image
                    src={AppStore}
                    alt="download"
                    width={200}
                    height={200}
                    className="mt-4"
                  />
                </button>
              </div>
            </div>
          </div>
        </CornerGlowFrame>
      </div>
    </section>
  );
}
