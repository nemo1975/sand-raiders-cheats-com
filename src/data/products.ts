import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { EXTRA_SHOTS, SCREENSHOT_RANK, type ScreenshotShot } from './screenshots';
import { productPath } from '../utils/path';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  sand: ['cheats', 'esp', 'aim', 'radar', 'trampler', 'loot', 'pc', 'ac', 'plans'],
  dma: ['pc', 'ac', 'cheats', 'plans'],
  hwid: ['pc', 'ac', 'cheats', 'plans'],
  'skin-changer': ['blueprints', 'cheats', 'pc', 'plans'],
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on sandraiderscheats.com before you buy—especially after an SAND Steam client update.',
  },
  {
    num: '02',
    title: 'Choose monthly or lifetime',
    desc: 'Pick the $35 monthly plan or the $150 lifetime plan, then compare the listed modules before checkout.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish the checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow Windows PC setup',
    desc: 'Use the vendor setup notes for Steam. Turn on a conservative ESP and radar profile before joining a live expedition.',
  },
];

const utilityAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on sandraiderscheats.com before you buy—especially after an SAND Steam client update.',
  },
  {
    num: '02',
    title: 'Read the extra listing',
    desc: 'This extra runs with Sand Raiders Cheats on Windows PC. Confirm vendor notes on this page before you continue.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish this product’s own checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow vendor setup notes',
    desc: 'Use the instructions provided after checkout. Re-check status after SAND patches.',
  },
];

function acquisitionFor(productName: string, kind: 'tier' | 'utility' = 'tier'): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: kind === 'utility' ? utilityAcquisitionSteps : defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'SAND: Raiders of Sophie on Windows PC launches through Steam. Confirm current compatibility on the status page before you purchase or launch. Overlay options can change after a game update.';

const sharedLimitations =
  'Third-party software in SAND: Raiders of Sophie can violate the game terms of use and may lead to account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice. This site is not affiliated with tinyBuild, Hologryph, and TowerHaus.';

const sandSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit).' },
  { icon: 'reqSteam', text: 'SAND: Raiders of Sophie on Windows PC via Steam with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for checkout access and updates.' },
  {
    icon: 'reqCpu',
    text: 'A system that meets SAND: Raiders of Sophie published hardware requirements. Cloud DMA, HWID Spoofer, and Skin Changer extras run with Sand Raiders Cheats on this PC.',
  },
];

type GalleryKey = ScreenshotShot['key'];

const galleryRaw = Object.fromEntries(
  SCREENSHOT_RANK.map((shot) => [
    shot.key,
    { src: shot.src, alt: shot.alt, caption: shot.caption, captionDesc: shot.captionDesc },
  ]),
) as Record<GalleryKey, Pick<ScreenshotShot, 'src' | 'alt' | 'caption' | 'captionDesc'>>;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const rankedSlides = slide(...SCREENSHOT_RANK.map((shot) => shot.key));

