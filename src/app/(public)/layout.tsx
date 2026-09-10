import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
