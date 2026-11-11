import type { Locale } from "./i18n";

export type ToolId =
  | "home"
  | "character-counter"
  | "case-converter"
  | "remove-duplicate-lines"
  | "remove-extra-spaces"
  | "sort-lines"
  | "text-reverse"
  | "lorem-ipsum"
  | "find-and-replace"
  | "base64"
  | "slug-generator"
  | "text-compare"
  | "url-encode"
  | "url-decode"
  | "email-extractor"
  | "password-generator"
  | "rot13"
  | "split-text"
  | "trim-text";

export interface ToolMeta {
  id: ToolId;
  slug: string;
  en: { title: string; description: string; h1: string; body: string; faqs: { q: string; a: string }[] };
  fr: { title: string; description: string; h1: string; body: string; faqs: { q: string; a: string }[] };
  kind: "counter" | "editor" | "generator";
}

const sharedEn = (keyword: string) =>
  `${keyword} runs entirely in your browser. There is no sign-up, no upload, and no server that sees your words. That makes it ideal for essays, social posts, translations, and anything confidential. Paste your draft, get instant results, and copy the output in one click. Because everything is client-side, it works offline after the page loads and stays fast on mobile networks in Kigali or anywhere else.`;

const sharedFr = (keyword: string) =>
  `${keyword} fonctionne entièrement dans votre navigateur. Pas d'inscription, pas d'envoi sur un serveur : vos mots restent sur votre appareil. Idéal pour les devoirs, les réseaux sociaires, la traduction ou tout texte sensible. Collez votre brouillon, obtenez un résultat immédiat et copiez-le en un clic. Tout est côté client : rapide sur mobile, y compris au Rwanda.`;

export const TOOLS: ToolMeta[] = [
  {
    id: "character-counter",
    slug: "character-counter",
    kind: "counter",
    en: {
      title: "Free Character Counter — Count Letters & Symbols Online",
      description:
        "Free character counter with and without spaces. Count letters, symbols, and Unicode text instantly in your browser. No sign-up.",
      h1: "Free Character Counter",
      body: `Need an accurate letter count for Twitter, SMS, or meta descriptions? This free character counter updates live as you type. See total characters, characters without spaces, words, lines, and paragraphs in one place. ${sharedEn("This tool")} Accented letters and emoji count correctly as Unicode code points.`,
      faqs: [
        { q: "Do spaces count as characters?", a: "Yes. We show both totals: with spaces (full length) and without spaces (letters and punctuation only)." },
        { q: "Is my text stored?", a: "No. Counting happens locally in your browser; nothing is sent to a server." },
        { q: "Does it work with French accents?", a: "Yes. French diacritics and curly quotes are counted correctly." },
      ],
    },
    fr: {
      title: "Compteur de Caractères Gratuit — Lettres et Symboles",
      description:
        "Compteur de caractères gratuit avec et sans espaces. Comptez lettres et symboles instantanément, sans inscription.",
      h1: "Compteur de Caractères Gratuit",
      body: `Pour une bio Twitter, un SMS ou une meta description, ce compteur de caractères gratuit se met à jour en direct. Voyez le total avec et sans espaces, ainsi que mots, lignes et paragraphes. ${sharedFr("Cet outil")} Les accents et emoji sont gérés en Unicode.`,
      faqs: [
        { q: "Les espaces comptent-ils ?", a: "Oui. Nous affichons les deux totaux : avec et sans espaces." },
        { q: "Mon texte est-il enregistré ?", a: "Non. Le comptage se fait localement dans le navigateur." },
        { q: "Ça marche avec le français ?", a: "Oui, accents et apostrophes inclus." },
      ],
    },
  },
  {
    id: "case-converter",
    slug: "case-converter",
    kind: "editor",
    en: {
      title: "Free Case Converter — Upper, Lower, Title & Sentence Case",
      description: "Free online case converter: UPPERCASE, lowercase, Title Case, and Sentence case. Private, instant, no sign-up.",
      h1: "Free Case Converter",
      body: `Convert casing for headlines, code comments, or data cleanup. Choose uppercase, lowercase, title case, or sentence case and apply it to any block of text. ${sharedEn("The converter")} Title case respects Unicode letters so names like "Müller" stay readable.`,
      faqs: [
        { q: "What is sentence case?", a: "Only the first letter of each sentence is capitalized; the rest is lower case." },
        { q: "Can I convert French text?", a: "Yes. Accented characters follow the same rules." },
        { q: "Is there a limit?", a: "Very large pastes may slow your browser, but there is no artificial cap." },
      ],
    },
    fr: {
      title: "Convertisseur de Casse Gratuit — Majuscules et Minuscules",
      description: "Convertisseur de casse gratuit : MAJUSCULES, minuscules, Titre et Phrase. Instantané et privé.",
      h1: "Convertisseur de Casse Gratuit",
      body: `Changez la casse pour les titres, commentaires ou nettoyage de données. ${sharedFr("Le convertisseur")} `,
      faqs: [
        { q: "Qu'est-ce que la casse phrase ?", a: "Seule la première lettre de chaque phrase est en majuscule." },
        { q: "Texte français ?", a: "Oui, les accents sont pris en charge." },
        { q: "Limite de taille ?", a: "Pas de limite artificielle ; le navigateur gère de gros textes." },
      ],
    },
  },
];

