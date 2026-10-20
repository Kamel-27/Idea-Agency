import { landingChrome } from "@/content/landing/shared";
import { LandingShell } from "@/components/landing/LandingShell";

// Arabic landing pages: no menu, one goal. See LandingShell.

export default function ArabicLandingLayout({ children }: { children: React.ReactNode }) {
  return <LandingShell content={landingChrome.ar}>{children}</LandingShell>;
}
