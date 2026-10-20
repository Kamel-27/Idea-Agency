import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// Arabic website pages (home, and later services, work, team, blog): header + footer.
// Landing pages live in the (landing) group instead, with no menu.

export default function ArabicSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header locale="ar" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
