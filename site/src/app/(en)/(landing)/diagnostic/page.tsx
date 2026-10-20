import type { Metadata } from "next";
import { diagnosticEn } from "@/content/landing/diagnostic.en";
import { DiagnosticPage } from "@/components/landing/DiagnosticPage";

export const metadata: Metadata = {
  title: diagnosticEn.meta.title,
  description: diagnosticEn.meta.description,
};

export default function Page() {
  return <DiagnosticPage content={diagnosticEn} />;
}
