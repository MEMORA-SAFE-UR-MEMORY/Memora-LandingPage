"use client";

import { useCallback, useEffect, useState } from "react";
import type { OrderDetail, OrderListItem } from "./types";
import { getOrderById, getOrders, searchOrderStatus } from "./api";

export function useOrders() {
  const [data, setData] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getOrders();
      setData(list);
    } catch (e) {
      setError((e as Error).message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useOrder() {
  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const json = await getOrderById(id);
      setData(json);
      return json;
    } catch (e) {
      setError((e as Error).message || "Fetch failed");
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchById };
}

export function useOrderStatus() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async ({ id, email }: { id: string; email: string }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await searchOrderStatus({ id, email });
        setStatus(result);
        return result;
      } catch (e) {
        const msg = (e as Error).message || "Search failed";
        setError(msg);
        setStatus(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { status, loading, error, search };
}
