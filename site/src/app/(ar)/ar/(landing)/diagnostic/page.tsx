import type { Metadata } from "next";
import { diagnosticAr } from "@/content/landing/diagnostic.ar";
import { DiagnosticPage } from "@/components/landing/DiagnosticPage";

export const metadata: Metadata = {
  title: diagnosticAr.meta.title,
  description: diagnosticAr.meta.description,
};

export default function Page() {
  return <DiagnosticPage content={diagnosticAr} />;
}
