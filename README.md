# Sand Raiders Cheats

Marketing site for [sandraiderscheats.com](https://sandraiderscheats.com) — listed overlays for **SAND: Raiders of Sophie** on Windows PC (Steam).

SAND: Raiders of Sophie is a dieselpunk PvPvE extraction shooter with Trampler mech building, Voyage exploration, and Storm Dive high-risk sorties. This site documents the current vendor listing for the Windows PC client only. It is not affiliated with or endorsed by tinyBuild, Hologryph, or TowerHaus.

## What the listing covers

Features are taken from the live product page. The site does not invent modules, anti-cheat status, or “undetected” claims.

- Aimbot, aim assist, silent aim, and triggerbot
- Player ESP — box, skeleton, health, name, and distance
- Trampler ESP, loot ESP, extraction markers, team check, and enemy-only ESP
- 2D radar and 3D radar

Related listings: Cloud DMA and HWID Spoofer (separate checkout).

## Plans

| Plan | Price | Term |
| --- | --- | --- |
| Monthly | $35 USD | 30 days (P30D) |
| Lifetime | $150 USD | P99Y |

Both plans use the same listed feature set. Checkout goes through `/go/` (vendor redirect). Re-check the [status](https://sandraiderscheats.com/status/) page after every Steam update.

## Stack

Astro 7, Tailwind CSS 4, Starwind UI. Static output with Cloudflare Pages / Wrangler worker for SEO edge redirects.

## Local

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).
