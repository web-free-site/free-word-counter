import Link from "next/link";
import { AdSlot } from "./AdSlot";

export function HomeEnContent({
  faqs,
  faqTitle,
}: {
  faqs: { q: string; a: string }[];
  faqTitle: string;
}) {
  return (
    <>
      <div className="my-8 flex flex-col items-center gap-6">
        <AdSlot slot="banner300x250" />
        <AdSlot slot="banner468x60" className="sm:hidden" />
      </div>
      <article className="prose prose-forest max-w-none mt-10 space-y-4 text-forest/90 leading-relaxed">
        <p>
          Whether you are polishing an essay, sizing a blog post, or checking a social caption, a reliable word
          counter saves guesswork. This free word counter updates live as you type or paste: you see words,
          characters with and without spaces, sentences, paragraphs, estimated reading time, speaking time, and
          useful keyword hints for SEO drafts. Everything runs in your browser, so your draft never uploads to
          a server—handy for confidential work, classroom assignments, and client copy.
        </p>
        <p>
          Students use word counts to hit assignment limits; bloggers and marketers track length for readability;
          speakers check speaking time before presentations; translators compare source and target length; and
          anyone writing meta titles or ad copy pairs this tool with our{" "}
          <Link href="/character-counter/" className="text-forest underline-offset-2 hover:text-gold hover:underline">
            character counter
          </Link>{" "}
          for strict character caps. For step-by-step help, see our guides on{" "}
          <Link
            href="/how-to-check-essay-word-count/"
            className="text-forest underline-offset-2 hover:text-gold hover:underline"
          >
            checking essay word count
          </Link>
          ,{" "}
          <Link
            href="/how-to-count-characters-for-a-meta-title/"
            className="text-forest underline-offset-2 hover:text-gold hover:underline"
          >
            counting characters for a meta title
          </Link>
          , and{" "}
          <Link
            href="/how-to-estimate-speaking-time-for-a-speech/"
            className="text-forest underline-offset-2 hover:text-gold hover:underline"
          >
            estimating speaking time for a speech
          </Link>
          . Browse more privacy-friendly utilities on{" "}
          <a
            href="https://web-free.site/"
            className="text-forest underline-offset-2 hover:text-gold hover:underline"
          >
            web-free.site
          </a>
          .
        </p>
        <p>
          No account, no paywall, and no install: open the page, paste your text, and copy stats or the text
          itself in one click. The layout works on phones and desktops, and counting still works after the page
          loads if you go offline. Accented letters, apostrophes, and typical punctuation are handled with Unicode
          rules so counts stay fair for English and multilingual drafts.
        </p>

        <section className="not-prose mt-10">
          <h2 className="font-display text-2xl text-forest mb-4">How to use this word counter</h2>
          <ol className="list-decimal pl-6 space-y-2 text-forest/90">
            <li>Paste or type your text into the box at the top of the page.</li>
            <li>Watch the stats panel update instantly for words, characters, sentences, and paragraphs.</li>
            <li>Check reading and speaking time estimates to plan articles, scripts, or presentations.</li>
            <li>Use Clear to start over, or Copy to grab the text or counts you need.</li>
            <li>
              Open related tools—such as the{" "}
              <Link href="/character-counter/" className="text-forest underline-offset-2 hover:text-gold hover:underline">
                character counter
              </Link>
              —from the links below if you need letter-level limits.
            </li>
          </ol>
        </section>

        <section className="not-prose mt-10">
          <h2 className="font-display text-2xl text-forest mb-4">Tips for accurate counts</h2>
          <ul className="list-disc pl-6 space-y-2 text-forest/90">
            <li>Paste from Word or Google Docs if you want the same boundaries teachers and editors use.</li>
            <li>For Twitter or meta titles, switch to the character counter when the limit is in letters, not words.</li>
            <li>Trim extra line breaks before comparing paragraph counts across versions.</li>
            <li>Speaking time is an estimate—rehearse aloud if your pace is faster or slower than average.</li>
          </ul>
        </section>
      </article>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-forest mb-4">{faqTitle}</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-forest/10 bg-white p-4">
              <dt className="font-semibold text-forest">{f.q}</dt>
              <dd className="mt-2 text-forest/80">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}