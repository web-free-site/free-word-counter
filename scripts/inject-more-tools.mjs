#!/usr/bin/env node
// Injects the web-free.site "More free tools" block and the Cloudflare Web Analytics beacon
// before </body> of every built HTML page in out/ (outside the app root, so hydration does not remove it).
// Hooked into npm run build / postbuild so a later Next.js rebuild cannot drop the home-page snippets.
import fs from "node:fs";
import path from "node:path";

const BLOCK = `
<aside id="wf-more-tools" class="wf-more-tools" aria-labelledby="wf-mt-title">
  <style>
    .wf-more-tools{box-sizing:border-box;width:100%;margin:2.5rem 0 0;padding:1.5rem 1rem 5rem;border-top:1px solid rgba(0,0,0,.12);background:rgba(248,249,251,.97);color:#1a1a1a;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.5}
    .wf-more-tools *{box-sizing:border-box}
    .wf-more-tools h2{margin:0 0 .35rem;font-size:1.15rem;font-weight:700}
    .wf-more-tools .wf-mt-lead{margin:0 0 1rem;color:#333}
    .wf-more-tools .wf-mt-lead a{color:#0b57d0}
    .wf-more-tools .wf-mt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem 1.25rem}
    .wf-more-tools h3{margin:0 0 .4rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:#444}
    .wf-more-tools ul{margin:0;padding:0;list-style:none}
    .wf-more-tools li{margin:0 0 .25rem}
    .wf-more-tools a{color:#0b57d0;text-decoration:underline}
    .wf-more-tools a:hover{text-decoration:none}
    @media (prefers-color-scheme:dark){
      .wf-more-tools{background:rgba(22,24,28,.96);color:#f2f2f2;border-top-color:rgba(255,255,255,.14)}
      .wf-more-tools .wf-mt-lead,.wf-more-tools h3{color:#c8c8c8}
      .wf-more-tools a{color:#8ab4f8}
    }
  </style>
  <h2 id="wf-mt-title">More free tools</h2>
  <p class="wf-mt-lead">These utilities run in your browser. Browse the full list on <a href="https://web-free.site/?ref=word-counter">web-free.site</a>.</p>
  <div class="wf-mt-grid">
    <div class="wf-mt-cat wf-mt-guides"><h3>Guides on this site</h3><ul><li><a href="/how-to-check-essay-word-count/">How to check an essay word count</a></li><li><a href="/how-to-count-characters-for-a-meta-title/">How to count characters for a meta title</a></li><li><a href="/how-to-estimate-speaking-time-for-a-speech/">How to estimate speaking time for a speech</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Documents &amp; writing</h3><ul><li><strong>Free Word Counter</strong></li><li><a href="https://free-pdf-converter.web-free.site/?ref=word-counter">Free PDF Converter</a></li><li><a href="https://free-cv-maker.web-free.site/?ref=word-counter">Free CV Maker</a></li><li><a href="https://free-invoice-generator.web-free.site/?ref=word-counter">Free Invoice Generator</a></li><li><a href="https://free-typing-test.web-free.site/?ref=word-counter">Free Typing Test</a></li><li><a href="https://free-signature-generator.web-free.site/?ref=word-counter">Free Signature Generator</a></li><li><a href="https://free-email-signature-generator.web-free.site/?ref=word-counter">Free Email Signature Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Images &amp; codes</h3><ul><li><a href="https://free-qr-code-creator.web-free.site/?ref=word-counter">Free QR Code Creator</a></li><li><a href="https://free-image-resizer.web-free.site/?ref=word-counter">Free Image Resizer</a></li><li><a href="https://free-image-to-text.web-free.site/?ref=word-counter">Free Image to Text</a></li><li><a href="https://free-background-remover.web-free.site/?ref=word-counter">Free Background Remover</a></li><li><a href="https://free-image-compressor.web-free.site/?ref=word-counter">Free Image Compressor</a></li><li><a href="https://free-heic-to-jpg.web-free.site/?ref=word-counter">Free HEIC to JPG Converter</a></li><li><a href="https://free-image-upscaler.web-free.site/?ref=word-counter">Free Image Upscaler</a></li><li><a href="https://free-passport-photo-maker.web-free.site/?ref=word-counter">Free Passport Photo Maker</a></li><li><a href="https://free-png-to-svg.web-free.site/?ref=word-counter">Free PNG to SVG Converter</a></li><li><a href="https://free-meme-generator.web-free.site/?ref=word-counter">Free Meme Generator</a></li><li><a href="https://free-color-picker.web-free.site/?ref=word-counter">Free Color Picker</a></li><li><a href="https://free-gif-maker.web-free.site/?ref=word-counter">Free GIF Maker</a></li><li><a href="https://free-photo-editor.web-free.site/?ref=word-counter">Free Photo Editor</a></li><li><a href="https://free-logo-maker.web-free.site/?ref=word-counter">Free Logo Maker</a></li></ul></div><div class="wf-mt-cat"><h3>Calculators &amp; currency</h3><ul><li><a href="https://free-online-calculator.web-free.site/en/?ref=word-counter">Free Online Calculator</a></li><li><a href="https://free-currency-converter.web-free.site/?ref=word-counter">Free Currency Converter</a></li><li><a href="https://free-unit-converter.web-free.site/?ref=word-counter">Free Unit Converter</a></li><li><a href="https://free-loan-calculator.web-free.site/?ref=word-counter">Free Loan Calculator</a></li><li><a href="https://free-age-calculator.web-free.site/?ref=word-counter">Free Age Calculator</a></li><li><a href="https://free-percentage-calculator.web-free.site/?ref=word-counter">Free Percentage Calculator</a></li><li><a href="https://free-bmi-calculator.web-free.site/?ref=word-counter">Free BMI Calculator</a></li></ul></div><div class="wf-mt-cat"><h3>Text &amp; SEO</h3><ul><li><a href="https://free-ai-humanizer.web-free.site/?ref=word-counter">Free AI Humanizer</a></li><li><a href="https://free-seo-generator.web-free.site/?ref=word-counter">Free SEO Generator</a></li><li><a href="https://free-backlink-generator.web-free.site/?ref=word-counter">Free Backlink Generator</a></li><li><a href="https://free-json-formatter.web-free.site/?ref=word-counter">Free JSON Formatter</a></li><li><a href="https://free-text-to-speech.web-free.site/?ref=word-counter">Free Text to Speech</a></li><li><a href="https://free-speech-to-text.web-free.site/?ref=word-counter">Free Speech to Text</a></li><li><a href="https://free-diff-checker.web-free.site/?ref=word-counter">Free Diff Checker</a></li><li><a href="https://free-citation-generator.web-free.site/?ref=word-counter">Free Citation Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Audio &amp; video</h3><ul><li><a href="https://free-video-to-mp3.web-free.site/?ref=word-counter">Free Video to MP3 Converter</a></li><li><a href="https://free-mp3-cutter.web-free.site/?ref=word-counter">Free MP3 Cutter</a></li><li><a href="https://free-screen-recorder.web-free.site/?ref=word-counter">Free Screen Recorder</a></li><li><a href="https://free-video-compressor.web-free.site/?ref=word-counter">Free Video Compressor</a></li><li><a href="https://free-video-to-gif.web-free.site/?ref=word-counter">Free Video to GIF Converter</a></li><li><a href="https://free-audio-converter.web-free.site/?ref=word-counter">Free Audio Converter</a></li><li><a href="https://free-video-converter.web-free.site/?ref=word-counter">Free Video Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Files</h3><ul><li><a href="https://free-zip-tool.web-free.site/?ref=word-counter">Free ZIP Tool</a></li></ul></div><div class="wf-mt-cat"><h3>Test data</h3><ul><li><a href="https://free-fake-address-generator.web-free.site/?ref=word-counter">Free Fake Address Generator</a></li><li><a href="https://free-fake-name-generator.web-free.site/?ref=word-counter">Free Fake Name Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Security &amp; passwords</h3><ul><li><a href="https://free-password-generator.web-free.site/?ref=word-counter">Free Password Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Time</h3><ul><li><a href="https://free-time-zone-converter.web-free.site/?ref=word-counter">Free Time Zone Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Drawing</h3><ul><li><a href="https://free-whiteboard.web-free.site/?ref=word-counter">Free Whiteboard</a></li></ul></div><div class="wf-mt-cat"><h3>Random &amp; pickers</h3><ul><li><a href="https://free-spin-wheel.web-free.site/?ref=word-counter">Free Spin Wheel</a></li></ul></div>
  </div>
</aside>
`;

