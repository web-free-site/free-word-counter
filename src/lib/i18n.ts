export type Locale = "en" | "fr";

export const SITE_URL = "https://free-word-counter.web-free.site";

export const messages = {
  en: {
    brand: "Free Word Counter",
    tagline: "Free, instant, private — your text never leaves your device.",
    navTools: "Text tools",
    switchFr: "Français",
    switchEn: "English",
    words: "Words",
    characters: "Characters",
    charsNoSpace: "Characters (no spaces)",
    sentences: "Sentences",
    paragraphs: "Paragraphs",
    lines: "Lines",
    reading: "Reading time",
    speaking: "Speaking time",
    keywordDensity: "Top keywords",
    paste: "Paste or type your text",
    clear: "Clear",
    copy: "Copy",
    minutes: "min",
    privacyBadge: "100% client-side",
    footerBy: "by",
    basedOn: "Based on",
    faq: "Frequently asked questions",
    related: "More free text tools",
    home: "Home",
  },
  fr: {
    brand: "Compteur de Mots Gratuit",
    tagline: "Gratuit, instantané, privé — votre texte ne quitte jamais votre appareil.",
    navTools: "Outils texte",
    switchFr: "Français",
    switchEn: "English",
    words: "Mots",
    characters: "Caractères",
    charsNoSpace: "Caractères (sans espaces)",
    sentences: "Phrases",
    paragraphs: "Paragraphes",
    lines: "Lignes",
    reading: "Temps de lecture",
    speaking: "Temps de parole",
    keywordDensity: "Mots-clés fréquents",
    paste: "Collez ou saisissez votre texte",
    clear: "Effacer",
    copy: "Copier",
    minutes: "min",
    privacyBadge: "100 % côté client",
    footerBy: "par",
    basedOn: "Basé sur",
    faq: "Questions fréquentes",
    related: "Autres outils texte gratuits",
    home: "Accueil",
  },
} as const;

export type Messages = (typeof messages)[Locale];

export function t(locale: Locale): Messages {
  return messages[locale];
}

export function localePath(locale: Locale, path = ""): string {
  const base = locale === "fr" ? "/fr" : "";
  const p = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${base}${p || "/"}`;
}

export function alternateUrls(path: string): { en: string; fr: string } {
  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  return {
    en: `${SITE_URL}/${slug ? slug + "/" : ""}`,
    fr: `${SITE_URL}/fr/${slug ? slug + "/" : ""}`,
  };
}
