import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// English website pages (home, and later services, work, team, blog): header + footer.
// Landing pages live in the (landing) group instead, with no menu.

export default function EnglishSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header locale="en" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
