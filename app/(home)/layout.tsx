import Footer from "@/components/shared/Footer";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
