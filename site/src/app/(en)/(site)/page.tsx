import { DiagnosticCta } from "@/components/sections/home/DiagnosticCta";
import { Hero } from "@/components/sections/home/Hero";
import { Services } from "@/components/sections/home/Services";

// Home page: only decides which sections appear and in what order.
// Each section's design lives in components/sections/home, its text in content/home.ts.

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <DiagnosticCta />
    </>
  );
}