const listedFeatures = [
  'Aimbot',
  'Aim Assist',
  'Silent Aim',
  'Triggerbot',
  'ESP',
  'Player ESP',
  'Box ESP',
  'Skeleton ESP',
  'Health ESP',
  'Name ESP',
  'Distance ESP',
  'Trampler ESP',
  'Team Check',
  'Enemy Only ESP',
  'Loot ESP',
  'Extraction ESP',
  'Radar',
  '2D Radar',
  '3D Radar',
];

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  sand: {
    images: rankedSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: sandSystemRequirements,
    fullFeatures: listedFeatures,
    overview: {
      title: 'Built around the SAND extraction loop on Windows PC',
      paragraphs: [
        'Sand Raiders Cheats lists overlays for SAND: Raiders of Sophie, the Steam PvPvE extraction shooter with Trampler mechs: [player ESP](/esp/), [Trampler ESP](/trampler/), [loot ESP](/loot/), [radar](/radar/), and optional [aimbot](/aim/). Enable only what you can read, then save a profile before Storm Dive or Voyage expeditions.',
        'The vendor listing targets the Windows Steam client. Re-check the [status page](/status/) after every Early Access patch. [Setup notes](/setup/) cover BattlEye and first-run order. New weapons or Trampler parts in-game do not add modules unless they appear on the live store listing.',
      ],
    },
  },
  dma: {
    images: [
      {
        src: EXTRA_SHOTS.dma.src,
        alt: EXTRA_SHOTS.dma.alt,
        caption: EXTRA_SHOTS.dma.caption,
        captionDesc: EXTRA_SHOTS.dma.captionDesc,
      },
    ],
    goodToKnow:
      'Cloud DMA is a $50 one-time extra that runs with Sand Raiders Cheats. Confirm vendor notes at checkout. Sand Raiders Cheats plans stay $35 monthly or $150 lifetime.',
    limitations: sharedLimitations,
    systemRequirements: sandSystemRequirements,
    fullFeatures: ['$50 one-time extra', 'Windows PC', 'Runs with Sand Raiders Cheats'],
    overview: {
      title: 'Cloud DMA extra for Sand Raiders Cheats',
      paragraphs: [
        'Cloud DMA is a $50 one-time extra that runs with [Sand Raiders Cheats](/store/) on Windows PC. Use this page for DMA delivery notes, then keep [aimbot](/aim/), ESP, and radar on the store listing.',
        'Pair it with [HWID Spoofer](/hwid/) and [Skin Changer](/skin-changer/) when you map all store extras. Re-check [status](/status/) after SAND patches either way.',
      ],
    },
  },
  hwid: {
    images: [
      {
        src: EXTRA_SHOTS.hwid.src,
        alt: EXTRA_SHOTS.hwid.alt,
        caption: EXTRA_SHOTS.hwid.caption,
        captionDesc: EXTRA_SHOTS.hwid.captionDesc,
      },
    ],
    goodToKnow:
      'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Sand Raiders Cheats on Windows PC. This page does not promise ban evasion or BattlEye bypass.',
    limitations: sharedLimitations,
    systemRequirements: sandSystemRequirements,
    fullFeatures: ['Monthly $50', 'Lifetime $150', 'Runs with Sand Raiders Cheats'],
    overview: {
      title: 'HWID Spoofer extra for Sand Raiders Cheats',
      paragraphs: [
        'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Sand Raiders Cheats on Windows PC. This page does not promise ban evasion, hardware masking success, or BattlEye bypass.',
        'Keep [aimbot](/aim/), ESP, and radar on the [store](/store/). Use [setup](/setup/) and [status](/status/) before you launch the extras with the overlay.',
      ],
    },
  },
  'skin-changer': {
    images: [
      {
        src: EXTRA_SHOTS.skinChanger.src,
        alt: EXTRA_SHOTS.skinChanger.alt,
        caption: EXTRA_SHOTS.skinChanger.caption,
        captionDesc: EXTRA_SHOTS.skinChanger.captionDesc,
      },
    ],
    goodToKnow:
      'Skin Changer is a $35 monthly or $99 lifetime extra that runs with Sand Raiders Cheats on Windows PC. It previews client-side cosmetics only—other players may still see default gear unless the vendor notes say otherwise.',
    limitations: sharedLimitations,
    systemRequirements: sandSystemRequirements,
    fullFeatures: ['Monthly $35', 'Lifetime $99', 'Blueprint and cosmetic previews', 'Runs with Sand Raiders Cheats'],
    overview: {
      title: 'Skin Changer extra for Sand Raiders Cheats',
      paragraphs: [
        'Skin Changer is a $35 monthly or $99 lifetime extra for SAND: Raiders of Sophie on Windows PC. Use it to preview blueprint looks, Trampler parts, and raider cosmetics locally while you run [Sand Raiders Cheats](/store/) overlays.',
        'Read the [blueprints guide](/blueprints/) for in-game crafting context. Keep [player ESP](/esp/) and [loot ESP](/loot/) on the main store listing, then re-check [status](/status/) after Steam patches.',
      ],
    },
  },
};

