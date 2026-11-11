import type { Metadata } from "next";
import { ToolPageView, buildMetadata } from "@/components/ToolPageView";

export const metadata: Metadata = buildMetadata("en", undefined, true);

export default function HomePage() {
  return <ToolPageView locale="en" isHome />;
}
