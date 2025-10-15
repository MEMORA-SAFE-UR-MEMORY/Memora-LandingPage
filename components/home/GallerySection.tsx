"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gotu, kumbhSans, montserrat, taviraj } from "@/fonts/font";

type Feedback = {
  quote: string;
  name: string;
  title: string;
  rating: number; // 1..5
};

type CSSVars = React.CSSProperties & {
  ["--duration"]?: string;
};

const FEEDBACKS: Feedback[] = [
  {
    quote:
      "Memora giúp tôi sống lại những khoảnh khắc nhỏ tôi có thể đã quên. Những lời nhắc vào ngày mưa là tôi thích nhất.",
    name: "An Nguyen",
    title: "Nhà sáng tạo du lịch",
    rating: 4,
  },
  {
    quote:
      "Tôi thích cách các phòng giữ ảnh và ghi chú cùng nhau. Nó giống như một nơi ấm áp cho ký ức của tôi.",
    name: "Chau Le",
    title: "Nhà thiết kế",
    rating: 5,
  },
  {
    quote:
      "Đơn giản, riêng tư và được sắp xếp đẹp. Giờ tìm lại một kỷ niệm chỉ mất vài giây.",
    name: "Thao Nguyen",
    title: "Nhiếp ảnh gia",
    rating: 5,
  },
  {
    quote:
      "Tính năng ‘Vào ngày này’ thật hoàn hảo. Nó mang lại đúng khoảnh khắc vào đúng thời điểm.",
    name: "Mai Tran",
    title: "Người viết nhật ký",
    rating: 4,
  },
  {
    quote:
      "Tôi chia sẻ một phòng công khai với bạn bè — mọi người đều có thể thả cảm xúc và thêm ghi chú. Rất ấm áp.",
    name: "Duy Anh",
    title: "Trưởng cộng đồng",
    rating: 5,
  },
  {
    quote:
      "Các điều khiển quyền riêng tư của Memora rõ ràng và đáng tin. Tôi quyết định ai được thấy điều gì.",
    name: "Mai Anh",
    title: "Quản lý sản phẩm",
    rating: 5,
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
  duration = 30,
  reverse = false,
  cardWidthClass = "w-[88vw] sm:w-[70vw] md:w-[56vw] lg:w-[44vw] xl:w-[38vw]",
  innerGapClass = "gap-6 sm:gap-8 lg:gap-9",
}: {
  items: Feedback[];
  duration?: number;
  reverse?: boolean;
  cardWidthClass?: string;
  innerGapClass?: string;
}) {
  return (
    <div className="relative overflow-x-hidden overflow-y-visible py-1">
      <div
        className="marquee-track flex w-max"
        style={
          {
            "--duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as CSSVars
        }
      >
        {/* SET 1 */}
        <div className={`flex ${innerGapClass} pr-2 sm:pr-4 lg:pr-5`}>
          {items.map((fb, idx) => (
            <Card
              key={`set1-${idx}`}
              className={`group flex-none ${cardWidthClass} bg-[#0d0d0d] border-transparent rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardContent className="px-4 sm:px-6">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <RatingStars rating={fb.rating} />
                  <Quote className="w-5 h-5 text-black" />
                </div>
                <p
                  className={`${gotu.className} text-black text-base sm:text-md leading-6 sm:leading-7`}
                >
                  “{fb.quote}”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-300/90 via-fuchsia-300/85 to-sky-300/90 ring-1 ring-white/30 shadow-md flex items-center justify-center text-white text-[11px] font-semibold backdrop-blur">
                    {getInitials(fb.name)}
                  </div>
                  <div className="leading-tight">
                    <div
                      className={`${kumbhSans.className} text-black/90 !font-extrabold text-sm sm:text-base`}
                    >
                      {fb.name}
                    </div>
                    <div
                      className={`${gotu.className} text-black/50 text-xxs sm:text-xs`}
                    >
                      {fb.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SET 2 (duplicate, aria-hidden) */}
        <div
          className={`flex ${innerGapClass} pl-4 sm:pl-6 lg:pl-7`}
          aria-hidden
        >
          {items.map((fb, idx) => (
            <Card
              key={`set2-${idx}`}
              className={`group flex-none ${cardWidthClass} bg-[#0d0d0d] border-transparent rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardContent className="px-4 sm:px-6">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <RatingStars rating={fb.rating} />
                  <Quote className="w-5 h-5 text-black" />
                </div>
                <p
                  className={`${gotu.className} text-black text-base sm:text-md leading-6 sm:leading-7`}
                >
                  “{fb.quote}”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-400/90 via-fuchsia-400/85 to-sky-400/90 ring-1 ring-white/30 shadow-md flex items-center justify-center text-white text-[11px] font-semibold backdrop-blur">
                    {getInitials(fb.name)}
                  </div>
                  <div className="leading-tight">
                    <div
                      className={`${kumbhSans.className} text-black/90 !font-extrabold text-sm sm:text-base`}
                    >
                      {fb.name}
                    </div>
                    <div
                      className={`${gotu.className} text-black/50 text-xxs sm:text-xs`}
                    >
                      {fb.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CSS: track dịch -50% của chính nó (2 set cùng width) → seamless */}
      <style jsx global>{`
        .marquee-track {
          will-change: transform;
          animation: marquee-x var(--duration, 30s) linear infinite;
        }
        @keyframes marquee-x {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

export const GallerySection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col pt-4 lg:pt-12 pb-10 lg:pb-18 items-center w-full gap-2 sm:gap-6 lg:gap-14">
      {/* Heading */}
      <div className="flex flex-col w-full max-w-[92vw] lg:max-w-[1100px] items-center gap-3 sm:gap-5">
        <p
          className={`${montserrat.className} uppercase tracking-[0.25em] text-xl text-rose-500`}
        >
          Cảm nhận
        </p>

        <h1
          className={`${taviraj.className}
        relative z-10 tracking-normal
        text-[80px] font-bold text-white
        drop-shadow-[0_8px_24px_rgba(255,255,255,0.28)]
        text-center
      `}
        >
          NGƯỜI DÙNG NÓI GÌ
          {/* Halo 1 */}
          <span
            aria-hidden
            className="pointer-events-none absolute -z-10 -inset-x-16 -inset-y-10
                   rounded-[120px] blur-[70px] opacity-85
                   bg-[radial-gradient(65%_65%_at_50%_45%,#ffd6f6_0%,#f0abfc_34%,#c4b5fd_58%,#93c5fd_78%,transparent_86%)]"
          />
          {/* Halo 2 */}
          <span
            aria-hidden
            className="pointer-events-none absolute -z-10 -inset-x-24 -inset-y-16
                   blur-[110px] opacity-75 mix-blend-screen
                   bg-[conic-gradient(from_200deg_at_50%_50%,#f0abfc_0deg,#93c5fd_120deg,#fbcfe8_240deg,#f0abfc_360deg)]"
          />
          <p
            className={`${gotu.className} text-center text-black/70 mt-1 sm:mt-2
                  !text-xl sm:text-base leading-4 sm:leading-5 max-w-[100ch]`}
          >
            Câu chuyện thật từ những người đã tạo “phòng” cho ký ức của họ.
            Riêng tư, dịu dàng và luôn hiện diện khi cần.
          </p>
        </h1>
      </div>

      {/* Rows */}
      <div className="w-full overflow-x-hidden overflow-y-visible py-2 sm:py-4">
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          {/* Row 1 */}
          <FeedbackRow
            items={FEEDBACKS}
            duration={30}
            cardWidthClass="w-[88vw] sm:w-[70vw] md:w-[56vw] lg:w-[44vw] xl:w-[38vw]"
          />
          {/* Row 2 */}
          <FeedbackRow
            items={FEEDBACKS}
            duration={40}
            reverse
            cardWidthClass="w-[88vw] sm:w-[68vw] md:w-[54vw] lg:w-[42vw] xl:w-[36vw]"
          />
        </div>
      </div>
    </section>
  );
};
