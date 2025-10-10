"use client";

import { useState } from "react";
import { kumbhSans } from "@/fonts/font";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo/Logo.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="mx-auto w-[min(96vw,1200px)] flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={80} height={80} priority />
        </div>

        {/* Desktop nav */}
        <nav
          className={`hidden md:flex items-center gap-10 text-base ${kumbhSans.className}`}
        >
          <Link href="/" className="text-black hover:opacity-80">
            Home
          </Link>
          <Link href="/#about" className="text-black hover:opacity-80">
            About Us
          </Link>
          <Link href="/#pricing" className="text-black hover:opacity-80">
            Pricing
          </Link>
          <Link href="/#features" className="text-black hover:opacity-80">
            Features
          </Link>
        </nav>

        {/* Desktop button */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className={`inline-block bg-black text-white px-5 py-2.5 rounded-md text-sm ${kumbhSans.className}`}
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Open Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-black/80 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown (no blur, no backdrop) */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full px-4 sm:px-6 pb-4">
          <div className="mx-auto w-full max-w-[680px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 p-2 sm:p-3">
            <div className={`flex flex-col ${kumbhSans.className}`}>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                About Us
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Pricing
              </Link>
              <Link
                href="/#features"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Features
              </Link>
              <div className="px-4 py-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-black text-white px-5 py-2.5 rounded-md text-sm"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
