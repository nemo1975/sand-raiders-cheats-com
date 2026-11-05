export interface ScreenshotShot {
  key: 'gallery01' | 'gallery02' | 'gallery03' | 'gallery04' | 'gallery05' | 'gallery06';
  file: string;
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'dune-aim' | 'ruin-city' | 'dieselpunk-cyan' | 'trampler-menu' | 'sophie-green' | 'yellow-esp';
}

export interface ExtraShot {
  src: string;
  file: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'cloud-dma' | 'hwid-spoofer' | 'skin-changer';
}

const gameplay = '/images/gameplay';
const extras = '/images/extras';

export const SCREENSHOT_WIDTH = 1024;
export const SCREENSHOT_HEIGHT = 574;

/** Blog cards and OG fallbacks cycle through the same six gallery sources. */
export const GALLERY_IMAGE_PATHS = [
  `${gameplay}/gallery-01.png`,
  `${gameplay}/gallery-02.jpg`,
  `${gameplay}/gallery-03.png`,
  `${gameplay}/gallery-04.png`,
  `${gameplay}/gallery-05.png`,
  `${gameplay}/gallery-06.jpg`,
] as const;

export function galleryImageForIndex(index: number): string {
  return GALLERY_IMAGE_PATHS[index % GALLERY_IMAGE_PATHS.length]!;
}

export const SCREENSHOT_RANK: ScreenshotShot[] = [
  {
    key: 'gallery01',
    file: 'gallery-01.png',
    src: `${gameplay}/gallery-01.png`,
    palette: 'dune-aim',
    alt: 'Sand Raiders of Sophie Cheats player ESP with box, skeleton, and distance labels on a Sophie desert plain',
    caption: 'Player ESP',
    captionDesc: 'Box outline, skeleton readout, and distance marker on a nearby raider.',
  },
  {
    key: 'gallery02',
    file: 'gallery-02.jpg',
    src: `${gameplay}/gallery-02.jpg`,
    palette: 'trampler-menu',
    alt: 'Sand Raiders cheats loot and extraction ESP on a Trampler deck above the Sophie dunes',
    caption: 'Loot and extract',
    captionDesc: 'World labels for walkers, extraction cues, and distant contacts.',
  },
  {
    key: 'gallery03',
    file: 'gallery-03.png',
    src: `${gameplay}/gallery-03.png`,
    palette: 'sophie-green',
    alt: 'Sand Raiders of Sophie hacks skeleton ESP and health bar on a sniper raider at dusk',
    caption: 'Skeleton ESP',
    captionDesc: 'Health bar, skeleton overlay, and weapon readout on a ridge target.',
  },
  {
    key: 'gallery04',
    file: 'gallery-04.png',
    src: `${gameplay}/gallery-04.png`,
    palette: 'yellow-esp',
    alt: 'Sand Raiders loot ESP marking weapon crates and supplies across orange Sophie dunes',
    caption: 'Loot ESP',
    captionDesc: 'Crate tiers, mob labels, and distance tags on open desert terrain.',
  },
  {
    key: 'gallery05',
    file: 'gallery-05.png',
    src: `${gameplay}/gallery-05.png`,
    palette: 'ruin-city',
    alt: 'Sand Raiders Cheats player ESP on raiders in a sunset ruin town on planet Sophie',
    caption: 'Ruin town fight',
    captionDesc: 'Box ESP, skeleton overlays, and rare crate markers in coastal ruins.',
  },
  {
    key: 'gallery06',
    file: 'gallery-06.jpg',
    src: `${gameplay}/gallery-06.jpg`,
    palette: 'dieselpunk-cyan',
    alt: 'Sand Raiders of Sophie trainer-style overlay: long-range ESP listing players and rare safes on cliffside buildings',
    caption: 'Long-range awareness',
    captionDesc: 'Multi-target labels for PvP contacts, AI, and high-tier loot.',
  },
];

export const EXTRA_SHOTS = {
  dma: {
    src: `${extras}/cloud-dma.jpg`,
    file: 'cloud-dma.jpg',
    palette: 'cloud-dma',
    alt: 'Cloud DMA extra for Sand Raiders Cheats on Windows PC',
    caption: 'Cloud DMA',
    captionDesc: 'Cloud DMA extra that runs with Sand Raiders Cheats.',
  },
  hwid: {
    src: `${extras}/spoofer.jpg`,
    file: 'spoofer.jpg',
    palette: 'hwid-spoofer',
    alt: 'HWID Spoofer extra for Sand Raiders Cheats on Windows PC',
    caption: 'HWID Spoofer',
    captionDesc: 'HWID Spoofer extra that runs with Sand Raiders Cheats.',
  },
  skinChanger: {
    src: `${extras}/skin-changer.png`,
    file: 'skin-changer.png',
    palette: 'skin-changer',
    alt: 'Sand Raiders of Sophie Skin Changer logo with tactical weapons and bronze crest',
    caption: 'Skin Changer',
    captionDesc: 'Preview client-side cosmetics and blueprint looks for SAND: Raiders of Sophie.',
  },
} as const satisfies Record<'dma' | 'hwid' | 'skinChanger', ExtraShot>;

const ALT_BY_FILE = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.file, shot.alt]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.file, shot.alt]),
]);
const ALT_BY_SRC = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.src, shot.alt]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.src, shot.alt]),
]);
const PALETTE_BY_SRC = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.src, shot.palette]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.src, shot.palette]),
]);

export function screenshotAlt(src: string, fallback = 'Sand Raiders Cheats overlay screenshot for SAND: Raiders of Sophie'): string {
  if (!src) return fallback;
  const file = src.split('/').pop()?.replace(/-\d+\.webp$/i, '') ?? '';
  const withExt = file.includes('.') ? file : `${file}.jpg`;
  const base = withExt.replace(/\.(png|jpe?g)$/i, '');
  return (
    ALT_BY_SRC[src] ??
    ALT_BY_FILE[withExt] ??
    ALT_BY_FILE[`${base}.jpg`] ??
    ALT_BY_FILE[`${base}.png`] ??
    fallback
  );
}

export function screenshotPalette(src: string): string {
  return PALETTE_BY_SRC[src] ?? src;
}

export function screenshotByRank(index = 0): ScreenshotShot {
  return SCREENSHOT_RANK[index] ?? SCREENSHOT_RANK[0]!;
}

export function screenshotForIndex(index: number): ScreenshotShot {
  return SCREENSHOT_RANK[index % SCREENSHOT_RANK.length]!;
}
