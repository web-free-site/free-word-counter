import { SiteShell } from "./SiteShell";
import { WordCounter } from "./WordCounter";
import { ToolWorkspace } from "./ToolWorkspace";
import { ContentSection } from "./ContentSection";
import type { Locale } from "@/lib/i18n";
import { alternateUrls, t } from "@/lib/i18n";
import { canonicalFor, jsonLdApp, jsonLdBreadcrumb, jsonLdFaq } from "@/lib/seo";
import type { ToolMeta } from "@/lib/tools-data";
import { HOME_META, getMeta } from "@/lib/tools-data";
import Link from "next/link";
import { ALL_TOOLS } from "@/lib/tools-data";

export function ToolPageView({
  locale,
  tool,
  isHome,
}: {
  locale: Locale;
  tool?: ToolMeta;
  isHome?: boolean;
}) {
  const m = t(locale);
  const meta = isHome ? HOME_META[locale] : tool ? getMeta(locale, tool) : HOME_META[locale];
  const path = isHome ? (locale === "fr" ? "/fr" : "/") : `/${locale === "fr" ? "fr/" : ""}${tool!.slug}`;
  const canon = canonicalFor(path);
  const alt = alternateUrls(isHome ? "" : tool!.slug);

  return (
    <SiteShell locale={locale} path={isHome ? "" : tool!.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdApp(meta.h1, meta.description, canon)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq(meta.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: m.home, url: locale === "fr" ? alt.fr : alt.en },
              ...(tool
                ? [{ name: meta.h1, url: canon }]
                : []),
            ])
          ),
        }}
      />

      <p className="text-gold font-medium text-sm mb-2">{t(locale).tagline}</p>
      <h1 className="font-display text-3xl md:text-4xl text-forest font-semibold mb-6">{meta.h1}</h1>

      {isHome || tool?.id === "character-counter" ? (
        <WordCounter locale={locale} />
      ) : tool ? (
        <ToolWorkspace toolId={tool.id} />
      ) : null}

      <ContentSection body={meta.body} faqs={meta.faqs} faqTitle={m.faq} />

      <section className="mt-12">
        <h2 className="font-display text-xl text-forest mb-3">{m.related}</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {ALL_TOOLS.slice(0, 8).map((tl) => (
            <li key={tl.slug}>
              <Link href={locale === "fr" ? `/fr/${tl.slug}/` : `/${tl.slug}/`} className="text-forest hover:text-gold underline-offset-2 hover:underline">
                {locale === "fr" ? tl.fr.h1 : tl.en.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </SiteShell>
  );
}

export function buildMetadata(locale: Locale, tool?: ToolMeta, isHome?: boolean) {
  const meta = isHome ? HOME_META[locale] : tool ? getMeta(locale, tool) : HOME_META.en;
  const path = isHome ? (locale === "fr" ? "/fr/" : "/") : `/${locale === "fr" ? "fr/" : ""}${tool!.slug}/`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalFor(path),
      languages: alternateUrls(isHome ? "" : tool!.slug),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalFor(path),
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: meta.title,
      description: meta.description,
    },
  };
}
