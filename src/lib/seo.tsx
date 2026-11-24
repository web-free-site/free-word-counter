import type { Locale } from "./i18n";
import { alternateUrls, SITE_URL } from "./i18n";

export function jsonLdApp(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function jsonLdFaq(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function jsonLdBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function canonicalFor(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith("/") ? p : p + "/"}`;
}

export function buildLegalMetadata(locale: Locale, page: string) {
  const path = locale === "fr" ? `/fr/${page}/` : `/${page}/`;
  const title =
    locale === "fr" ? `${page} | Compteur de Mots Gratuit` : `${page} | Free Word Counter`;
  return {
    title,
    alternates: {
      canonical: canonicalFor(path),
      languages: alternateUrls(page),
    },
    openGraph: {
      title,
      url: canonicalFor(path),
      type: "website" as const,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      images: ["/og.png"],
    },
  };
}
