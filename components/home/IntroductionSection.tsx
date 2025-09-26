"use client";

import React from "react";
import { gravitasOne, kumbhSans, poiretOne } from "@/fonts/font";

export default function IntroductionSection() {
  return (
    <section className="relative py-2 md:py-6">
      {/* vệt loang phía sau tiêu đề */}
      <span
        className="
          pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 -top-4
          h-[260px] w-[700px] rounded-full blur-[100px] opacity-95 mix-blend-multiply
          bg-[radial-gradient(60%_60%_at_50%_40%,#ffb199_0%,#ff5a4e_38%,rgba(255,90,78,0.35)_60%,transparent_78%)]
        "
      />

      <div className="mx-auto w-full max-w-[1000px] px-4">
        <h2
          className={`${gravitasOne.className} relative text-[44px] sm:text-[56px] leading-[1.05] tracking-tight text-gray-900 text-center`}
        >
          Make The Best{" "}
          <span className="relative inline-block">
            Financial
            {/* gạch dưới xanh */}
            <i className="absolute left-0 right-0 bottom-1 h-2 bg-blue-300/70 rounded-sm -z-10" />
          </span>{" "}
          Decision
        </h2>
        <p
          className={`${poiretOne.className} mt-4 text-center text-gray-700/90 max-w-2xl mx-auto`}
        >
          Organize your memories, sync across devices, and keep everything
          private.
        </p>

        {/* Content */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Mock phone / screenshot */}
          <div className="relative mx-auto w-[280px] sm:w-[320px]">
            <div className="absolute -inset-8 -z-10 blur-3xl opacity-60 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 rounded-full" />
            <div className="aspect-[9/19] w-full bg-white/80 backdrop-blur-md rounded-[38px] shadow-2xl border border-white/60 overflow-hidden">
              <div className="h-8 bg-black/90" />
              <div className="p-4 space-y-3">
                <div className="h-24 rounded-2xl bg-gradient-to-br from-pink-200 via-rose-200 to-orange-200" />
                <div className="h-3 w-4/5 bg-gray-200/80 rounded" />
                <div className="h-3 w-3/5 bg-gray-200/70 rounded" />
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="h-16 rounded-xl bg-gray-100" />
                  <div className="h-16 rounded-xl bg-gray-100" />
                  <div className="h-16 rounded-xl bg-gray-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Private & Secure",
                desc: "End-to-end mindset. You stay in control of your memories.",
              },
              {
                title: "Fast Sync",
                desc: "Instantly sync across devices with offline-first cache.",
              },
              {
                title: "Smart Search",
                desc: "Find moments by people, places, or vibes in seconds.",
              },
              {
                title: "Beautiful Exports",
                desc: "Share as reels or stories with one tap.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
              >
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-3">
                  <span className="text-xs">★</span>
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p
                  className={`${kumbhSans.className} text-sm text-gray-700 mt-1`}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA badges */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <a className="h-12 px-4 rounded-lg bg-black text-white flex items-center hover:opacity-90 transition">
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase tracking-widest">
                Download on the
              </div>
              <div className="text-lg font-semibold -mt-0.5">App Store</div>
            </div>
          </a>
          <a className="h-12 px-4 rounded-lg bg-black text-white flex items-center hover:opacity-90 transition">
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase tracking-widest">
                Get it on
              </div>
              <div className="text-lg font-semibold -mt-0.5">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
