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
                  <Link
                    href="https://www.facebook.com/auraOfMemory?mibextid=ZbWKwL"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </Link>
                  <span className="h-4 w-px bg-white/30" />
                  <Link
                    href="https://www.instagram.com/memora__official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </Link>
                  <span className="h-4 w-px bg-white/30" />
                  <Link
                    href="https://www.tiktok.com/@memora__official?is_from_webapp=1&sender_device=pc"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </Link>
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
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 256 256"
      className={className}
    >
      <path
        fill="#1877F2"
        d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
      />
      <path
        fill="#FFF"
        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
      />
    </svg>
  );
}
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 256 256"
      className={className}
    >
      <g fill="none">
        <rect
          width="256"
          height="256"
          fill="url(#skillIconsInstagram0)"
          rx="60"
        />
        <rect
          width="256"
          height="256"
          fill="url(#skillIconsInstagram1)"
          rx="60"
        />
        <path
          fill="#ffffff"
          d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z"
        />
        <defs>
          <radialGradient
            id="skillIconsInstagram0"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FD5" />
            <stop offset=".1" stop-color="#FD5" />
            <stop offset=".5" stop-color="#FF543E" />
            <stop offset="1" stop-color="#C837AB" />
          </radialGradient>
          <radialGradient
            id="skillIconsInstagram1"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3771C8" />
            <stop offset=".128" stop-color="#3771C8" />
            <stop offset="1" stop-color="#60F" stop-opacity="0" />
          </radialGradient>
        </defs>
      </g>
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
      <path
        fill="#000000"
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"
      />
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
