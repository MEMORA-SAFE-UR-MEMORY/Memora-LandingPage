"use client";

import { useMemo, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/fonts/font";
import { useOrders } from "@/services/orders/hooks";
import type { OrderListItem } from "@/services/orders/types";
import { MoreHorizontal, ChevronUp, RotateCw } from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  const { data, loading, error, refresh } = useOrders();

  const rows: OrderListItem[] = useMemo(() => data ?? [], [data]);
  // các dòng đang mở chi tiết
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onPay = (id: string) => {
    // TODO: nối flow thanh toán thực tế
    router.push(`/checkout?orderId=${id}`);
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[98vw] sm:max-w-[960px] md:max-w-[1280px]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={refresh}
            aria-label="Làm mới"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-50 disabled:opacity-70"
            disabled={loading}
            title="Làm mới"
          >
            <RotateCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {error && (
          <p
            className={`${montserrat.className} text-sm text-red-600 mb-4  font-regular`}
          >
            {error}
          </p>
        )}

        {/* Bảng (md+) */}
        <div
          className={`${montserrat.className} hidden md:block overflow-x-auto
                      rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md shadow-lg`}
        >
          <table className="min-w-full bg-transparent">
            <thead className="bg-white/30 text-left text-sm">
              <tr>
                <th className="px-4 py-3">Mã đơn</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Số SP</th>
                <th className="px-4 py-3">Tổng tiền</th>
                <th className="px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 text-sm">
              {rows.map((o) => {
                const items =
                  o.orderAlbums?.reduce((acc, a) => acc + a.quantity, 0) ?? 0;
                const canPay = o.status === "Đã đặt";
                const isOpen = open.has(o.id);
                return (
                  <Fragment key={o.id}>
                    <tr>
                      <td className="px-4 py-3">{o.id}</td>
                      <td className="px-4 py-3">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{o.status}</td>
                      <td className="px-4 py-3">{items}</td>
                      <td className="px-4 py-3">{formatVND(o.totalPrice)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {canPay ? (
                            <button
                              onClick={() => onPay(o.id)}
                              className="rounded-md bg-black text-white px-3 py-1.5 text-sm hover:bg-gray-800"
                            >
                              Thanh toán
                            </button>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                          <button
                            onClick={() => toggle(o.id)}
                            aria-expanded={isOpen}
                            title="Xem chi tiết"
                            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-gray-50"
                          >
                            {isOpen ? (
                              <ChevronUp size={18} />
                            ) : (
                              <MoreHorizontal size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-4 bg-white/10 backdrop-blur-md"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="rounded-xl bg-white/20 backdrop-blur-md p-4 border border-white/25 shadow-sm">
                              <div className="font-medium mb-2">
                                Thông tin nhận hàng
                              </div>
                              <dl className="text-sm grid grid-cols-3 gap-x-3 gap-y-1">
                                <dt className="text-gray-500">Họ tên</dt>
                                <dd className="col-span-2">
                                  {o.fullname || o.userInfo?.fullname || "-"}
                                </dd>
                                <dt className="text-gray-500">SĐT</dt>
                                <dd className="col-span-2">
                                  {o.phoneNumber ||
                                    o.userInfo?.phoneNumber ||
                                    "-"}
                                </dd>
                                <dt className="text-gray-500">Địa chỉ</dt>
                                <dd className="col-span-2 whitespace-pre-wrap">
                                  {o.address?.trim() || "-"}
                                </dd>
                              </dl>
                            </div>
                            <div className="rounded-xl bg-white/20 backdrop-blur-md p-4 border border-white/25 shadow-sm overflow-x-auto">
                              <div className="font-medium mb-2">Sản phẩm</div>
                              <table className="min-w-full text-sm bg-transparent">
                                <thead className="bg-white/30">
                                  <tr>
                                    <th className="px-3 py-2 text-left">Tên</th>
                                    <th className="px-3 py-2 text-left">
                                      Template
                                    </th>
                                    <th className="px-3 py-2 text-left">SL</th>
                                    <th className="px-3 py-2 text-left">
                                      Đơn giá
                                    </th>
                                    <th className="px-3 py-2 text-left">
                                      Thành tiền
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {o.orderAlbums?.map((a) => (
                                    <tr key={a.id}>
                                      <td className="px-3 py-2">
                                        {a.albumDto.name}
                                      </td>
                                      <td className="px-3 py-2">
                                        {a.albumDto.template?.name}
                                      </td>
                                      <td className="px-3 py-2">
                                        {a.quantity}
                                      </td>
                                      <td className="px-3 py-2">
                                        {formatVND(a.price)}
                                      </td>
                                      <td className="px-3 py-2">
                                        {formatVND(a.price * a.quantity)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-white/30">
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="px-4 py-3 text-right font-medium"
                                    >
                                      Tổng cộng
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                      {formatVND(o.totalPrice)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {rows.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Chưa có đơn hàng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className={`${montserrat.className} md:hidden space-y-3`}>
          {rows.map((o) => {
            const items =
              o.orderAlbums?.reduce((acc, a) => acc + a.quantity, 0) ?? 0;
            const canPay = o.status === "Đã đặt";
            const isOpen = open.has(o.id);
            return (
              <div
                key={o.id}
                className="rounded-xl bg-white/20 backdrop-blur-md p-4 border border-white/25 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">Mã: {o.id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm whitespace-nowrap">{o.status}</div>
                    <button
                      onClick={() => toggle(o.id)}
                      aria-expanded={isOpen}
                      title="Xem chi tiết"
                      className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-gray-50"
                    >
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <MoreHorizontal size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Số SP: {items}</span>
                  <span className="font-semibold">
                    {formatVND(o.totalPrice)}
                  </span>
                </div>
                {canPay && (
                  <button
                    onClick={() => onPay(o.id)}
                    className="mt-3 w-full rounded-md bg-black text-white py-2 text-sm"
                  >
                    Thanh toán
                  </button>
                )}
                {isOpen && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="rounded-xl bg-white/20 backdrop-blur-md border border-white/25 p-3">
                      <div className="font-medium mb-1">
                        Thông tin nhận hàng
                      </div>
                      <div>
                        Họ tên: {o.fullname || o.userInfo?.fullname || "-"}
                      </div>
                      <div>
                        SĐT: {o.phoneNumber || o.userInfo?.phoneNumber || "-"}
                      </div>
                      <div className="whitespace-pre-wrap">
                        Địa chỉ: {o.address?.trim() || "-"}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/20 backdrop-blur-md border border-white/25 p-3">
                      <div className="font-medium mb-2">Sản phẩm</div>
                      <ul className="space-y-1">
                        {o.orderAlbums?.map((a) => (
                          <li
                            key={a.id}
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="flex-1">
                              {a.albumDto.name} — {a.albumDto.template?.name} ×{" "}
                              {a.quantity}
                            </span>
                            <span className="font-medium">
                              {formatVND(a.price * a.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {rows.length === 0 && !loading && (
            <div className="rounded-xl bg-white/20 backdrop-blur-md p-4 border border-white/25 shadow-lg text-center text-gray-500">
              Chưa có đơn hàng.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function formatVND(n: number) {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);
  } catch {
    return `${n.toLocaleString("vi-VN")} ₫`;
  }
}
