"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const orderCode = sp.get("orderCode") || sp.get("code") || "";
  const paymentLinkId = sp.get("paymentLinkId") || sp.get("pid") || "";

  useEffect(() => {
    const t = setTimeout(() => router.push("/orders"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <section className="text-center space-y-4">
      <div className="mx-auto size-16 text-emerald-600">
        <CheckCircle2 className="size-16" />
      </div>
      <h1 className="text-2xl font-semibold">Thanh toán thành công</h1>
      {orderCode || paymentLinkId ? (
        <p className="text-sm text-gray-600">
          Mã thanh toán: <b>{orderCode || paymentLinkId}</b>
        </p>
      ) : null}
      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          href="/orders"
          className="rounded-md bg-black text-white px-4 py-2 text-sm hover:bg-gray-800"
        >
          Xem đơn hàng
        </Link>
        <Link
          href="/"
          className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Về trang chủ
        </Link>
      </div>
      <p className="text-xs text-gray-500">Tự động chuyển sau vài giây…</p>
    </section>
  );
}
