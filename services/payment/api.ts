import type { PaymentCreateLinkResponse } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ||
  "https://memora.somee.com";

export async function createPaymentLink(
  orderId: string,
  opts?: { signal?: AbortSignal }
): Promise<PaymentCreateLinkResponse> {
  const res = await fetch(`${API_BASE}/api/Payment/create-link`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId }),
    signal: opts?.signal,
  });

  if (!res.ok) {
    const msg = await safeReadText(res);
    throw new Error(msg || `HTTP ${res.status}`);
  }

  const json = (await res.json()) as PaymentCreateLinkResponse;
  if (json.code !== "00") {
    throw new Error(json.desc || "Tạo link thanh toán thất bại");
  }
  return json;
}

async function safeReadText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}
