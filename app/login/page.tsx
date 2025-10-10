"use client";

import { useState } from "react";
// import Link from "next/link";
import { kumbhSans } from "@/fonts/font";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onCheckOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* vạch chia giữa */}
        <div
          aria-hidden
          className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-gray-200"
        />

        {/* LEFT: Login */}
        <div className="">
          <h2 className="text-xl font-semibold tracking-wide mb-4">
            ĐĂNG NHẬP
          </h2>

          <form onSubmit={onLogin} className="space-y-4">
            <InputFloat
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
            />

            <div className="space-y-2">
              <div className="relative">
                <InputFloat
                  id="password"
                  label="Password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 text-gray-600 hover:text-black"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {/* <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="accent-black" /> Remember me
                </label>
                <Link href="#" className="text-black hover:opacity-80">
                  Forgot Password?
                </Link>
              </div> */}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FE93C8] text-white py-2.5 rounded-md hover:bg-[#f77cb9] transition"
            >
              Sign-in and Continue
            </button>

            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 transition"
            >
              <GoogleIcon />
              Sign in with Google
            </button> */}

            {/* <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="#" className="text-black hover:opacity-80 underline">
                Create a new account
              </Link>
            </p> */}
          </form>
        </div>

        {/* RIGHT: Check Order Status */}
        <div className={`${kumbhSans.className}`}>
          <h2 className="text-xl font-semibold tracking-wide mb-4">
            CHECK ORDER STATUS
          </h2>

          <form onSubmit={onCheckOrder} className="space-y-4">
            <InputFloat id="orderNumber" label="Order number" type="text" />
            <InputFloat id="orderEmail" label="Order Email" type="email" />

            <button
              type="submit"
              className="w-full bg-white border border-gray-300 py-2.5 rounded-md hover:bg-transparent hover:border-gray-50 transition"
            >
              Check Status
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Floating label input ---------- */
function InputFloat({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        className="peer block w-full rounded-none bg-transparent outline-none
                   border-0 border-b border-gray-300
                   pr-12 pt-5 pb-2
                   focus:ring-0 focus:border-b-black"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 text-black transition-all duration-150 ease-out
                   top-1/2 -translate-y-1/2 text-base
                   peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-black
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
      >
        {label}
      </label>
    </div>
  );
}

// function GoogleIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
//       <path
//         fill="#FFC107"
//         d="M43.611 20.083H42V20H24v8h11.303C33.576 32.91 29.162 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043L37.314 8.7C33.902 5.551 29.18 3.6 24 3.6 12.318 3.6 2.4 13.518 2.4 25.2S12.318 46.8 24 46.8c11.04 0 20.4-8.96 20.4-20.4 0-1.373-.143-2.709-.404-3.983z"
//       />
//       <path
//         fill="#FF3D00"
//         d="M6.306 14.691l6.571 4.818C14.838 16.203 19.051 13.2 24 13.2c3.059 0 5.842 1.154 7.957 3.043L37.314 8.7C33.902 5.551 29.18 3.6 24 3.6c-7.783 0-14.502 4.443-17.694 11.091z"
//       />
//       <path
//         fill="#4CAF50"
//         d="M24 46.8c5.1 0 9.76-1.951 13.313-5.146l-6.147-5.19C29.162 36 24.748 32.91 24 32.91c-5.026 0-9.286-3.4-10.806-8.057l-6.654 5.123C9.686 41.951 16.226 46.8 24 46.8z"
//       />
//       <path
//         fill="#1976D2"
//         d="M43.611 20.083H42V20H24v8h11.303c-1.142 3.334-4.284 5.91-8.303 5.91-5.026 0-9.286-3.4-10.806-8.057l-6.654 5.123C9.686 41.951 16.226 46.8 24 46.8c11.04 0 20.4-8.96 20.4-20.4 0-1.373-.143-2.709-.404-3.983z"
//       />
//     </svg>
//   );
// }
