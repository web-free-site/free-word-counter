"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { localePath, t } from "@/lib/i18n";
import { ALL_TOOLS } from "@/lib/tools-data";

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const m = t(locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-tools-menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-forest/20 px-3 py-2 text-sm font-medium text-forest hover:bg-mint/20"
      >
        {m.navTools}
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-tools-menu"
            className="fixed top-0 right-0 z-50 h-full w-[min(100%,20rem)] overflow-y-auto bg-white shadow-xl border-l border-forest/10 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest/70">
                {m.navTools}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-forest/70 hover:text-forest px-2 py-1"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href={localePath(locale)}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-mint/20 text-forest"
                >
                  {locale === "en" ? "Word Counter" : "Compteur de mots"}
                </Link>
              </li>
              {ALL_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={localePath(locale, tool.slug)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-mint/20 text-forest/90"
                  >
                    {locale === "en" ? tool.en.h1 : tool.fr.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
