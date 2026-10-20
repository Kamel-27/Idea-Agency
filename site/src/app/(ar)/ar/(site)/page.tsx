import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { HomePage } from "@/components/sections/home/HomePage";

export const metadata: Metadata = {
  description: homeContent.ar.meta.description,
};

export default function Page() {
  return <HomePage content={homeContent.ar} />;
}
