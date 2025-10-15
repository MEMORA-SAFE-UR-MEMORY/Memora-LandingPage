"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const reason =
    sp.get("reason") || sp.get("message") || "Thanh toán không thành công";

  useEffect(() => {
    const t = setTimeout(() => router.push("/orders"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <section className="text-center space-y-4">
      <div className="mx-auto size-16 text-red-600">
        <XCircle className="size-16" />
      </div>
      <h1 className="text-2xl font-semibold">Thanh toán thất bại</h1>
      <p className="text-sm text-gray-600">{reason}</p>
      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          href="/orders"
          className="rounded-md bg-black text-white px-4 py-2 text-sm hover:bg-gray-800"
        >
          Quay lại đơn hàng
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
