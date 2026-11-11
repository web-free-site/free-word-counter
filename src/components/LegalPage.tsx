import { SiteShell } from "./SiteShell";
import type { Locale } from "@/lib/i18n";

const copy: Record<string, { en: { title: string; body: string }; fr: { title: string; body: string } }> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      body: "Free Word Counter processes text only in your browser. We do not collect, store, or sell your content. Analytics or ads from third parties (Adsterra) may set cookies according to their policies. Contact gentil@quevvy.com for questions.",
    },
    fr: {
      title: "Politique de confidentialité",
      body: "Compteur de Mots Gratuit traite le texte uniquement dans votre navigateur. Nous ne collectons pas votre contenu. Les annonceurs tiers (Adsterra) peuvent utiliser des cookies selon leurs politiques. Contact : gentil@quevvy.com.",
    },
  },
  terms: {
    en: {
      title: "Terms of Use",
      body: "Use these tools at your own risk. They are provided free without warranty. Do not use them for unlawful purposes. Gentil M. may update these terms at any time.",
    },
    fr: {
      title: "Conditions d'utilisation",
      body: "Outils fournis sans garantie. Usage à vos risques. Ne pas utiliser à des fins illégales.",
    },
  },
  about: {
    en: {
      title: "About",
      body: "Free Word Counter is built by Gentil M. in Kigali, Rwanda, to offer fast, private text utilities for everyone. Based on the open-source OmniTools project (MIT).",
    },
    fr: {
      title: "À propos",
      body: "Compteur de Mots Gratuit est créé par Gentil M. à Kigali. Basé sur OmniTools (MIT).",
    },
  },
  contact: {
    en: {
      title: "Contact",
      body: "Email: gentil@quevvy.com — Website: https://gentil.quevvy.com",
    },
    fr: {
      title: "Contact",
      body: "Courriel : gentil@quevvy.com — Site : https://gentil.quevvy.com",
    },
  },
};

export function LegalPage({ locale, page }: { locale: Locale; page: string }) {
  const c = copy[page]?.[locale] ?? copy.privacy.en;
  return (
    <SiteShell locale={locale} path={page}>
      <h1 className="font-display text-3xl text-forest mb-6">{c.title}</h1>
      <p className="text-forest/90 leading-relaxed max-w-2xl">{c.body}</p>
    </SiteShell>
  );
}
