import { redirect } from "next/navigation";

export default function FailRedirect({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (Array.isArray(v)) v.forEach((x) => sp.append(k, x));
    else if (typeof v === "string") sp.set(k, v);
  }
  redirect(`/payment/failed${sp.toString() ? `?${sp.toString()}` : ""}`);
}
