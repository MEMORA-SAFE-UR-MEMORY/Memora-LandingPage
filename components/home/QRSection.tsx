import Image from "next/image";
import Qr from "@/public/images/Qr.png";
import Nokia from "@/public/images/Nokia.png";
import { gotu, montserrat, taviraj } from "@/fonts/font";
import StarField from "../animations/StarField";
import StarSvg from "../../public/icons/star.svg";

export default function QRSection() {
  return (
    <section
      id="qr"
      className="relative pt-2 lg:pt-4 pb-2 lg:pb-4 overflow-hidden"
    >
      {/* edge glows to match other sections */}
      <span className="pointer-events-none absolute left-[-80px] top-[220px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_40%_40%,#ffc3b0_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />
      <span className="pointer-events-none absolute right-[-60px] bottom-[160px] -z-10 h-[200px] w-[520px] rounded-full blur-[120px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_60%_60%,#ffe7b0_0%,#ff5a4e_38%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

      <div className="mx-auto w-[min(92vw,1100px)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: title + subtitle */}
        <div className="max-w-xl order-1 lg:order-none">
          <p
            className={`${montserrat.className} uppercase tracking-[0.25em] text-lg text-red-600 mb-2`}
          >
            Trải nghiệm
          </p>
          <h2
            className={`${taviraj.className} text-6xl sm:text-7xl font-bold text-white mb-6`}
          >
            Trải nghiệm App ngay
          </h2>
          <p
            className={`${gotu.className} text-gray-900 text-lg leading-relaxed`}
          >
            Quét mã QR bằng điện thoại để tải{" "}
            <span className="font-bold">APK Memora</span> ngay. Chúng tôi đảm
            bảo an toàn và bảo mật cho bạn.
          </p>
        </div>

        {/* RIGHT: phone + QR card */}
        <div className="relative h-[460px] sm:h-[520px] lg:h-[560px]">
          {/* concentric ellipse rings for consistency */}
          <div className="absolute right-6 top-[24px] h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="absolute right-0 top-[52px]  h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />
          <div className="absolute right-[-40px] top-[80px] h-[380px] w-[480px] rounded-[50%_45%_45%_50%/50%] border border-white rotate-[8deg]" />

          {/* warm glow */}
          <span className="absolute right-20 top-60 -z-10 w-[200px] h-[120px] rounded-full blur-[110px] opacity-90 mix-blend-multiply bg-[radial-gradient(60%_60%_at_50%_40%,#ffd4b8_0%,#ff5a4e_40%,rgba(255,90,78,0.28)_66%,transparent_80%)]" />

          {/* phone image */}
          {/* <Image
            src={Nokia}
            alt="Memora on phone"
            priority
            className="
							absolute top-[14%] left- drop-shadow-2xl h-auto
							w-[400px] sm:w-[460px] lg:w-[520px]
							origin-top-right transform-gpu transition-transform
							scale-[1.5] sm:scale-[1.55] lg:scale-[1.6]
						"
          /> */}

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
            className="
							absolute left-0 sm:left-4 lg:left-8 bottom-50 sm:bottom-60
							p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
							flex items-center gap-3 sm:gap-4
						"
          >
            <div className="h-[84px] w-[84px] sm:h-[96px] sm:w-[96px] overflow-hidden rounded-xl bg-white">
              <Image
                src={Qr}
                alt="QR Memora"
                className="h-full w-full object-contain"
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
