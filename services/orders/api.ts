import type { OrderDetail, OrderListItem } from "./types";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://memora.somee.com"
).replace(/\/$/, "");

const PATH_LIST = "/api/Order/getAll";
const PATH_DETAIL = "/api/Order/getById";

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const token = localStorage.getItem("accessToken");
  return token
    ? { Authorization: `Bearer ${token}` }
    : ({} as Record<string, string>);
}

export async function getOrders(): Promise<OrderListItem[]> {
  const headers: HeadersInit = { Accept: "application/json", ...authHeaders() };
  const res = await fetch(`${API_BASE}${PATH_LIST}`, {
    headers,
    method: "GET",
  });
  if (!res.ok) throw new Error(res.statusText || "Fetch orders failed");
  return (await res.json()) as OrderListItem[];
}

export async function getOrderById(id: string): Promise<OrderDetail> {
  const headers: HeadersInit = { Accept: "application/json", ...authHeaders() };
  const res = await fetch(`${API_BASE}${PATH_DETAIL}/${id}`, {
    headers,
    method: "GET",
  });
  if (!res.ok) throw new Error(res.statusText || "Fetch order failed");
  return (await res.json()) as OrderDetail;
}