const MARKER = 'id="wf-more-tools"';
const BEACON = "static.cloudflareinsights.com/beacon.min.js";
const SNIPPET_BEACON = "<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"3e2f5f96ab32442ebb6e6f650615b58a\"}'></script><!-- End Cloudflare Web Analytics -->";

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git" || name === ".next" || name === "ads") continue;
      walk(p, acc);
    } else if (name.endsWith(".html") && st.size >= 80) acc.push(p);
  }
  return acc;
}

function inject(text) {
  const idx = text.toLowerCase().lastIndexOf("</body>");
  if (idx === -1) return { text, changed: false };
  const parts = [];
  if (!text.includes(MARKER)) parts.push(BLOCK);
  if (!text.includes(BEACON)) parts.push(SNIPPET_BEACON);
  if (!parts.length) return { text, changed: false };
  return { text: text.slice(0, idx) + parts.join("\n") + "\n" + text.slice(idx), changed: true };
}

const root = path.resolve(process.argv[2] || "out");
let n = 0;
for (const file of walk(root)) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel.startsWith("ads/") || rel.includes("/ads/")) continue;
  const { text, changed } = inject(fs.readFileSync(file, "utf8"));
  if (changed) {
    fs.writeFileSync(file, text);
    n += 1;
  }
}
console.log("inject-more-tools: updated", n, "HTML files in", root);
