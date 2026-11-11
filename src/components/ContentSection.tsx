import { AdSlot } from "./AdSlot";

export function ContentSection({
  body,
  faqs,
  faqTitle,
}: {
  body: string;
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
        {body.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
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
