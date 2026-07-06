"use client";

import React, { useEffect, useState } from "react";
import { montserrat } from "@/fonts/font";
import { CircleHelp } from "lucide-react";
import { useLogin } from "@/services/auth/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useOrderStatus } from "@/services/orders/hooks";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const {
    status: orderStatus,
    loading: searching,
    error: searchError,
    search,
  } = useOrderStatus();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
    const res = await login({ email, password });
    if (res?.accessToken) {
      toast.success("Đăng nhập thành công!");
      router.push("/orders");
    }
  };

  const onCheckOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const id =
      (
        form.elements.namedItem("orderNumber") as HTMLInputElement
      )?.value.trim() || "";
    const email =
      (
        form.elements.namedItem("orderEmail") as HTMLInputElement
      )?.value.trim() || "";

    if (!id || !email) {
      toast.error("Vui lòng nhập đầy đủ Mã đơn hàng và Email.");
      return;
    }

    await toast.promise(search({ id, email }), {
      loading: "Đang kiểm tra...",
      success: (result) => `Trạng thái: ${result}`,
      error: (err) => (err as Error)?.message || "Kiểm tra đơn hàng thất bại.",
    });
  };

  return (
    <>
      {(loading || searching) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <SpinnerCustom />
        </div>
      )}
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
              </div>

              <button
                type="submit"
                className={`${montserrat.className} w-full bg-[#FE93C8] text-white py-2.5 rounded-md hover:bg-[#f77cb9] transition disabled:opacity-60`}
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP VÀ TIẾP TỤC"}
              </button>
              {error && (
                <p
                  className={`${montserrat.className} text-sm text-red-600 mt-2`}
                >
                  {error}
                </p>
              )}
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
              <InputFloat
                id="orderNumber"
                label="Mã đơn hàng"
                type="text"
                endSlot={
                  <InfoTooltip message="Mã đơn hàng được gửi vào email của bạn sau khi đặt hàng thành công." />
                }
              />
              <InputFloat id="orderEmail" label="Email đơn hàng" type="email" />

              <button
                type="submit"
                className={`${montserrat.className} w-full bg-white border border-gray-300 py-2.5 rounded-md hover:bg-transparent hover:border-gray-50 transition disabled:opacity-60`}
                disabled={searching}
              >
                {searching ? "Đang kiểm tra..." : "KIỂM TRA"}
              </button>
              {orderStatus && (
                <p className={`${montserrat.className} text-md mt-2`}>
                  Trạng thái:{" "}
                  <strong className="text-[#C71585]">{orderStatus}</strong>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
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
