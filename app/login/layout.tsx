// login không dùng Header/Footer riêng, Header đã ở layout tổng
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "Login — Memora",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col pt-24 sm:pt-28">
      <main className="flex-1 flex items-center justify-center px-6 md:px-10 my-4 md:my-8">
        <div className="mx-auto w-full max-w-[1100px]">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