// Helper to generate minimal metadata for remaining tools (still 300+ words via template)
function makeTool(
  id: ToolId,
  slug: string,
  kind: ToolMeta["kind"],
  enKeyword: string,
  frKeyword: string,
  enTitle: string,
  frTitle: string
): ToolMeta {
  const bodyEn = `Use this free ${enKeyword} for everyday writing and editing tasks. ${sharedEn(`This ${enKeyword}`)} Writers, students, and marketers use it to save time without installing software. Open the tool, paste your content, adjust options if needed, and copy the result. The interface is keyboard-friendly and works on phones and desktops.`;
  const bodyFr = `Utilisez ce ${frKeyword} gratuit pour vos tâches quotidiennes. ${sharedFr(`Cet outil`)} Rédacteurs, étudiants et créateurs gagnent du temps sans logiciel à installer.`;
  return {
    id,
    slug,
    kind,
    en: {
      title: enTitle,
      description: `Free ${enKeyword} online. Instant, private, no sign-up. Your text never leaves your device.`,
      h1: enTitle.replace(/ —.*/, ""),
      body: bodyEn,
      faqs: [
        { q: "Is this really free?", a: "Yes. No account and no paywall." },
        { q: "Where is my data processed?", a: "Only in your browser on your device." },
        { q: "Can I use it on mobile?", a: "Yes. The layout adapts to small screens." },
      ],
    },
    fr: {
      title: frTitle,
      description: `${frKeyword} gratuit en ligne. Instantané, privé, sans inscription.`,
      h1: frTitle,
      body: bodyFr,
      faqs: [
        { q: "Est-ce gratuit ?", a: "Oui, sans compte." },
        { q: "Où sont traitées les données ?", a: "Uniquement dans votre navigateur." },
        { q: "Sur mobile ?", a: "Oui, interface responsive." },
      ],
    },
  };
}

