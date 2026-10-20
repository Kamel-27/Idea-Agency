import { landingChrome } from "@/content/landing/shared";
import { LandingShell } from "@/components/landing/LandingShell";

// English landing pages: no menu, one goal. See LandingShell.

export default function EnglishLandingLayout({ children }: { children: React.ReactNode }) {
  return <LandingShell content={landingChrome.en}>{children}</LandingShell>;
}
