import type { Metadata } from "next";
import { ToolPageView, buildMetadata } from "@/components/ToolPageView";

export const metadata: Metadata = buildMetadata("fr", undefined, true);

export default function FrHomePage() {
  return <ToolPageView locale="fr" isHome />;
}
