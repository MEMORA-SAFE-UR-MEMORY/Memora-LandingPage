"use client";

import Image from "next/image";
import Qr from "@/public/images/Qr.png";
import Nokia from "@/public/images/Nokia.png";
import { gotu, montserrat, taviraj } from "@/fonts/font";
import StarField from "../animations/StarField";
import StarSvg from "../../public/icons/star.svg";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function QRSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // prepare initial states
      gsap.set(phoneRef.current, {
        autoAlpha: 0,
        y: 50,
        rotate: -6,
        scale: 1.1,
      });
      gsap.set(cardRef.current, { autoAlpha: 0, y: 20, scale: 0.92 });

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

      // phone and QR card
      tl.to(
        phoneRef.current,
        { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 1.0 },
        ">-0.05"
      )
        .from(
          ".qr-ring",
          {
            scale: 0.85,
            opacity: 0,
            rotate: "+=8",
            duration: 0.6,
            stagger: 0.08,
          },
          "<+0.05"
        )
        .to(
          cardRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.6)",
          },
          "<+0.1"
        );

      // scan bar loop when in view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        onEnter: () => {
          if (scanRef.current) {
            gsap.fromTo(
              scanRef.current,
              { y: -60, opacity: 0.0 },
              {
                y: 60,
                opacity: 0.6,
                duration: 1.2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
              }
            );
          }
        },
        onLeave: () => {
          if (scanRef.current) gsap.killTweensOf(scanRef.current);
        },
        onEnterBack: () => {
          if (scanRef.current) {
            gsap.fromTo(
              scanRef.current,
              { y: -60, opacity: 0.0 },
              {
                y: 60,
                opacity: 0.6,
                duration: 1.2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
              }
            );
          }
        },
        onLeaveBack: () => {
          if (scanRef.current) gsap.killTweensOf(scanRef.current);
        },
      });

      // tiny float on card
      tl.add(() => {
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            y: "+=6",
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="qr" ref={sectionRef} className="relative overflow-hidden">
      {/* edge glows to match other sections */}
      <span className="pointer-events-none absolute left-[-80px] top-[220px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      <span className="pointer-events-none absolute right-[-60px] bottom-[160px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(92vw,1100px)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
            Quét mã QR bằng điện thoại để tải{" "}
            <span className="font-bold">APK Memora</span> ngay. Chúng tôi đảm
            bảo an toàn và bảo mật cho bạn.
          </p>
        </div>

        {/* RIGHT: phone + QR card */}
        <div className="relative h-[460px] sm:h-[520px] lg:h-[560px]">
          {/* concentric ellipse rings for consistency */}
          <div className="qr-ring absolute right-6 top-[24px] h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="qr-ring absolute right-0 top-[52px]  h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="qr-ring absolute right-[-40px] top-[80px] h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />

          {/* warm glow */}
          <span className="absolute right-20 top-60 -z-10 w-[200px] h-[120px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffd4b8_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

          {/* phone image */}
          {/* <div
            ref={phoneRef}
            className="absolute top-[16%] right-4 sm:right-10 will-change-transform transform-gpu"
          >
            <Image
              src={Nokia}
              alt="Memora on phone"
              priority
              className="drop-shadow-2xl h-auto w-[280px] sm:w-[340px] lg:w-[380px] origin-top-right transition-transform"
            />
          </div> */}

          {/* QR card */}
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
          <div
            ref={cardRef}
            className="
								absolute left-0 sm:left-4 lg:left-8 bottom-60 sm:bottom-66
							p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
							flex items-center gap-3 sm:gap-4
						"
          >
            <div className="relative h-[84px] w-[84px] sm:h-[96px] sm:w-[96px] overflow-hidden rounded-xl ">
              <Image
                src={Qr}
                alt="QR Memora"
                className="h-full w-full object-contain"
              />
              {/* scanning bar */}
              <div
                ref={scanRef}
                className="pointer-events-none absolute left-1 right-1 top-0 h-[12px] rounded-[6px] bg-gradient-to-b from-transparent via-rose-300/70 to-transparent opacity-0"
              />
            </div>
            <div>
              <div
                className={`${montserrat.className} uppercase tracking-[0.18em] text-xs text-gray-700`}
              >
                Quét mã để mở
              </div>
              <div
                className={`${taviraj.className} text-xl font-bold text-black leading-tight`}
              >
                Memora
              </div>
              <p className={`${gotu.className} text-gray-700 text-sm`}>
                Tải ứng dụng hoặc đăng nhập nhanh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
