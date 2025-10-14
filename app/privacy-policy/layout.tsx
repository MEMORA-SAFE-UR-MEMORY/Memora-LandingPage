import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "Chính sách và Điều khoản — Memora",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col pt-24 sm:pt-28">
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-[1250px]">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
