import { redirect } from "next/navigation";

export default async function SuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(resolved)) {
    if (Array.isArray(v)) v.forEach((x) => sp.append(k, x));
    else if (typeof v === "string") sp.set(k, v);
  }
  redirect(`/payment/success${sp.toString() ? `?${sp.toString()}` : ""}`);
}