function utilitySlugFromHref(href: string): 'dma' | 'hwid' | 'skin-changer' {
  if (href.includes('dma')) return 'dma';
  if (href.includes('hwid')) return 'hwid';
  if (href.includes('skin')) return 'skin-changer';
  return 'dma';
}

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = 'sand';
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier' as const,
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: [
        {
          type: 'p',
          text: 'SAND: Raiders of Sophie rewards awareness of enemy raiders, Tramplers, and extraction timing. Sand Raiders Cheats groups aimbot, ESP, and radar on one [store](/store/) page, with optional [Skin Changer](/skin-changer/), [Cloud DMA](/dma/), and [HWID Spoofer](/hwid/) extras. See [features](/features/) and [preview](/preview/) for module detail.',
        },
        { type: 'h2', text: 'What is listed' },
        {
          type: 'p',
          text: 'The current product listing includes [aimbot](/aim/), [player ESP](/esp/), [Trampler ESP](/trampler/), [loot ESP](/loot/), [2D and 3D radar](/radar/), team check, and enemy-only ESP. Full farming bots and movement macros are not listed, so this site does not claim them. See the [FAQ](/faq/) if you are unsure what is included.',
        },
      ],
      body: [
        { type: 'h2', text: 'Plans' },
        {
          type: 'p',
          text: 'Monthly access is $35 for 30 days (P30D). Lifetime access is $150 (P99Y). Both plans are priced in USD and use the same listed feature set. Compare them here, then read [monthly vs lifetime](/plans/) if you still need a short trial vs long access.',
        },
        { type: 'h2', text: 'Requirements' },
        {
          type: 'p',
          text: 'Windows 10 or 11 and a machine that can run SAND on Steam. [Cloud DMA](/dma/), [HWID Spoofer](/hwid/), and [Skin Changer](/skin-changer/) are separate extras on their own checkout pages. Confirm notes on [setup](/setup/) and [status](/status/) before you pay.',
        },
      ],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items.map((item) => {
    const slug = utilitySlugFromHref(item.href);
    const content = productContent[slug];
    return {
      slug,
      kind: 'utility' as const,
      badge: item.badge,
      category: item.category,
      name: item.title,
      title: item.title,
      subtitle: item.subtitle,
      desc: item.desc,
      features: item.features,
      more: item.more,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(item.title, 'utility'),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: [
        {
          type: 'p',
          text: `${item.title} is an extra that runs with [Sand Raiders Cheats](/store/) on Windows PC. Use this page for its checkout path, then keep [aimbot](/aim/), ESP, and radar on [features](/features/).`,
        },
      ],
      body: [
        { type: 'h2', text: 'How it relates' },
        {
          type: 'p',
          text: 'This extra runs with [Sand Raiders Cheats](/store/) on Windows PC. Monthly ($35) and lifetime ($150) overlay plans stay on the store. Use this page for the extra’s checkout.',
        },
        { type: 'h2', text: 'Compatibility' },
        {
          type: 'p',
          text: 'Treat BattlEye notes as unverified context. Re-check [status](/status/) after SAND patches. [Windows PC setup](/pc/) covers first-run order for the main overlay.',
        },
      ],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');
export const utilityPages = productPages.filter((p) => p.kind === 'utility');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug) ?? productPages[0];
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug) ?? cheatPages[0];
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = rankedSlides;

export const productHub = {
  path: '/store/',
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Sand Raiders Cheats plans for SAND: Raiders of Sophie on Windows PC. Compare monthly and lifetime overlays, Skin Changer, Cloud DMA, and HWID Spoofer extras, then continue to checkout for current pricing.',
  buyUrl: checkoutPath('sand'),
};

export { productPath };