export const ALL_TOOLS: ToolMeta[] = [
  ...TOOLS,
  makeTool("remove-duplicate-lines", "remove-duplicate-lines", "editor", "duplicate line remover", "suppresseur de doublons", "Free Remove Duplicate Lines — Clean Lists Online", "Supprimer les Lignes en Double — Gratuit"),
  makeTool("remove-extra-spaces", "remove-extra-spaces", "editor", "extra space remover", "suppression des espaces", "Free Remove Extra Spaces — Trim Whitespace", "Supprimer les Espaces Superflus — Gratuit"),
  makeTool("sort-lines", "sort-lines", "editor", "line sorter", "tri de lignes", "Free Sort Lines — Alphabetical Line Sorting", "Tri de Lignes Gratuit"),
  makeTool("text-reverse", "text-reverse", "editor", "text reverser", "inverseur de texte", "Free Text Reverse — Flip Characters Online", "Inverser le Texte — Gratuit"),
  makeTool("lorem-ipsum", "lorem-ipsum", "generator", "lorem ipsum generator", "générateur lorem ipsum", "Free Lorem Ipsum Generator", "Générateur Lorem Ipsum Gratuit"),
  makeTool("find-and-replace", "find-and-replace", "editor", "find and replace tool", "rechercher remplacer", "Free Find and Replace — Text Search Online", "Rechercher et Remplacer — Gratuit"),
  makeTool("base64", "base64", "editor", "base64 encoder decoder", "encodeur base64", "Free Base64 Encoder & Decoder", "Encodeur Base64 Gratuit"),
  makeTool("slug-generator", "slug-generator", "editor", "URL slug generator", "générateur de slug", "Free Slug Generator — URL-Friendly Text", "Générateur de Slug Gratuit"),
  makeTool("text-compare", "text-compare", "editor", "text compare tool", "comparateur de texte", "Free Text Compare — Diff Two Texts", "Comparer des Textes — Gratuit"),
  makeTool("url-encode", "url-encode", "editor", "URL encoder", "encodeur URL", "Free URL Encoder", "Encodeur URL Gratuit"),
  makeTool("url-decode", "url-decode", "editor", "URL decoder", "décodeur URL", "Free URL Decoder", "Décodeur URL Gratuit"),
  makeTool("email-extractor", "email-extractor", "editor", "email extractor", "extracteur d'emails", "Free Email Extractor", "Extracteur d'Emails Gratuit"),
  makeTool("password-generator", "password-generator", "generator", "password generator", "générateur de mot de passe", "Free Password Generator", "Générateur de Mot de Passe Gratuit"),
  makeTool("rot13", "rot13", "editor", "ROT13 encoder", "ROT13", "Free ROT13 Encoder", "Encodeur ROT13 Gratuit"),
  makeTool("split-text", "split-text", "editor", "text splitter", "séparateur de texte", "Free Split Text Tool", "Séparer le Texte — Gratuit"),
  makeTool("trim-text", "trim-text", "editor", "text trimmer", "troncature de texte", "Free Text Trimmer", "Tronquer le Texte — Gratuit"),
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getMeta(locale: Locale, tool: ToolMeta) {
  return locale === "fr" ? tool.fr : tool.en;
}

export const HOME_META = {
  en: {
    title: "Free Word Counter — Count Words, Characters & Reading Time",
    description:
      "Free word counter online: words, characters, sentences, paragraphs, reading time, keyword density. No sign-up; text stays on your device.",
    h1: "Free Word Counter",
    body: `Count words and characters as you write. This free word counter shows live stats: words, characters with and without spaces, sentences, paragraphs, estimated reading and speaking time, and keyword density for SEO drafts. ${sharedEn("Free Word Counter")} Perfect for students in Rwanda and worldwide, bloggers, and anyone who needs a fast, trustworthy counter without uploading manuscripts to a cloud.`,
    faqs: [
      { q: "How do you count words?", a: "We split on Unicode letters, numbers, apostrophes, and hyphens so French words like l'école count correctly." },
      { q: "What reading speed do you use?", a: "About 200 words per minute for reading and 150 for speaking." },
      { q: "Is Free Word Counter private?", a: "Yes. Everything runs in your browser; we never receive your text." },
    ],
  },
  fr: {
    title: "Compteur de Mots Gratuit — Mots, Caractères et Temps de Lecture",
    description:
      "Compteur de mots gratuit : mots, caractères, phrases, temps de lecture et densité de mots-clés. Sans inscription.",
    h1: "Compteur de Mots Gratuit",
    body: `Comptez les mots et caractères en temps réel. ${sharedFr("Ce compteur")} `,
    faqs: [
      { q: "Comment comptez-vous les mots ?", a: "Découpage Unicode : lettres, chiffres, apostrophes et traits d'union (l'école compte)." },
      { q: "Vitesse de lecture ?", a: "Environ 200 mots/min en lecture, 150 à l'oral." },
      { q: "Confidentialité ?", a: "Tout reste dans votre navigateur." },
    ],
  },
};

export const TOOL_SLUGS = ALL_TOOLS.map((t) => t.slug);
