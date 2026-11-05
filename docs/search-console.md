# Search Console workflow (sandraiderscheats.com)

Verify the domain at your DNS provider — no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `sandraiderscheats.com` if it is not already there.
2. Under **Sitemaps**, submit: `https://sandraiderscheats.com/sitemap.xml`
3. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts) or the relevant blog post in [`src/data/blog/posts.ts`](../src/data/blog/posts.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep the title under ~60 characters where possible).
5. Deploy. Wait 1–2 weeks before judging click-through changes.

Do not add undetected, bypass, or live anti-cheat claims. Compatibility copy should point at `/status/`.

## Path cheat sheet

| Common query intent | Primary URL | Edit in |
| ------------------- | ----------- | ------- |
| Sand Raiders of Sophie Cheats (broad) | `/` | `pageSeo.ts` `/` |
| Sand Raiders Cheats / buy / price | `/store/` | `pageSeo.ts` `/store/` |
| Sand Raiders of Sophie Hacks | `/hacks/`, `/features/` | blog `hacks`, `pageSeo.ts` `/features/` |
| Sand Raiders Cheat Codes | `/cheat-codes/` | blog `cheat-codes` |
| Sand Raiders of Sophie Trainer | `/trainer/` | blog `trainer` |
| Sand Raiders cheats overview | `/cheats/` | blog `cheats` |
| player ESP, wallhack | `/esp/` | blog `esp` |
| aimbot, soft aim | `/aim/` | blog `aim` |
| radar | `/radar/` | blog `radar` |
| Trampler ESP | `/trampler/` | blog `trampler` |
| Windows PC / Steam setup | `/pc/`, `/setup/` | blog `pc`, `pageSeo.ts` `/setup/` |
| monthly vs lifetime | `/plans/` | blog `plans` |
| compatibility after a patch | `/status/`, `/ac/` | `pageSeo.ts` `/status/`, blog `ac` |
| FAQ / refund / support | `/faq/`, `/terms/` | `pageSeo.ts` |

Product and blog pages use titles from post content unless you add a `PAGE_SEO` entry for a fixed pathname override.
