"use client";

import { useState } from "react";
import type { ToolId } from "@/lib/tools-data";
import {
  base64Convert,
  convertCase,
  extractEmails,
  findReplace,
  generatePassword,
  loremIpsum,
  removeDuplicateLines,
  removeExtraSpaces,
  reverseText,
  rot13,
  slugify,
  sortLines,
  splitText,
  textCompare,
  trimText,
  urlDecode,
  urlEncode,
  type CaseMode,
  type SortOrder,
} from "@/lib/text-tools";
import { AdSlot } from "./AdSlot";

export function ToolWorkspace({ toolId }: { toolId: ToolId }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [out, setOut] = useState("");

  const run = () => {
    switch (toolId) {
      case "case-converter":
        setOut(convertCase(a, (b as CaseMode) || "upper"));
        break;
      case "remove-duplicate-lines":
        setOut(removeDuplicateLines(a));
        break;
      case "remove-extra-spaces":
        setOut(removeExtraSpaces(a));
        break;
      case "sort-lines":
        setOut(sortLines(a, (b as SortOrder) || "asc"));
        break;
      case "text-reverse":
        setOut(reverseText(a));
        break;
      case "lorem-ipsum":
        setOut(loremIpsum(Number(a) || 3, Number(b) || 60));
        break;
      case "find-and-replace":
        setOut(findReplace(a, b, c, false));
        break;
      case "base64":
        setOut(base64Convert(a, b !== "decode"));
        break;
      case "slug-generator":
        setOut(slugify(a));
        break;
      case "text-compare":
        setOut(textCompare(a, b).diffLines);
        break;
      case "url-encode":
        setOut(urlEncode(a));
        break;
      case "url-decode":
        setOut(urlDecode(a));
        break;
      case "email-extractor":
        setOut(extractEmails(a));
        break;
      case "password-generator":
        setOut(generatePassword(Number(a) || 16, b !== "0"));
        break;
      case "rot13":
        setOut(rot13(a));
        break;
      case "split-text":
        setOut(splitText(a, b || ","));
        break;
      case "trim-text":
        setOut(trimText(a, Number(b) || 100));
        break;
      default:
        setOut(a);
    }
  };

  if (toolId === "character-counter") {
    return null;
  }

  return (
    <div className="space-y-4">
      {toolId === "lorem-ipsum" || toolId === "password-generator" ? (
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            id="tool-input-a"
            name="tool-input-a"
            className="rounded-xl border border-forest/15 p-3"
            placeholder={toolId === "lorem-ipsum" ? "Paragraphs" : "Length"}
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <input
            id="tool-input-b"
            name="tool-input-b"
            className="rounded-xl border border-forest/15 p-3"
            placeholder={toolId === "lorem-ipsum" ? "Words per paragraph" : "Symbols (1=yes)"}
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </div>
      ) : (
        <>
          <textarea
            id="tool-text-input"
            name="tool-text-input"
            className="w-full min-h-[160px] rounded-2xl border-2 border-forest/15 p-4"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Input text"
          />
          {[
            "find-and-replace",
            "text-compare",
            "split-text",
            "trim-text",
            "base64",
            "case-converter",
          ].includes(toolId) && (
            <input
              id="tool-input-b"
              name="tool-input-b"
              className="w-full rounded-xl border border-forest/15 p-3"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder={
                toolId === "case-converter"
                  ? "Mode: upper | lower | title | sentence"
                  : toolId === "base64"
                    ? "decode to decode"
                    : toolId === "find-and-replace"
                      ? "Find"
                      : "Second value"
              }
            />
          )}
          {toolId === "find-and-replace" && (
            <input
              id="tool-input-c"
              name="tool-input-c"
              className="w-full rounded-xl border border-forest/15 p-3"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="Replace with"
            />
          )}
        </>
      )}
      <button
        type="button"
        onClick={run}
        className="rounded-full bg-gold text-ink font-semibold px-6 py-2 hover:bg-gold/90"
      >
        Run
      </button>
      <textarea
        id="tool-output"
        name="tool-output"
        readOnly
        className="w-full min-h-[120px] rounded-2xl border border-forest/10 bg-mint/10 p-4"
        value={out}
        onChange={(e) => setOut(e.target.value)}
      />
      <AdSlot slot="nativeBanner" />
    </div>
  );
}
