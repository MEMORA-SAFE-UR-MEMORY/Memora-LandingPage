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
  const res = await fetch(`${API_BASE}${path}`, {
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
  try {
    data = await res.json(); // chỉ parse JSON
  } catch {
    data = null; // không có JSON body
  }

  if (!res.ok) {
    const fallback = res.statusText || "Request failed";
    let message = fallback;

    if (isRecord(data)) {
      message =
        getStringProp(data, "message") ??
        getStringProp(data, "error") ??
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
