import React from "react";
import type { Metadata } from "next";
import { poppins } from "@/fonts/font";

export const metadata: Metadata = {
  title: "Thanh toán | Memora",
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.className} min-h-screen flex flex-col`}>
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
