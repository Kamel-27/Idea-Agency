import type { Metadata } from "next";
import { diagnosticAr, diagnosticArImages } from "@/content/landing/diagnostic.ar";
import { LandingPage } from "@/components/landing/LandingPage";

// The address stays /ar/diagnostic: the running ads link here.

export const metadata: Metadata = {
  title: diagnosticAr.meta.title,
  description: diagnosticAr.meta.description,
};

export default function Page() {
  return <LandingPage content={diagnosticAr} images={diagnosticArImages} />;
}
