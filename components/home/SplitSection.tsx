"use client";

import Image from "next/image";
import Phone1 from "../../public/images/ip1.svg";
import StarSvg from "../../public/icons/star.svg";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gotu, taviraj } from "@/fonts/font";
import StarField from "../animations/StarField";

export default function SplitSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scope selectors to this section only
    let removeHover: (() => void) | undefined;
    const ctx = gsap.context(() => {
      // Ensure phone is hidden initially so it only appears after text
      gsap.set(phoneRef.current, { autoAlpha: 0, x: -120, y: 30, rotate: -8 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Glow blob
      tl.from(".glow-blob", { scale: 0.9, opacity: 0.2, duration: 0.8 }, 0);

      // Headline + paragraph
      tl.from(
        [".headline"],
        { y: 24, opacity: 0, filter: "blur(6px)", duration: 0.6 },
        0.15
      ).from([".para"], { y: 18, opacity: 0, duration: 0.55 }, "-=0.25");

      // Phone reveal AFTER text finishes
      tl.to(
        phoneRef.current,
        {
          x: 0,
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.1,
        },
        ">+0.1"
      );

      // Rings pop slightly after phone starts
      tl.from(
        ".ring-outline",
        {
          scale: 0.85,
          opacity: 0,
          rotate: "+=10",
          duration: 0.7,
          stagger: 0.08,
        },
        "<+0.05"
      );

      // Subtle floating effect after reveal
      tl.add(() => {
        if (phoneRef.current) {
          gsap.to(phoneRef.current, {
            y: "+=10",
            rotate: "+=1.5",
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });

      // Hover interaction for headline
      const el = headlineRef.current;
      if (el) {
        const onEnter = () => {
          gsap.to(el, {
            y: -4,
            scale: 1.02,
            letterSpacing: "0.02em",
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(".keyphrase", {
            textShadow: "0 0 16px rgba(255,90,78,0.65)",
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(".glow-blob", { opacity: 1, scale: 1.05, duration: 0.45 });
        };
        const onLeave = () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            letterSpacing: "0em",
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(".keyphrase", {
            color: "#ffffff",
            textShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(".glow-blob", { opacity: 0.9, scale: 1, duration: 0.45 });
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        removeHover = () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      removeHover?.();
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative pb-10 lg:pb-14">
      <span className="glow-blob pointer-events-none absolute -z-10 left-1/2 top-4 -translate-x-1/2 w-[900px] h-[380px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]" />

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
          <div className="ring-outline absolute top-[-6px] h-[420px] w-[540px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="ring-outline absolute top-[26px]  h-[420px] w-[540px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="ring-outline absolute top-[58px] h-[420px] w-[540px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />

          {/* vệt đỏ loang dưới điện thoại */}
          {/* <span className="absolute left-16 bottom-10 -z-10 w-[400px] h-[220px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" /> */}

          <div
            ref={phoneRef}
            className="absolute left-2 top-0 drop-shadow-2xl will-change-transform transform-gpu"
          >
            <Image
              src={Phone1}
              alt="phone-mockup"
              width={520}
              height={1040}
              priority
              className="
                       w-[400px] sm:w-[440px] lg:w-[520px] xl:w-[560px] 2xl:w-[620px] h-auto
                       scale-[1.3] lg:scale-[1.4] 
                       transition-all"
            />
          </div>
        </div>
        {/* RIGHT */}
        <div className="relative mx-4">
          <h1
            className={`${taviraj.className} relative z-10 font-extrabold text-[60px] sm:text-[64px] leading-[1.2] tracking-tight text-white`}
          >
            <span className="headline will-change-transform" ref={headlineRef}>
              Căn phòng{" "}
              <span className="keyphrase relative inline-block">
                Ký ức của bạn
                {/* pink glow behind the key phrase */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -z-10 left-2/3 -translate-x-1/2 -top-6
             h-[180px] w-[420px] rounded-full blur-[64px] opacity-100 mix-blend-screen
          bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]"
                />
              </span>
            </span>
          </h1>

          <p
            className={`${gotu.className} mt-4 text-[18px] text-black max-w-xl relative z-10`}
          >
            <span className="para">
              Ghi lại khoảnh khắc, ghim cảm xúc và sắp xếp kỷ niệm theo album,
              con người và địa điểm. Đồng bộ an toàn trên mọi thiết bị với thiết
              kế ưu tiên quyền riêng tư—biến mỗi bức ảnh thành một câu chuyện
              trong căn phòng của riêng bạn
            </span>
          </p>

          {/* ribbon + ticket nghiêng dưới */}
          {/* <div className="mt-5 relative h-28">
            <h3
              className={`${montserrat.className} relative font-regular text-[30px] leading-[1.05] tracking-tight text-white`}
            >
              TẢI APP NGAY
            </h3>
            <Image
              src={AppStore}
              alt="download"
              width={200}
              height={200}
              className="mt-4"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
