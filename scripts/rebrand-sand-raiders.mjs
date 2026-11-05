/**
 * One-time rebrand: Overwatch site → Sand Raiders of Sophie Cheats (sandraiderscheats.com)
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

const EXT = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.jsonc',
  '.xml',
  '.txt',
  '.md',
  '.html',
  '.svg',
  '.css',
]);

/** Blog / forum URL slug renames (old → new). */
const SLUG_MAP = {
  hero: 'trampler',
  obj: 'loot',
  ow2: 'early-access',
  heroes: 'tramplers',
  ranks: 'storm-dive',
  patch: 'roadmap',
  skins: 'blueprints',
  dva: 'voyage',
  juno: 'sophie',
  tier: 'weapons',
  cross: 'squad',
  reddit: 'community',
  blizzard: 'publisher',
  vendetta: 'extraction',
  domina: 'contracts',
  mizuki: 'dieselpunk',
  art: 'disclaimer',
};

/** Longest-first text replacements (case-sensitive where noted). */
const REPLACEMENTS = [
  ['overwatchcheat.com', 'sandraiderscheats.com'],
  ['Overwatch Cheats', 'Sand Raiders Cheats'],
  ['Overwatch Cheat', 'Sand Raiders Cheats'],
  ['Overwatch 2', 'SAND: Raiders of Sophie'],
  ['Overwatch and Overwatch 2', 'SAND: Raiders of Sophie'],
  ['Overwatch cheats', 'Sand Raiders cheats'],
  ['Overwatch hacks', 'Sand Raiders hacks'],
  ['Overwatch wallhack', 'Sand Raiders wallhack'],
  ['Overwatch aimbot', 'Sand Raiders aimbot'],
  ['Overwatch anti cheat', 'Sand Raiders anti-cheat'],
  ['Overwatch ESP', 'Sand Raiders ESP'],
  ['Overwatch store', 'Sand Raiders store'],
  ['Overwatch guides', 'Sand Raiders guides'],
  ['Overwatch characters', 'Tramplers and raiders'],
  ['Overwatch heroes', 'Tramplers and raiders'],
  ['Overwatch ranks', 'Storm Dive and Voyage'],
  ['Overwatch patch notes', 'SAND Early Access updates'],
  ['Overwatch reddit', 'Sand Raiders community'],
  ['Overwatch r34', 'unofficial fan art'],
  ['Overwatch naming', 'SAND naming'],
  ['Overwatch product', 'Sand Raiders product'],
  ['Overwatch modules', 'Sand Raiders modules'],
  ['Overwatch features', 'Sand Raiders features'],
  ['Overwatch updates', 'Sand Raiders updates'],
  ['Overwatch status', 'Sand Raiders status'],
  ['Overwatch on Windows', 'SAND: Raiders of Sophie on Windows'],
  ['Overwatch client', 'SAND Steam client'],
  ['launching Overwatch', 'launching SAND'],
  ['launch Overwatch', 'launch SAND'],
  ['play Overwatch', 'play SAND'],
  ['run Overwatch', 'run SAND'],
  ['Overwatch updates', 'SAND updates'],
  ['Overwatch patch', 'SAND patch'],
  ['Overwatch software', 'Sand Raiders software'],
  ['Overwatch cheats overview', 'Sand Raiders cheats overview'],
  ['third-party Overwatch', 'third-party Sand Raiders'],
  ['for Overwatch', 'for SAND: Raiders of Sophie'],
  ['Overwatch.', 'SAND: Raiders of Sophie.'],
  ['Overwatch,', 'SAND: Raiders of Sophie,'],
  ['Overwatch ', 'SAND: Raiders of Sophie '],
  ['Overwatch', 'SAND: Raiders of Sophie'],
  ['overwatch cheats', 'sand raiders cheats'],
  ['overwatch', 'sand-raiders'],
  ['Blizzard Defense Matrix', 'BattlEye'],
  ['Blizzard Entertainment', 'tinyBuild, Hologryph, and TowerHaus'],
  ['Blizzard Entertainment.', 'tinyBuild, Hologryph, and TowerHaus.'],
  ['Blizzard', 'the SAND developers'],
  ['Defense Matrix', 'BattlEye'],
  ['Battle.net and Steam', 'Steam'],
  ['Battle.net or Steam', 'Steam'],
  ['Battle.net', 'Steam'],
  ['Hero ESP', 'Trampler ESP'],
  ['hero ESP', 'Trampler ESP'],
  ['Ability ESP', 'Loot ESP'],
  ['ability ESP', 'loot ESP'],
  ['Objective ESP', 'Loot ESP'],
  ['objective ESP', 'loot ESP'],
  ['hero labels', 'Trampler labels'],
  ['Hero labels', 'Trampler labels'],
  ['nearby heroes', 'nearby raiders'],
  ['enemy heroes', 'enemy raiders'],
  ['friendly heroes', 'friendly squadmates'],
  ['the hero someone locked', 'the raider loadout'],
  ['tanks, damage, and supports', 'squads, solo raiders, and Trampler crews'],
  ['payloads, capture points, and push bots', 'loot crates, extraction zones, and Trampler wrecks'],
  ['payloads and points', 'loot and extraction markers'],
  ['payload map', 'desert ruin map'],
  ['5v5', 'squad PvPvE'],
  ['new season', 'Early Access update'],
  ['new hero', 'new Trampler module'],
  ['OW characters', 'raiders and Tramplers'],
  ['OW overlays', 'Sand Raiders overlays'],
  ['OW shorthand', 'SAND shorthand'],
  ['OW research', 'Sand Raiders research'],
  ['OW play', 'SAND play'],
  [' OW ', ' SAND '],
  ['| OW ', '| SAND '],
  ['products/overwatch-2', 'products/sand-raiders'],
  ['products/overwatch-cheats', 'products/sand-raiders'],
  ['products/overwatch', 'products/sand-raiders'],
  ['/go/overwatch/', '/go/'],
  ['go/overwatch', 'go'],
  ['Overwatch_2', 'SAND_Raiders_of_Sophie'],
  ['2357570', '1431300'],
  ['overwatchcheat-com', 'sand-raiders-cheats-com'],
  ['overwatchcheat', 'sandraiderscheats'],
  ['D.Va Overwatch', 'Voyage Mode in SAND'],
  ['D.Va notes', 'Voyage Mode notes'],
  ['d.v.a overwatch', 'voyage mode sand'],
  ['dva overwatch', 'voyage sand raiders'],
  ['Juno Overwatch', 'Planet Sophie lore'],
  ['Juno Overwatch', 'Planet Sophie'],
  ['Mizuki Overwatch', 'Dieselpunk Sophie setting'],
  ['Vendetta Overwatch', 'Storm Dive extraction'],
  ['Domina Overwatch', 'Contracts in SAND'],
  ['Is Overwatch 2 cross platform', 'Is SAND cross platform'],
  ['When did Overwatch 2 come out', 'When did SAND Early Access launch'],
  ['About Overwatch', 'About Sand Raiders Cheats'],
  ['Search Overwatch', 'Search Sand Raiders Cheats'],
  ['Hanzo', 'desert scout'],
  ['Havana', 'ruined city'],
  ['Ashe', 'raider'],
  ['Cassidy', 'gunslinger raider'],
  ['Kiriko', 'orbital station'],
  ['temple-aim', 'dune-aim'],
  ['havana-ashe', 'ruin-city'],
  ['cassidy-cyan', 'dieselpunk-cyan'],
  ['kiriko-menu', 'trampler-menu'],
  ['hanzo-green', 'sophie-green'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name.name).toLowerCase())) files.push(full);
  }
  return files;
}

