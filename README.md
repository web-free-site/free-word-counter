# Free Word Counter

Live text utilities for **Gentil M.** (Kigali, Rwanda): word counter, character counter, case converter, and more. Everything runs **client-side**—no sign-up, your text never leaves your device.

Based on [OmniTools](https://github.com/iib0011/omni-tools) (MIT).

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:43123`.

## Tests

```bash
npm test
```

## Deploy (Cloudflare Workers)

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your environment (do not commit tokens).

```bash
npm run deploy
```

This runs `next build` (static export to `out/`) and `wrangler deploy` for the Worker `free-word-counter`.

## Adsterra

Edit **`public/ads.json`** and paste each Adsterra unit’s HTML/script into the matching key:

| Key | Format |
|-----|--------|
| `banner728x90` | Header (desktop) |
| `banner320x50` | Header / sticky mobile |
| `banner468x60` | Mid-page |
| `banner300x250` | Between tool and FAQ |
| `banner160x600` | Desktop sidebar |
| `banner160x300` | Desktop sidebar (upper unit) |
| `nativeBanner` | Below tool results |
| `smartlink` | Labeled “Sponsored” link (footer area) |
| `socialBar` | Site-wide (before `</body>`) |
| `popunder` | Site-wide (before `</head>`) |

Banner values point to isolated HTML units under `public/ads/units/` (iframe) so `atOptions` does not clash.

Empty keys reserve space but render no ad. Redeploy after changes: `npm run deploy`.

## License

MIT — see [LICENSE](LICENSE). Credit: Based on OmniTools.
