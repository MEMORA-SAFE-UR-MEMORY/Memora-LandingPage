"use client";

import { useCallback, useState } from "react";
import { createPaymentLink } from "./api";
import type { PaymentCreateLinkResponse } from "./types";

export function useCreatePaymentLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res: PaymentCreateLinkResponse = await createPaymentLink(orderId);
      return res;
    } catch (e) {
      const msg = (e as Error).message || "Tạo link thanh toán thất bại";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const pay = useCallback(
    async (orderId: string) => {
      const res = await create(orderId);
      const url = res?.data?.checkoutUrl;
      if (url) window.location.href = url;
      return res;
    },
    [create]
  );

  return { loading, error, create, pay };
}
