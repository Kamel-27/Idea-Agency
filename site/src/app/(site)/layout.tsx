import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// Layout for the normal website pages (home, services, work, team, blog).
// "(site)" is a route group: the brackets keep it out of the URL.
// Ad landing pages will live in a separate "(landing)" group with no menu,
// because a landing page must have one goal and no links out.

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
