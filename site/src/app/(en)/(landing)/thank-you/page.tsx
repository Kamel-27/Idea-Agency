import type { Metadata } from "next";
import { landingChrome, thankYouContent } from "@/content/landing/shared";
import { ThankYouPage } from "@/components/landing/ThankYouPage";

export const metadata: Metadata = {
  title: thankYouContent.en.meta.title,
  robots: { index: false }, // only reachable after the form, keep it out of Google
};

export default function Page() {
  return <ThankYouPage content={thankYouContent.en} chrome={landingChrome.en} />;
}
