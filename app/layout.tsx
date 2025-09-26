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
    "Spa, Hotel & Nhận nuôi thú cưng. Dịch vụ chăm sóc, lưu trú cao cấp và kết nối nhận nuôi yêu thương cho bé cưng của bạn",
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
      <body className="antialiased relative min-h-screen flex flex-col">
        <div className="fixed inset-0 -z-50 animate-gradient bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 pointer-events-none" />
        <Providers>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
