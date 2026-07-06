"use client";

import { gotu, montserrat, taviraj } from "@/fonts/font";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function QRSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // left copy
      tl.from(".qr-kicker", { y: 16, opacity: 0, duration: 0.5 }, 0)
        .from(
          ".qr-word",
          {
            y: 26,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.65,
            stagger: 0.15,
          },
          0.05
        )
        .to(
          ".qr-word",
          {
            backgroundPosition: "100% 0%",
            duration: 1.1,
            ease: "none",
            stagger: 0.15,
          },
          "<"
        )
        .from(".qr-para", { y: 16, opacity: 0, duration: 0.5 }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="qr" ref={sectionRef} className="relative overflow-hidden">
      {/* edge glows to match other sections */}
      <span className="pointer-events-none absolute left-[-80px] top-[220px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      <span className="pointer-events-none absolute right-[-60px] bottom-[160px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(92vw,1100px)]">
        {/* LEFT: title + subtitle */}
        <div className="max-w-xl order-1 lg:order-none">
          <p
            className={`qr-kicker ${montserrat.className} uppercase tracking-[0.25em] text-lg text-red-600 mb-2`}
          >
            Trải nghiệm
          </p>
          <h2
            className={`${taviraj.className} text-6xl sm:text-7xl font-bold text-white mb-6`}
          >
            <span
              className="qr-word bg-clip-text text-transparent bg-white bg-[length:150%_100%]"
              style={{ backgroundPosition: "0% 0%" }}
            >
              Trải nghiệm
            </span>{" "}
            <span
              className="qr-word bg-clip-text text-transparent bg-white bg-[length:150%_100%]"
              style={{ backgroundPosition: "0% 0%" }}
            >
              app ngay
            </span>
          </h2>
          <p
            className={`qr-para ${gotu.className} text-gray-900 text-lg leading-relaxed`}
          >
            App <span className="font-bold">Memora</span> đã phát hành trên CH Play.{" "}
            <a
              href="https://play.google.com/store/apps/details?id=com.anhtdse184525.Memora&hl=vi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-rose-600 underline underline-offset-2 hover:text-rose-700 transition-colors"
            >
              Tải ngay trên Google Play →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
