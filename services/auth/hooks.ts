"use client";

import { useCallback, useState } from "react";
import type { LoginRequest, LoginResponse } from "./types";
import { api, ApiError } from "./api";

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
        }
        return res as LoginResponse;
      } catch (e: unknown) {
        const err = e as ApiError | Error;
        setError((err as ApiError)?.message || err.message || "Login failed");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { login, loading, error };
}
