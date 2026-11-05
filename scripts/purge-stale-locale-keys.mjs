/**
 * Drop obsolete Overwatch-era locale keys and scrub leftover game references in values.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const dirs = [path.join(root, 'public/locales'), path.join(root, 'scripts/i18n')];

const DROP_KEY =
  /D\.Va|Overwatch|overwatch|Juno Overwatch|hero shooter|أوفرواتch|d\.v\.a sand|dva sand|blizzard sand|blizzard:|the publisher of the game|challenger score|battle pass/i;

const VALUE_REPLACEMENTS = [
  [/Overwatch/gi, 'SAND: Raiders of Sophie'],
  [/overwatch/gi, 'sand raiders'],
  [/D\.Va/gi, 'Voyage Mode'],
  [/hero shooter/gi, 'extraction shooter'],
  [/أوفرواتch/g, 'SAND'],
  [/the the SAND developers/gi, 'the SAND developers'],
  [/blizzard/gi, 'tinyBuild'],
];

function scrubString(s) {
  let out = s;
  for (const [re, to] of VALUE_REPLACEMENTS) out = out.replace(re, to);
  return out;
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.json') || name.startsWith('_')) continue;
    const file = path.join(dir, name);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    const next = {};
    for (const [key, value] of Object.entries(raw)) {
      if (DROP_KEY.test(key)) continue;
      const newKey = scrubString(key);
      if (DROP_KEY.test(newKey)) continue;
      next[newKey] = typeof value === 'string' ? scrubString(value) : value;
    }
    fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n', 'utf8');
  }
}

console.log('Purged stale locale keys.');
