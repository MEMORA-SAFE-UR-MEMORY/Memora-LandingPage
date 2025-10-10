import Header from "@/components/shared/Header";

export const metadata = {
  title: "Login — Memora",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pt-24 sm:pt-28 pb-12">{children}</main>
    </div>
  );
}
