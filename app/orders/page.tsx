"use client";

import { Fragment, useMemo, useState } from "react";
import { montserrat } from "@/fonts/font";
import { useOrders } from "@/services/orders/hooks";
import type { OrderListItem } from "@/services/orders/types";
import { ChevronUp, MoreHorizontal, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { useCreatePaymentLink } from "@/services/payment/hooks";
import { StatusFilterDropdown } from "@/components/orders/StatusFilters";

export default function OrdersPage() {
  const { data, loading, error, refresh } = useOrders();
  const { create, loading: paying } = useCreatePaymentLink();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payingId, setPayingId] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  const normalise = (value: string | undefined | null) =>
    value ? value.normalize("NFC").toLowerCase() : "";

  const rows: OrderListItem[] = useMemo(() => data ?? [], [data]);

  const filteredRows = useMemo(() => {
    if (statusFilter === "all") return rows;
    return rows.filter((order) => normalise(order.status) === statusFilter);
  }, [rows, statusFilter]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onPay = async (id: string) => {
    setPayingId(id);
    try {
      await toast.promise(
        create(id).then((res) => {
          const url = res.data?.checkoutUrl;
          if (url) {
            setTimeout(() => (window.location.href = url), 300);
          }
          return res;
        }),
        {
          loading: "Đang xử lý...",
          success: "Xử lý thành công, đang chuyển tới PayOS...",
          error: (err) => (err as Error).message || "Tạo link thất bại",
        }
      );
    } finally {
      setPayingId(null);
    }
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[98vw] sm:max-w-[960px] md:max-w-[1280px]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <StatusFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-auto"
          />
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
            className={`${montserrat.className} mb-4 text-sm font-regular text-red-600`}
          >
            {error}
          </p>
        )}

        <div
          className={`${montserrat.className} hidden overflow-x-auto rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md shadow-lg md:block`}
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
              {filteredRows.map((o) => {
                const items =
                  o.orderAlbums?.reduce(
                    (acc, album) => acc + album.quantity,
                    0
                  ) ?? 0;
                const canPay = normalise(o.status) === "đã đặt";
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
                              className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
                              disabled={paying && payingId === o.id}
                            >
                              {paying && payingId === o.id ? (
                                <span className="inline-flex items-center gap-2">
                                  <RotateCw
                                    size={16}
                                    className="animate-spin"
                                  />
                                  Đang chuyển...
                                </span>
                              ) : (
                                "Thanh toán"
                              )}
                            </button>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Không cần thanh toán
                            </span>
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
                          className="bg-white/10 px-4 py-4 backdrop-blur-md"
                        >
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="rounded-xl border border-white/25 bg-white/20 p-4 shadow-sm backdrop-blur-md">
                              <div className="mb-2 font-medium">
                                Thông tin nhận hàng
                              </div>
                              <dl className="grid grid-cols-3 gap-x-3 gap-y-1 text-sm">
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

                            <div className="rounded-xl border border-white/25 bg-white/20 p-4 shadow-sm backdrop-blur-md">
                              <div className="mb-2 font-medium">Sản phẩm</div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full bg-transparent text-sm">
                                  <thead className="bg-white/30">
                                    <tr>
                                      <th className="px-3 py-2 text-left">
                                        Tên
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Template
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        SL
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Đơn giá
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Thành tiền
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {o.orderAlbums?.map((album) => (
                                      <tr key={album.id}>
                                        <td className="px-3 py-2">
                                          {album.albumDto.name}
                                        </td>
                                        <td className="px-3 py-2">
                                          {album.albumDto.template?.name}
                                        </td>
                                        <td className="px-3 py-2">
                                          {album.quantity}
                                        </td>
                                        <td className="px-3 py-2">
                                          {formatVND(album.price)}
                                        </td>
                                        <td className="px-3 py-2">
                                          {formatVND(
                                            album.price * album.quantity
                                          )}
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
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}

              {filteredRows.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`${montserrat.className} space-y-3 md:hidden`}>
          {filteredRows.map((o) => {
            const items =
              o.orderAlbums?.reduce((acc, album) => acc + album.quantity, 0) ??
              0;
            const canPay = normalise(o.status) === "đã đặt";
            const isOpen = open.has(o.id);

            return (
              <div
                key={o.id}
                className="rounded-xl border border-white/25 bg-white/20 p-4 shadow-lg backdrop-blur-md"
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
                    className="mt-3 w-full rounded-md bg-black py-2 text-sm text-white disabled:opacity-60"
                    disabled={paying && payingId === o.id}
                  >
                    {paying && payingId === o.id ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <RotateCw size={16} className="animate-spin" />
                        Đang chuyển...
                      </span>
                    ) : (
                      "Thanh toán"
                    )}
                  </button>
                )}

                {isOpen && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="rounded-xl border border-white/25 bg-white/20 p-3 backdrop-blur-md">
                      <div className="mb-1 font-medium">
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

                    <div className="rounded-xl border border-white/25 bg-white/20 p-3 backdrop-blur-md">
                      <div className="mb-2 font-medium">Sản phẩm</div>
                      <ul className="space-y-1">
                        {o.orderAlbums?.map((album) => (
                          <li
                            key={album.id}
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="flex-1">
                              {album.albumDto.name} —{" "}
                              {album.albumDto.template?.name} × {album.quantity}
                            </span>
                            <span className="font-medium">
                              {formatVND(album.price * album.quantity)}
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

          {filteredRows.length === 0 && !loading && (
            <div className="rounded-xl border border-white/25 bg-white/20 p-4 text-center text-gray-500 shadow-lg backdrop-blur-md">
              Không có dữ liệu.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function formatVND(value: number) {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  } catch {
    return `${value.toLocaleString("vi-VN")} ₫`;
  }
}
