import { describe, expect, it } from "vitest";
import { computeStats, countWords, extractWords } from "./count";

describe("countWords EN", () => {
  it("counts simple English", () => {
    expect(countWords("Hello world")).toBe(2);
    expect(computeStats("Hello world. Second sentence!").words).toBe(4);
  });

  it("reading and speaking time", () => {
    const words = Array(400).fill("word").join(" ");
    const s = computeStats(words);
    expect(s.readingMinutes).toBe(2);
    expect(s.speakingMinutes).toBe(3);
  });
});

describe("countWords FR", () => {
  it("handles accented French words", () => {
    const fr = "Kigali est belle. L'école française compte les élèves.";
    const words = extractWords(fr);
    expect(words.length).toBeGreaterThanOrEqual(8);
    expect(words.some((w) => w.includes("école") || w.includes("L'école"))).toBe(
      true
    );
    expect(countWords("café résumé naïve")).toBe(3);
  });

  it("paragraphs with blank lines", () => {
    expect(computeStats("Un paragraphe.\n\nDeuxième paragraphe.").paragraphs).toBe(
      2
    );
  });
});
