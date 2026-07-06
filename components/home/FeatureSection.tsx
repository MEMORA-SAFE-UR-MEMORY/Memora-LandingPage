"use client";

import Image from "next/image";
import Phone2 from "@/public/images/ip2.svg";
import StarSvg from "@/public/icons/star.svg";
import { gotu, montserrat, taviraj } from "@/fonts/font";
import StarField from "../animations/StarField";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // prepare states
      gsap.set(phoneRef.current, {
        autoAlpha: 0,
        y: 40,
        scale: 1.3,
        rotate: -6,
      });

      const tl = gsap.timeline({
        // chậm rãi, mượt hơn
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // text stack reveal (chậm hơn và từng phần một)
      tl.from(".f-kicker", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          ".f-word",
          {
            y: 30,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.7,
            stagger: 0.15,
          },
          0.05
        )
        // shimmer gradient chạy ngang chữ sau khi hiện
        .to(
          ".f-word",
          {
            backgroundPosition: "100% 0%",
            duration: 1.2,
            ease: "none",
            stagger: 0.15,
          },
          "<"
        )
        .from(
          ".feature-row",
          { x: -26, opacity: 0, duration: 0.55, stagger: 0.2 },
          0.15
        );

      // phone + rings come after
      tl.to(
        phoneRef.current,
        { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.2 },
        ">-0.05"
      ).from(
        ".f-ring",
        {
          scale: 0.85,
          opacity: 0,
          rotate: "+=8",
          duration: 0.7,
          stagger: 0.1,
        },
        "<+0.05"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      id="feature"
      ref={sectionRef}
      className="max-w-auto relative pt-6 lg:pt-14 pb-10 lg:pb-18 overflow-hidden overflow-x-hidden"
    >
      {/* edge glows like the reference */}
      <span className="pointer-events-none absolute left-[-80px] top-70 -z-10 h-[300px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      {/* <span className="pointer-events-none absolute right-[-80px] bottom-[-40px] -z-10 h-[300px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" /> */}

      <div className="mx-auto w-[min(92vw,1120px)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* RIGHT: copy + list */}
        <div>
          <p
            className={`f-kicker ${montserrat.className} uppercase tracking-[0.25em] text-lg text-black mb-4`}
          >
            Tính năng
          </p>
          <h2
            ref={headingRef}
            className={`${taviraj.className} text-6xl sm:text-7xl font-bold leading-tight text-white mb-6`}
          >
            <span
              className="f-word bg-clip-text text-transparent bg-white bg-[length:200%_100%]"
              style={{ backgroundPosition: "0% 0%" }}
            >
              Chế độ
            </span>
            <br />
            <span
              className="f-word bg-clip-text text-transparent bg-white  bg-[length:200%_100%]"
              style={{ backgroundPosition: "0% 0%" }}
            >
              Khám phá
            </span>
          </h2>

          <div className={`${gotu.className} space-y-8`}>
            <FeatureRow
              icon={<CompassIcon />}
              title="Khám phá Phòng Ký Ức"
              desc="Khám phá các căn phòng được công khai từ mọi người. Tìm cảm hứng từ những chuyến đi, cột mốc và khoảnh khắc đời thường — được sắp xếp đẹp mắt."
            />
            <FeatureRow
              icon={<EyeIcon />}
              title="Xem & Cảm nhận"
              desc="Ghé ngang các phòng công khai, chiêm ngưỡng những phòng bạn yêu thích để thấy được ý nghĩa sâu sắc."
            />
            <FeatureRow
              icon={<ShieldIcon />}
              title="Riêng tư theo ý bạn"
              desc="Chọn chế độ có thể khám phá phòng của bạn: riêng tư hoặc công khai. Chia sẻ một liên kết, thu hồi bất cứ lúc nào — kỷ niệm luôn nằm trong tầm kiểm soát của bạn."
            />
          </div>
        </div>

        <div className="relative h-[620px] sm:h-[700px]">
          {/* concentric ellipse rings */}
          <div className="f-ring absolute top-20 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg]" />
          <div className="f-ring absolute left-8 top-26 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-6" />
          <div className="f-ring absolute left-14 top-32 h-[420px] w-[520px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[-8deg] translate-x-12" />

          {/* red glow behind the phone */}
          <span className="absolute left-20 top-40 -z-10 w-[420px] h-[260px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
          <StarField
            src={StarSvg}
            count={12}
            seed={42}
            className="-z-10"
            minSize={12}
            maxSize={32}
            minDur={10}
            maxDur={18}
          />
          {/* the phone */}
          <div
            ref={phoneRef}
            className="absolute top-[18%] left-0 will-change-transform transform-gpu"
          >
            <Image
              src={Phone2}
              alt="phone"
              priority
              className="drop-shadow-2xl h-auto  w-[360px] sm:w-[380px] lg:w-[420px] xl:w-[460px] origin-top-left transition-transform  scale-[1.25] sm:scale-[1.3] lg:scale-[1.4] xl:scale-[1.5]"
            />
          </div>
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
    <div className="feature-row flex items-start gap-4">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-rose-200">
        {icon}
      </div>
      <div>
        <h4 className="!font-black text-black text-[20px]">{title}</h4>
        <p
          className={`${gotu.className} text-gray-700 mt-1 text-[16px] leading-relaxed`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
