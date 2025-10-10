"use client";

import { useState } from "react";
import Link from "next/link";
import { gravitasOne, kumbhSans } from "@/fonts/font";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle auth
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[440px] px-4 sm:px-6">
        <h1 className={`${gravitasOne.className} text-3xl text-center mb-6`}>
          Login
        </h1>

        <form
          onSubmit={onSubmit}
          className={`${kumbhSans.className} rounded-2xl bg-white/90 shadow-xl ring-1 ring-black/10 p-5 sm:p-6 space-y-4`}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 right-2 my-auto text-sm px-2 text-gray-600 hover:text-black"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="accent-black" /> Remember me
            </label>
            <Link href="#" className="text-sm text-black hover:opacity-80">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="#" className="text-black hover:opacity-80">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
