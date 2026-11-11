/** Client-side text utilities — adapted from OmniTools string tools (MIT). */

export type CaseMode = "upper" | "lower" | "title" | "sentence";

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(
        /\p{L}[\p{L}\p{N}'’-]*/gu,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      );
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*\p{L}|[.!?…]\s+\p{L})/gu, (m) => m.toUpperCase());
  }
}

export type DuplicateMode = "all" | "consecutive";

export function removeDuplicateLines(
  text: string,
  mode: DuplicateMode = "all",
  trimLines = true
): string {
  let lines = text.split("\n");
  if (trimLines) lines = lines.map((l) => l.trimEnd());
  if (mode === "consecutive") {
    return lines.filter((line, i, arr) => i === 0 || line !== arr[i - 1]).join("\n");
  }
  const seen = new Set<string>();
  return lines
    .filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    })
    .join("\n");
}

export function removeExtraSpaces(text: string): string {
  return text
    .replace(/[^\S\n]+/g, " ")
    .replace(/^ +| +$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

export type SortOrder = "asc" | "desc" | "length-asc" | "length-desc";

export function sortLines(text: string, order: SortOrder = "asc"): string {
  const lines = text.split("\n");
  const cmp = (a: string, b: string) =>
    order === "desc" ? b.localeCompare(a, undefined, { sensitivity: "base" }) : a.localeCompare(b, undefined, { sensitivity: "base" });
  if (order === "length-asc") lines.sort((a, b) => a.length - b.length || cmp(a, b));
  else if (order === "length-desc") lines.sort((a, b) => b.length - a.length || cmp(a, b));
  else lines.sort(cmp);
  return lines.join("\n");
}

export function reverseText(text: string): string {
  return [...text].reverse().join("");
}

const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

export function loremIpsum(paragraphs: number, wordsPerParagraph = 60): string {
  const words = LOREM.split(/\s+/);
  const out: string[] = [];
  let wi = 0;
  for (let p = 0; p < paragraphs; p++) {
    const chunk: string[] = [];
    for (let i = 0; i < wordsPerParagraph; i++) {
      chunk.push(words[wi % words.length]);
      wi++;
    }
    const sentence = chunk.join(" ");
    out.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
  }
  return out.join("\n\n");
}

export function findReplace(
  text: string,
  search: string,
  replace: string,
  useRegex = false
): string {
  if (!search) return text;
  if (useRegex) {
    try {
      const m = search.match(/^\/(.*)\/([a-z]*)$/i);
      const re = m ? new RegExp(m[1], m[2]) : new RegExp(search, "gi");
      return text.replace(re, replace);
    } catch {
      return text;
    }
  }
  return text.split(search).join(replace);
}

export function base64Convert(text: string, encode: boolean): string {
  if (encode) {
    return btoa(unescape(encodeURIComponent(text)));
  }
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch {
    return "";
  }
}

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textCompare(a: string, b: string): { equal: boolean; diffLines: string } {
  const equal = a === b;
  const max = Math.max(a.split("\n").length, b.split("\n").length);
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const diff: string[] = [];
  for (let i = 0; i < max; i++) {
    const la = linesA[i] ?? "";
    const lb = linesB[i] ?? "";
    if (la !== lb) diff.push(`Line ${i + 1}: "${la}" | "${lb}"`);
  }
  return { equal, diffLines: diff.join("\n") || "No differences." };
}

export function urlEncode(text: string, componentOnly = false): string {
  return componentOnly ? encodeURIComponent(text) : encodeURI(text);
}

export function urlDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export function extractEmails(text: string): string {
  const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return [...new Set(text.match(re) ?? [])].join("\n");
}

export function generatePassword(length = 16, symbols = true): string {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const sym = "!@#$%^&*-_+=?";
  let pool = lower + upper + digits;
  if (symbols) pool += sym;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => pool[n % pool.length]).join("");
}

export function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function splitText(text: string, delimiter: string): string {
  if (!delimiter) return text;
  return text.split(delimiter).join("\n");
}

export function trimText(text: string, maxLen: number): string {
  if (maxLen <= 0 || text.length <= maxLen) return text;
  return text.slice(0, maxLen) + "…";
}
