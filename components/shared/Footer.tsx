"use client";

import Link from "next/link";
import { gravitasOne, kumbhSans } from "@/fonts/font";

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-12 ">
      <div className="mx-auto container container--mobile w-[min(98vw,1240px)] ">
        {/* Card (dark like screenshot) */}
        <div className="relative glass-container glass-container--rounded glass-container--medium rounded-[28px] text-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/10">
          {/* Background glass layers */}
          <div
            className="glass-filter pointer-events-none"
            aria-hidden="true"
          ></div>
          <div
            className="glass-overlay pointer-events-none"
            aria-hidden="true"
          ></div>
          <div
            className="glass-specular pointer-events-none"
            aria-hidden="true"
          ></div>
          {/* Foreground content */}
          <div className="glass-content">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 p-8 md:p-10 lg:p-12">
              {/* Brand + description + socials */}
              <div className="col-span-2 md:col-span-2 space-y-4">
                <div className="flex items-center">
                  <span
                    className={`${gravitasOne.className} text-2xl text-bling tracking-widest`}
                  >
                    Memora
                  </span>
                </div>
                <p
                  className={`${kumbhSans.className} text-sm !font-medium text-[#C71585]/70 max-w-xs`}
                >
                  Keep your memories safe and organized—by people, places, and
                  time. Share what matters, keep the rest private.
                </p>
                <div className="flex items-center gap-5 text-[#C71585]/80">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="hover:text-white transition-colors"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <span className="h-4 w-px bg-white/30" />
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <span className="h-4 w-px bg-white/30" />
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="hover:text-white transition-colors"
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Link */}
              <Column
                title="Quick Link"
                fontClassName={kumbhSans.className}
                titleClassName="text-[#C71585] !font-bold"
                listClassName="text-[#C71585]/80 !font-medium"
                linkClassName="text-[#C71585]/70 hover:text-[#C71585] !font-medium"
                items={[
                  { label: "About", href: "#" },
                  { label: "Features", href: "#" },
                  { label: "Screenshot", href: "#" },
                  { label: "Blog", href: "#" },
                ]}
              />

              {/* Newsletter */}
              <div
                className={`col-span-2 md:col-span-2 ${kumbhSans.className}`}
              >
                <h4
                  className={`text-2xl !font-bold mb-4 uppercase text-[#C71585] ${kumbhSans.className}`}
                >
                  News Letter
                </h4>
                <p className="text-sm text-[#C71585]/70 mb-4">
                  Subscribe our newsletter to get our latest update & news
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative max-w-md"
                >
                  <div className="flex items-stretch overflow-hidden rounded-xl bg-white text-black">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 text-sm outline-none placeholder:text-black-500"
                    />
                    <button
                      type="submit"
                      className="px-4 md:px-5 bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center"
                      aria-label="Subscribe"
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/15" />

            {/* Bottom copyright */}
            <div
              className={`px-8 md:px-10 lg:px-12 py-5 text-center !font-bold text-sm text-black/70 flex items-center justify-center gap-1 ${kumbhSans.className}`}
            >
              <CopyrightIcon className="w-4 h-4" />
              <span>Copyright 2025. Memora Corp. All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- tiny helpers ---------- */

function Column({
  title,
  items,
  titleClassName,
  listClassName,
  linkClassName,
  fontClassName,
}: {
  title: string;
  items: { label: string; href: string }[];
  titleClassName?: string;
  listClassName?: string;
  linkClassName?: string;
  fontClassName?: string;
}) {
  return (
    <div>
      <h4
        className={`text-2xl font-semibold mb-4 uppercase ${
          fontClassName ? fontClassName + " " : ""
        }${titleClassName ?? "text-white"}`}
      >
        {title}
      </h4>
      <ul
        className={`space-y-3 text-sm ${
          fontClassName ? fontClassName + " " : ""
        }${listClassName ?? "text-white/70"}`}
      >
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className={linkClassName ?? "hover:text-white transition-colors"}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple social and copyright icons (inline SVGs)
function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4Z" />
    </svg>
  );
}
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}
function TikTokIcon({ className = "" }: { className?: string }) {
  // Simple, brand-inspired musical note icon for TikTok
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}
function CopyrightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0Zm0 1.395a8.605 8.605 0 1 0 0 17.21a8.605 8.605 0 0 0 0-17.21Zm.16 3.256c1.08 0 2.117.303 3.003.864a.698.698 0 0 1-.745 1.179a4.211 4.211 0 0 0-2.257-.647c-2.278 0-4.114 1.775-4.114 3.953s1.836 3.953 4.114 3.953c.801 0 1.567-.22 2.224-.627a.698.698 0 0 1 .735 1.187a5.608 5.608 0 0 1-2.96.836c-3.037 0-5.509-2.39-5.509-5.349c0-2.96 2.472-5.349 5.51-5.349Z" />
    </svg>
  );
}
function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 5l7 7-7 7v-4H4v-6h9V5Z" />
    </svg>
  );
}
