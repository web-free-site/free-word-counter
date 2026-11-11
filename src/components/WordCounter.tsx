"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { computeStats } from "@/lib/count";
import { AdSlot } from "./AdSlot";

export function WordCounter({ locale }: { locale: Locale }) {
  const m = t(locale);
  const [text, setText] = useState("");
  const stats = useMemo(() => computeStats(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        id="word-counter-input"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={m.paste}
        className="w-full min-h-[220px] rounded-2xl border-2 border-forest/15 bg-white p-4 text-base shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        spellCheck
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setText("")}
          className="rounded-full border border-forest/20 px-4 py-2 text-sm hover:bg-mint/20"
        >
          {m.clear}
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(text)}
          className="rounded-full bg-forest text-cream px-4 py-2 text-sm hover:bg-forest/90"
        >
          {m.copy}
        </button>
      </div>

      <StatsGrid stats={stats} locale={locale} />
      <AdSlot slot="nativeBanner" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white border border-forest/10 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-forest/60">{label}</p>
      <p className="text-2xl font-display font-semibold text-forest mt-1">{value}</p>
    </div>
  );
}

function StatsGrid({ stats, locale }: { stats: ReturnType<typeof computeStats>; locale: Locale }) {
  const m = t(locale);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <Stat label={m.words} value={stats.words} />
        <Stat label={m.characters} value={stats.characters} />
        <Stat label={m.charsNoSpace} value={stats.charactersNoSpaces} />
        <Stat label={m.sentences} value={stats.sentences} />
        <Stat label={m.paragraphs} value={stats.paragraphs} />
        <Stat label={m.lines} value={stats.lines} />
        <Stat
          label={m.reading}
          value={stats.words ? `~${stats.readingMinutes} ${m.minutes}` : "—"}
        />
        <Stat
          label={m.speaking}
          value={stats.words ? `~${stats.speakingMinutes} ${m.minutes}` : "—"}
        />
      </div>
      {stats.keywordDensity.length > 0 && (
        <div className="rounded-2xl border border-forest/10 bg-white p-4">
          <p className="text-sm font-semibold text-forest mb-2">{m.keywordDensity}</p>
          <ul className="flex flex-wrap gap-2 text-sm">
            {stats.keywordDensity.map((k) => (
              <li key={k.word} className="rounded-full bg-mint/25 px-3 py-1">
                {k.word} <span className="text-forest/60">({k.percent}%)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
