import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath, t } from "@/lib/i18n";
import { ALL_TOOLS } from "@/lib/tools-data";
import { AdSlot, AdGlobalScripts, SponsoredSmartlink } from "./AdSlot";
import { MobileNav } from "./MobileNav";

export function SiteShell({
  locale,
  children,
  path = "",
}: {
  locale: Locale;
  children: React.ReactNode;
  path?: string;
}) {
  const m = t(locale);
  const other = locale === "en" ? "fr" : "en";
  const switchHref = localePath(other, path);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <AdGlobalScripts />
      <header className="border-b border-forest/10 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-4 justify-between">
          <Link href={localePath(locale)} className="flex items-center gap-2 font-display text-xl text-forest font-semibold">
            <img src="/favicon.svg" alt="" width={32} height={32} className="rounded-lg" />
            {m.brand}
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <MobileNav locale={locale} />
            <span className="hidden sm:inline rounded-full bg-mint/30 px-3 py-1 text-forest">{m.privacyBadge}</span>
            <Link href={switchHref} className="text-forest underline-offset-2 hover:underline font-medium">
              {locale === "en" ? m.switchFr : m.switchEn}
            </Link>
          </div>
        </div>
        <AdSlot slot="banner728x90" className="hidden md:flex border-t border-forest/5 py-2" />
        <AdSlot slot="banner320x50" className="md:hidden border-t border-forest/5 py-1" />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 flex gap-8">
        <aside className="hidden lg:block w-44 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-forest/70 mb-3">{m.navTools}</p>
          <nav className="flex flex-col gap-1 text-sm">
            <Link href={localePath(locale)} className="hover:text-gold text-forest">
              {locale === "en" ? "Word Counter" : "Compteur de mots"}
            </Link>
            {ALL_TOOLS.map((tool) => (
              <Link key={tool.slug} href={localePath(locale, tool.slug)} className="hover:text-gold text-forest/90">
                {locale === "en" ? tool.en.h1 : tool.fr.h1}
              </Link>
            ))}
          </nav>
          <AdSlot slot="banner160x300" className="mt-6" />
          <AdSlot slot="banner160x600" className="mt-4 sticky top-32" />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <SponsoredSmartlink locale={locale} />
      <div className="hidden sm:flex justify-center py-2 border-t border-forest/5 bg-white">
        <AdSlot slot="banner468x60" />
      </div>
      <footer className="border-t border-forest/10 bg-white mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-2 gap-6 text-sm text-forest/80">
          <div>
            <p>
              {m.brand} {m.footerBy}{" "}
              <a href="https://gentil.quevvy.com" className="text-forest font-medium hover:text-gold">
                Gentil M.
              </a>
            </p>
            <p className="mt-2">
              {m.basedOn}{" "}
              <a href="https://github.com/iib0011/omni-tools" className="underline">
                OmniTools
              </a>{" "}
              (MIT)
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href={localePath(locale, "privacy")}>Privacy</Link>
            <Link href={localePath(locale, "terms")}>Terms</Link>
            <Link href={localePath(locale, "about")}>About</Link>
            <Link href={localePath(locale, "contact")}>Contact</Link>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-forest/10 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <AdSlot slot="banner320x50" />
      </div>
      <div className="h-14 md:h-0 shrink-0" aria-hidden />
    </div>
  );
}