function applyReplacements(text) {
  let out = text;
  for (const [from, to] of REPLACEMENTS) {
    if (!from) continue;
    out = out.split(from).join(to);
  }
  return out;
}

function remapSlugsInText(text) {
  let out = text;
  for (const [oldSlug, newSlug] of Object.entries(SLUG_MAP)) {
    out = out.replaceAll(`/${oldSlug}/`, `/${newSlug}/`);
    out = out.replaceAll(`"/${oldSlug}"`, `"/${newSlug}"`);
    out = out.replaceAll(`'/${oldSlug}'`, `'/${newSlug}'`);
    out = out.replaceAll(`slug: "${oldSlug}"`, `slug: "${newSlug}"`);
    out = out.replaceAll(`slug: '${oldSlug}'`, `slug: '${newSlug}'`);
    out = out.replaceAll(`"/${oldSlug}/"`, `"/${newSlug}/"`);
    out = out.replaceAll(`q-${oldSlug}`, `q-${newSlug}`);
    out = out.replaceAll(`'/q-${oldSlug}/'`, `'/q-${newSlug}/'`);
    out = out.replaceAll(`'/q-${oldSlug}'`, `'/q-${newSlug}'`);
  }
  return out;
}

function fixProductKeys(text) {
  return text
    .replace(/\boverwatchSystemRequirements\b/g, 'sandSystemRequirements')
    .replace(/productContent\[slug\]/g, 'productContent[slug]')
    .replace(/slug = 'overwatch'/g, "slug = 'sand'")
    .replace(/overwatch: \{/g, 'sand: {')
    .replace(/productRelatedBlogSlugs[\s\S]*?overwatch:/g, (m) => m.replace('overwatch:', 'sand:'))
    .replace(/checkoutPath\('overwatch'\)/g, "checkoutPath('sand')")
    .replace(/checkoutPath\("overwatch"\)/g, 'checkoutPath("sand")')
    .replace(/product: CheckoutProduct = 'overwatch'/g, "product: CheckoutProduct = 'sand'")
    .replace(/CHECKOUT_SLUGS[\s\S]*?overwatch:/g, (m) => m.replace('overwatch:', 'sand:'))
    .replace(/CHECKOUT_URLS = \{[\s\S]*?overwatch:/g, (m) => m.replace('overwatch:', 'sand:'))
    .replace(/scopes: \['overwatch'\]/g, "scopes: ['sand']")
    .replace(/CheckoutProduct = 'overwatch'/g, "CheckoutProduct = 'sand'");
}

const files = walk(root);
let changed = 0;

for (const file of files) {
  if (file.includes(`${path.sep}rebrand-sand-raiders.mjs`)) continue;
  let text = fs.readFileSync(file, 'utf8');
  const original = text;
  text = applyReplacements(text);
  text = remapSlugsInText(text);
  text = fixProductKeys(text);
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    changed++;
  }
}

console.log(`Rebrand touched ${changed} files.`);
