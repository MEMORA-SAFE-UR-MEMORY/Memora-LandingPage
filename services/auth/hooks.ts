"use client";

import { useCallback, useState } from "react";
import type { LoginRequest, LoginResponse } from "./types";
import { api } from "./api";

const AUTH_EVENT = "memora:auth";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (payload: LoginRequest): Promise<LoginResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.login(payload);
        if (res?.accessToken) {
          localStorage.setItem("accessToken", res.accessToken);
          window.dispatchEvent(new Event(AUTH_EVENT)); // báo cho Header
        }
        return res;
      } catch (e) {
        setError((e as { message?: string })?.message || "Login failed");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { login, loading, error };
}
