// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./_providers";
import Footer from "@/components/shared/Footer";

// CHỈ dùng các font export từ /fonts/font
import {
  gravitasOne,
  kumbhSans,
  poiretOne,
  poppins,
  raleway,
} from "@/fonts/font";

export const metadata: Metadata = {
  title: "Memora",
  description:
    "Memora – Ứng dụng lưu trữ ký ức số, giúp bạn giữ gìn và sắp xếp những khoảnh khắc đáng nhớ trong không gian phòng ký ức riêng tư, an toàn và đầy cảm xúc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${poppins.variable} ${gravitasOne.variable} ${kumbhSans.variable} ${raleway.variable} ${poiretOne.variable}`}
    >
      {/* flex-col để Footer ôm đáy khi trang ngắn; min-h-dvh ổn định trên mobile */}
      <body className="antialiased relative min-h-screen flex flex-col overflow-x-hidden">
        {/* <div className="fixed inset-0 -z-50 animate-gradient bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 pointer-events-none" /> */}
        {/* <div
          aria-hidden="true"
          className="fixed inset-0 -z-50 pointer-events-none bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url(/images/person/person1.jpg)" }}
        /> */}
        <div aria-hidden className="fixed inset-0 -z-60 pointer-events-none">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat
                       opacity-90 blur-[20px] scale-[1.06]"
            style={{ backgroundImage: "url(/images/bg.png)" }}
          />
          <div
            className="absolute inset-0 animate-gradient bg-gradient-to-r
                       from-purple-200/60 via-pink-200/60 to-blue-200/60"
          />
        </div>
        <Providers>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
