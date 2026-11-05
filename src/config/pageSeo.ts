/**
 * Central titles/descriptions for high-traffic routes.
 * Titles stay concise for SERP display. Descriptions target ~150–160 characters.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Sand Raiders of Sophie Cheats | ESP, Aimbot & Radar on PC',
    description:
      'Windows PC overlays for SAND: Raiders of Sophie — player ESP, aimbot, radar, and Skin Changer. Compare plans and check status before checkout.',
  },
  '/features/': {
    title: 'Sand Raiders of Sophie Hacks & Features | Sand Raiders Cheats',
    description:
      'Sand Raiders of Sophie hacks and cheat modules on PC: aimbot, silent aim, player ESP, Trampler ESP, loot markers, and 2D/3D radar. Compare listed Sand Raiders Cheats features before you buy.',
  },
  '/store/': {
    title: 'Sand Raiders Cheats Store | Sand Raiders of Sophie Plans',
    description:
      'Buy Sand Raiders of Sophie cheats on Windows PC. Sand Raiders Cheats monthly $35, lifetime $150. Skin Changer, Cloud DMA, and HWID Spoofer extras run with the main overlay.',
  },
  '/dma/': {
    title: 'Cloud DMA | Sand Raiders of Sophie Cheats',
    description:
      'Cloud DMA is a $50 one-time extra that runs with Sand Raiders Cheats on Windows PC. Compare delivery notes, requirements, and checkout details before you purchase.',
  },
  '/hwid/': {
    title: 'HWID Spoofer | Sand Raiders Cheats',
    description:
      'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Sand Raiders Cheats on Windows PC. Compare notes and checkout details before purchase.',
  },
  '/skin-changer/': {
    title: 'SAND Skin Changer | Sand Raiders of Sophie Cheats',
    description:
      'Skin Changer for SAND: Raiders of Sophie on Windows PC — $35 monthly or $99 lifetime. Preview blueprint cosmetics with Sand Raiders Cheats. Read requirements before checkout.',
  },
  '/status/': {
    title: 'Sand Raiders Cheats Status | SAND on Steam PC',
    description:
      'Check Sand Raiders of Sophie cheats compatibility and BattlEye status after Steam patches. Review Sand Raiders Cheats notices before you launch or renew a plan.',
  },
  '/preview/': {
    title: 'Sand Raiders Cheats Preview | ESP & Radar Screenshots',
    description:
      'Preview Sand Raiders of Sophie cheats overlays: player ESP, loot markers, aimbot UI, and radar from Sand Raiders Cheats on Windows PC before checkout.',
  },
  '/setup/': {
    title: 'Sand Raiders Cheats Setup | Windows Steam PC',
    description:
      'Setup for Sand Raiders of Sophie cheats on Windows PC: Steam client order, overlay settings, and BattlEye considerations for Sand Raiders Cheats buyers.',
  },
  '/support/': {
    title: 'Sand Raiders Cheats Support | Setup & Checkout Help',
    description:
      'Support for Sand Raiders of Sophie cheats: purchase delivery, Windows PC setup, configuration, and compatibility updates for Sand Raiders Cheats plans.',
  },
  '/faq/': {
    title: 'Sand Raiders Cheats FAQ | Hacks, Codes & Trainer',
    description:
      'FAQ for Sand Raiders of Sophie cheats: monthly and lifetime plans, hacks vs ESP, cheat codes searches, trainer terminology, setup, BattlEye, and checkout.',
  },
  '/reviews/': {
    title: 'Sand Raiders Cheats Reviews | Buyer Checklist',
    description:
      'Buyer checklist for Sand Raiders of Sophie cheats: ESP, radar, aimbot, setup, and compatibility before you choose a Sand Raiders Cheats plan on Windows PC.',
  },
  '/blog/': {
    title: 'Sand Raiders Guides | Cheats, Hacks & Storm Dive',
    description:
      'Guides for Sand Raiders of Sophie cheats: Tramplers, cheat codes meaning, trainer searches, BattlEye notes, and Sand Raiders Cheats on Windows PC.',
  },
  '/intel/': {
    title: 'Sand Raiders Feature Guides | ESP & Aimbot',
    description:
      'Sand Raiders of Sophie cheats articles: aimbot, player ESP, wallhack-style overlays, Trampler ESP, loot ESP, and radar on Windows PC.',
  },
  '/guides/': {
    title: 'Sand Raiders Guides | Cheats Before You Buy',
    description:
      'Practical guides for Sand Raiders of Sophie: Tramplers, extraction routes, Steam setup, and how to review Sand Raiders cheats before checkout.',
  },
  '/howto/': {
    title: 'Sand Raiders Setup Articles | Windows PC',
    description:
      'Windows PC setup for Sand Raiders of Sophie cheats: Steam order, configuration, and compatibility checks for Sand Raiders Cheats.',
  },
  '/updates/': {
    title: 'Sand Raiders Updates | Patches & Compatibility',
    description:
      'Sand Raiders Cheats updates on SAND: Raiders of Sophie patches, BattlEye notes, and compatibility reminders for Sand Raiders of Sophie cheats on PC.',
  },
  '/forum/': {
    title: 'Sand Raiders Cheats Forum | ESP & Plans Q&A',
    description:
      'Forum answers on Sand Raiders of Sophie cheats: ESP, aimbot, radar, Windows PC setup, and Sand Raiders Cheats plans with links to source guides.',
  },
  '/search/': {
    title: 'Search Sand Raiders of Sophie Cheats',
    description:
      'Search Sand Raiders Cheats guides, FAQ, forum threads, and store pages for Sand Raiders of Sophie cheats, hacks, cheat codes, and trainer topics.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Sand Raiders Cheats',
    description:
      'Purchase terms, license use, and refund policy for Sand Raiders Cheats products sold through sandraiderscheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Sand Raiders Cheats',
    description:
      'How sandraiderscheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About Sand Raiders of Sophie Cheats',
    description:
      'About Sand Raiders Cheats: Sand Raiders of Sophie feature notes, plans, setup, and status at sandraiderscheats.com—not affiliated with the game publishers.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
