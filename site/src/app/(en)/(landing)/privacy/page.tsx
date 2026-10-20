import type { Metadata } from "next";
import { privacyContent } from "@/content/landing/privacy";
import { PrivacyPage } from "@/components/landing/PrivacyPage";

export const metadata: Metadata = {
  title: privacyContent.en.meta.title,
};

export default function Page() {
  return <PrivacyPage content={privacyContent.en} />;
}
