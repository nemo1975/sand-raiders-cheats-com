import fs from 'node:fs';
import path from 'node:path';

const langs = 'de fr es pt ru ja ko zh zh-TW he tr ar vi pl it th id'.split(' ');
for (const lang of langs) {
  const p = path.join('scripts/i18n', `${lang}.json`);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!d['Extraction ESP']) d['Extraction ESP'] = d['Loot ESP'] || d['Objective ESP'] || 'Extraction ESP';
  fs.writeFileSync(p, `${JSON.stringify(d, null, 2)}\n`, 'utf8');
}
console.log('Added Extraction ESP keys');
