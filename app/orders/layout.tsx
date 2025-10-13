export const metadata = {
  title: "Orders — Memora",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Thêm padding top để không bị đè bởi Header (Header absolute)
  return <div className="pt-24 sm:pt-28 pb-10">{children}</div>;
}
