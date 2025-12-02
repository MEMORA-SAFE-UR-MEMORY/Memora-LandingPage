export type ApiError = { status: number; message: string; details?: unknown };

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://memora.somee.com"
).replace(/\/$/, "");

// helpers — tránh dùng any
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function getStringProp(
  obj: Record<string, unknown>,
  key: string
): string | undefined {
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
}

async function postJson<TRes, TBody = unknown>(
  path: string,
  body: TBody,
  init?: RequestInit
): Promise<TRes> {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  let data: unknown = null;
  let rawText = "";

  try {
    rawText = await res.text();
    data = JSON.parse(rawText);
  } catch {
    // Nếu không parse được JSON, dùng plain text làm message
    data = rawText || null;
  }

  if (!res.ok) {
    const fallback = "Yêu cầu thất bại";
    let message = fallback;

    // Nếu response là plain text string
    if (typeof data === "string" && data.trim()) {
      message = data.trim();
    } else if (isRecord(data)) {
      // Nếu là JSON object, thử các field phổ biến
      message =
        getStringProp(data, "message") ??
        getStringProp(data, "error") ??
        getStringProp(data, "Message") ??
        getStringProp(data, "Error") ??
        getStringProp(data, "title") ??
        fallback;
    }

    throw { status: res.status, message, details: data } as ApiError;
  }

  return (data ?? ({} as unknown)) as TRes;
}

export const api = {
  // Login: POST /api/User/login
  login(body: { email: string; password: string }) {
    return postJson<{ accessToken: string }>("/api/User/login", body);
  },
};
