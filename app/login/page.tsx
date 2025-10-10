"use client";

import React, { useState } from "react";
// import Link from "next/link";
import { kumbhSans, montserrat } from "@/fonts/font";
import { CircleHelp } from "lucide-react";

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
          <h2
            className={`${montserrat.className} text-2xl font-semibold tracking-wide mb-4`}
          >
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
                  label="Mật khẩu"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className={`${montserrat.className} absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 text-gray-600 hover:text-black`}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "Ẩn" : "Hiện"}
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
              className={`${montserrat.className} w-full bg-[#FE93C8] text-white py-2.5 rounded-md hover:bg-[#f77cb9] transition`}
            >
              ĐĂNG NHẬP VÀ TIẾP TỤC
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
        <div>
          <h2
            className={`${montserrat.className} text-2xl font-semibold tracking-wide mb-4`}
          >
            KIỂM TRA TÌNH TRẠNG ĐƠN HÀNG
          </h2>

          <form onSubmit={onCheckOrder} className="space-y-4">
            <InputFloat id="orderNumber" label="Mã đơn hàng" type="text" />
            <InputFloat
              id="orderEmail"
              label="Email đơn hàng"
              type="email"
              endSlot={
                <InfoTooltip
                  message="Vui lòng điền mã đơn hàng theo như mẫu.
                 Ví dụ: PNDES00012345"
                />
              }
            />

            <button
              type="submit"
              className={`${montserrat.className} w-full bg-white border border-gray-300 py-2.5 rounded-md hover:bg-transparent hover:border-gray-50 transition`}
            >
              KIỂM TRA
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
  endSlot,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  endSlot?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        className={`${montserrat.className} peer block w-full rounded-none bg-transparent outline-none
                   border-0 border-b border-gray-300
                   pr-12 pt-8 pb-2 placeholder-transparent
                   focus:ring-0 focus:border-b-black`}
      />
      <label
        htmlFor={id}
        className={`${montserrat.className} pointer-events-none absolute left-0 text-black transition-all duration-150 ease-out
                   top-1/2 -translate-y-1/2 text-base
                   peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-bold
                   peer-[:not(:placeholder-shown)]:top-2
                   peer-[:not(:placeholder-shown)]:translate-y-0
                   peer-[:not(:placeholder-shown)]:text-xs`}
      >
        {label}
      </label>
      {endSlot && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {endSlot}
        </div>
      )}
    </div>
  );
}

function InfoTooltip({ message }: { message: string }) {
  const id = React.useId();
  return (
    <div className="group relative">
      <button
        aria-describedby={id}
        type="button"
        className="p-1.5 rounded-full text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
      >
        {/* circle info icon */}
        <CircleHelp size={20} strokeWidth={1.75} />
      </button>

      {/* tooltip */}
      <div
        role="tooltip"
        id={id}
        className={`${montserrat.className} pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100
                   transition duration-150 ease-out
                   absolute -top-3 translate-y-[-100%] -right-4 z-50
                   w-80 max-w-[min(90vw,22rem)]
                   rounded-md bg-black text-white text-sm px-4 py-3 shadow-lg whitespace-pre-line`}
      >
        {message}
        {/* arrow */}
        <span className="absolute top-full right-6 -mt-px h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-black" />
      </div>
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
