/** Text statistics — logic adapted from OmniTools (MIT). */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingMinutes: number;
  speakingMinutes: number;
  keywordDensity: { word: string; count: number; percent: number }[];
}

const WORD_RE = /[\p{L}\p{N}''-]+/gu;
export function extractWords(text: string): string[] {
  if (!text.trim()) return [];
  return text.match(WORD_RE) ?? [];
}

export function countWords(text: string): number {
  return extractWords(text).length;
}

export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const parts = trimmed.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g);
  return parts ? parts.filter((s) => s.trim().length > 0).length : 1;
}

export function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\r?\n\s*\r?\n/).filter((p) => p.trim()).length;
}

export function keywordDensity(
  text: string,
  topN = 10
): { word: string; count: number; percent: number }[] {
  const words = extractWords(text).map((w) => w.toLowerCase());
  const total = words.length;
  if (total === 0) return [];
  const freq = new Map<string, number>();
  for (const w of words) {
    if (w.length < 2) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({
      word,
      count,
      percent: Math.round((count / total) * 1000) / 10,
    }));
}

export function computeStats(text: string): TextStats {
  const words = countWords(text);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  return {
    words,
    characters,
    charactersNoSpaces,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: text ? text.split(/\r?\n/).length : 0,
    readingMinutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / 200)),
    speakingMinutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / 150)),
    keywordDensity: keywordDensity(text),
  };
}
