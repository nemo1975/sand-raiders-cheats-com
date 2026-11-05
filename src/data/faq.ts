import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'aim'
  | 'safety'
  | 'setup'
  | 'blog';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  const url = normalizeInternalPath(href);
  const extra = url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${url}"${extra}>${text}</a>`;
}

const store = link('Sand Raiders store', ROUTES.store);
const features = link('features page', ROUTES.features);
const status = link('status page', ROUTES.status);
const setup = link('setup page', ROUTES.setup);
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('Sand Raiders guides', ROUTES.blog);
const forum = link('community forum', ROUTES.forum);
const preview = link('preview gallery', ROUTES.preview);
const reviews = link('reviews checklist', ROUTES.reviews);
const support = link('Discord', ROUTES.support);
const playerEsp = link('player ESP guide', '/esp/');
const heroGuide = link('Trampler ESP', '/trampler/');
const objGuide = link('loot ESP', '/loot/');
const radarGuide = link('radar features', '/radar/');
const aimGuide = link('aimbot notes', '/aim/');
const setupGuide = link('Windows PC setup guide', '/pc/');
const compatGuide = link('compatibility notes', '/ac/');
const plansGuide = link('monthly vs lifetime', '/plans/');
const cheatsGuide = link('Sand Raiders cheats overview', '/cheats/');
const cheatCodesGuide = link('Sand Raiders cheat codes guide', '/cheat-codes/');
const hacksGuide = link('Sand Raiders of Sophie hacks guide', '/hacks/');
const trainerGuide = link('Sand Raiders of Sophie trainer guide', '/trainer/');
const dmaPage = link('Cloud DMA', ROUTES.dma);
const hwidPage = link('HWID Spoofer', ROUTES.hwid);
const skinChangerPage = link('Skin Changer', ROUTES.skinChanger);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if Sand Raiders cheats are currently compatible?',
    a: `Open the ${status} on sandraiderscheats.com before purchase or launch, especially after an SAND Steam client update. The ${compatGuide} explain why patch days matter.`,
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: `Checkout provides access and setup instructions. Follow those notes plus the ${setup} for Windows PC before launching SAND. The ${setupGuide} covers a conservative first profile.`,
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party Sand Raiders software?',
    a: `Yes. Any third-party modification can conflict with BattlEye and may lead to account action. You use this software at your own risk. Read the ${compatGuide} and ${status} before you launch.`,
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: `SAND: Raiders of Sophie on Windows 10/11 PC. macOS, Linux, and consoles are not listed. Confirm the client in the ${setupGuide} and ${setup}.`,
  },
  {
    id: 'plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'What plans are available?',
    a: `${store} lists Monthly access at $35 (P30D) and Lifetime access at $150 (P99Y), both in USD. ${plansGuide} compares duration without changing the feature list.`,
  },
  {
    id: 'products-page',
    topic: 'plans',
    icon: 'faqProductsPage',
    q: 'Where can I review features and pricing?',
    a: `${store} lists monthly and lifetime plans, available features, and the checkout path. The ${features} collects the same modules in more detail, the ${preview} shows overlay screenshots, and the ${forum} keeps guide discussions.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is Sand Raiders ESP?',
    a: `ESP is an information overlay. ${features} covers player ESP, box ESP, skeleton ESP, Trampler ESP, and loot ESP. It does not automatically aim or move your character. ${cheatsGuide} maps each overlay group.`,
    scopes: ['sand'],
  },
  {
    id: 'player-esp',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What does player ESP show?',
    a: `Player ESP can show nearby raiders with box outlines, skeleton, health, name, distance, and enemy-only filters when those toggles are included in the current build. See the ${playerEsp} and ${preview}.`,
  },
  {
    id: 'hero-esp',
    topic: 'esp',
    icon: 'faqWhichTierEsp',
    q: 'What does Trampler ESP show?',
    a: `Trampler ESP can label the raider loadout so you can read squads, solo raiders, and Trampler crews. The ${heroGuide} explains how it pairs with player ESP.`,
  },
  {
    id: 'obj-esp',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'What does loot ESP show?',
    a: `Loot ESP can mark loot crates, extraction zones, and Trampler wrecks. ${objGuide} covers those markers. Loot ESP is listed separately.`,
  },
  {
    id: 'radar',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Does Sand Raiders Cheats include radar?',
    a: `Yes. 2D radar and 3D radar are listed as local awareness overlays for nearby players. ${radarGuide} covers when to pair them with ESP.`,
  },
  {
    id: 'aim-assist',
    topic: 'aim',
    icon: 'faqWhichTierScripts',
    q: 'Is aimbot or triggerbot included?',
    a: `Aimbot, aim assist, silent aim, and triggerbot are listed. Farming bots and movement macros are not listed, so this site does not claim them. Confirm the ${status} before enabling combat modules, and read the ${aimGuide}.`,
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Are Sand Raiders cheats guaranteed undetected?',
    a: `No. This site does not promise permanent undetected status. Compatibility can change after a patch. Check the ${status} and stop if a build is marked unavailable.`,
  },
  {
    id: 'anticheat',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What anti-cheat does SAND: Raiders of Sophie use?',
    a: `SAND: Raiders of Sophie uses BattlEye. This site treats that label as published context, not a verified bypass. After a patch, re-check the ${status}.`,
  },
  {
    id: 'dma',
    topic: 'setup',
    icon: 'faqExternalLoader',
    q: 'How does Cloud DMA run with Sand Raiders Cheats?',
    a: `Cloud DMA is a $50 one-time extra that runs with Sand Raiders Cheats on Windows PC. Confirm those notes on ${dmaPage} and the ${setup} before you buy.`,
  },
  {
    id: 'hwid',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'How does the HWID Spoofer run with Sand Raiders Cheats?',
    a: `${hwidPage} is a $50 monthly or $150 lifetime extra that runs with Sand Raiders Cheats on the same Windows PC. Sand Raiders Cheats plans stay $35 monthly or $150 lifetime.`,
  },
  {
    id: 'skin-changer',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'What does the Skin Changer do for SAND: Raiders of Sophie?',
    a: `${skinChangerPage} is a $35 monthly or $99 lifetime extra that runs with Sand Raiders Cheats on Windows PC. It previews blueprint and raider cosmetics locally—confirm vendor notes on that page and in the ${setup} before checkout.`,
  },
  {
    id: 'steam-battlenet',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does this work on Steam?',
    a: `The current listing is the Windows PC client. Confirm the client you launch in the ${setupGuide}. Console clients are not listed.`,
  },
  {
    id: 'monthly-vs-lifetime',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do I choose monthly vs lifetime?',
    a: `Choose monthly if you want to evaluate Sand Raiders cheats for 30 days. Choose lifetime if you already know you want longer access. Feature lists are the same; only duration and price change. See ${store} and ${plansGuide}. The ${reviews} lists evaluation checkpoints without invented quotes.`,
  },
  {
    id: 'blog-vs-product',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog articles the same as the product listing?',
    a: `No. ${blog} explains terminology and setup. The ${store} feature list is the source for what you are buying. Use ${features} if you want the same modules without checkout copy.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do setup guides point for purchase?',
    a: `Guides link to the ${store}, ${setup}, and ${status} pages. Checkout runs through the listed partner—do not download files from random messages. Ask on the ${support} if an instruction is unclear.`,
  },
  {
    id: 'support-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: `Open a request on the ${support} with your order email, Windows version, Steam, and the exact error text from the loader or SAND Steam client.`,
  },
  {
    id: 'invented-features',
    topic: 'aim',
    icon: 'faqAutoFarm',
    q: 'Do you include farming bots or movement macros?',
    a: `Those modules are not on the current product listing, so Sand Raiders Cheats does not advertise them. Compare the ${features} and ${store} lists instead of third-party screenshots.`,
  },
  {
    id: 'cheat-codes',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Are there Sand Raiders cheat codes or a developer console on Steam?',
    a: `SAND: Raiders of Sophie does not publish classic typed cheat codes in the public Steam client. Searches for Sand Raiders cheat codes usually mean Windows PC overlay modules—see the ${cheatCodesGuide} and the ${cheatsGuide}.`,
  },
  {
    id: 'hacks-term',
    topic: 'esp',
    icon: 'faqBlogSlugEsp',
    q: 'What do people mean by Sand Raiders of Sophie hacks?',
    a: `Most searches mean ESP, radar, or optional aimbot—not a random hack pack. The ${hacksGuide} maps those terms to listed modules on the ${features} page.`,
  },
  {
    id: 'trainer-term',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'Is there a Sand Raiders of Sophie trainer download?',
    a: `A classic single-player trainer file is not what this site documents. Buyers usually want a toggle menu for listed overlays—read the ${trainerGuide}, then compare ${store} plans and ${status} before launch.`,
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the ${faqPage} for plans, ESP, setup, and safety answers—or read ${blog} for longer guides.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'plans', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter plans, ESP, aimbot, safety, setup, and blog answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'aim',
  'safety',
  'setup',
  'blog',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter((f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'aim'].includes(f.topic));
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));

  const combined = [...scoped, ...general];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Does this guide replace the store listing?',
      a: `No. Use ${store} for current plans and the listed feature set. Guides explain terminology and workflow. ${features} is the public module summary.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: `Check the article date and the ${status}. Sand Raiders updates can change what a build can do. The ${compatGuide} cover that patch-day habit.`,
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download access files?',
      a: a('Only from the checkout or vendor instructions after purchase—not from third-party links in comments or messages.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test settings before a live session?',
      a: a('Yes. Enable a conservative ESP and radar profile first. Add combat options only after you confirm status.'),
    },
  ],
  Features: [
    {
      id: 'blog-feature-list',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which features are actually listed?',
      a: `Aimbot, aim assist, silent aim, triggerbot, player ESP, Trampler ESP, loot ESP, radar, and team check. See the ${features} for the full listed set, or the ${preview} for screenshots.`,
    },
  ],
  Updates: [
    {
      id: 'blog-sec-compat',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article guarantee anti-cheat compatibility?',
      a: a('No article replaces the status page. Compatibility is a point-in-time note—stop if status shows the build is unavailable.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${store}. Feature lists on the store page are authoritative for checkout. ${features} and the ${faqPage} stay in sync with that list.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a(`Continue through ${support} with your order email and the article slug. Include your Windows version and Steam.`),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every SAND: Raiders of Sophie update. Reload configs instead of assuming old sliders still apply.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (['esp', 'radar', 'hero', 'obj', 'cheats'].includes(slug)) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Where is the current ESP feature list?',
      a: `${features} and ${store} list player ESP, Trampler ESP, loot ESP, and radar from the current product listing.`,
    });
  }
  if (slug === 'aim') {
    slugHints.push({
      id: 'blog-slug-aim',
      topic: 'aim',
      icon: 'faqBlogSlugScripts',
      q: 'Is aimbot required?',
      a: a('No. Aimbot is optional. You can review ESP and radar without enabling combat modules.'),
    });
  }
  if (slug === 'ac' || slug === 'pc') {
    slugHints.push({
      id: 'blog-slug-status',
      topic: 'setup',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace the status page?',
      a: `No. Use the ${status} page for current compatibility notes after an SAND: Raiders of Sophie update.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Aimbot', icon: 'compareAutoCombo' as const, monthly: true, lifetime: true },
  { feature: 'Player ESP', icon: 'comparePlayerEsp' as const, monthly: true, lifetime: true },
  { feature: 'Trampler ESP', icon: 'compareWardLocator' as const, monthly: true, lifetime: true },
  { feature: 'Loot ESP', icon: 'compareRuneTimer' as const, monthly: true, lifetime: true },
  { feature: 'Radar', icon: 'compareMinimapHack' as const, monthly: true, lifetime: true },
  { feature: 'Team check', icon: 'compareAbilityRadius' as const, monthly: true, lifetime: true },
  { feature: 'Silent aim / triggerbot', icon: 'compareCloudBackup' as const, monthly: true, lifetime: true },
];
