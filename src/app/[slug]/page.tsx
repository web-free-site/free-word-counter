import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPageView, buildMetadata } from "@/components/ToolPageView";
import { getToolBySlug, TOOL_SLUGS } from "@/lib/tools-data";

const LEGAL = ["privacy", "terms", "about", "contact"] as const;

export function generateStaticParams() {
  return [...TOOL_SLUGS, ...LEGAL].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if ((LEGAL as readonly string[]).includes(slug)) {
    return { title: `${slug} | Free Word Counter` };
  }
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildMetadata("en", tool);
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if ((LEGAL as readonly string[]).includes(slug)) {
    const { LegalPage } = await import("@/components/LegalPage");
    return <LegalPage locale="en" page={slug} />;
  }
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  return <ToolPageView locale="en" tool={tool} />;
}
