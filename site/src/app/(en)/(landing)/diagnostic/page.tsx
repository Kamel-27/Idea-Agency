import type { Metadata } from "next";
import { diagnosticEn, diagnosticEnImages } from "@/content/landing/diagnostic.en";
import { LandingPage } from "@/components/landing/LandingPage";

// The address stays /diagnostic: ads and shared links point here.

export const metadata: Metadata = {
  title: diagnosticEn.meta.title,
  description: diagnosticEn.meta.description,
};

export default function Page() {
  return <LandingPage content={diagnosticEn} images={diagnosticEnImages} />;
}
