export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://memora.somee.com";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const raw = isJson ? await res.json() : null;

  if (!res.ok) {
    let message = res.statusText || "Request failed";
    if (isRecord(raw)) {
      if (typeof raw.message === "string") message = raw.message;
      else if (typeof (raw as Record<string, unknown>).error === "string")
        message = String((raw as Record<string, unknown>).error);
    }
    const err: ApiError = {
      status: res.status,
      message,
      details: raw ?? undefined,
    };
    throw err;
  }

  return raw as unknown as T;
}

export const api = {
  login(body: { email: string; password: string }) {
    return request<{ accessToken: string }>("/api/User/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};
