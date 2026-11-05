/**
 * Keeps public/_redirects checkout lines in sync with src/config/checkout-redirects.mjs
 * so static hosts (Cloudflare Pages / Netlify) use the same AMAN affiliate URLs as middleware.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';

const root = path.resolve(import.meta.dirname, '..');
const redirectsPath = path.join(root, 'public', '_redirects');

const affiliateBlock = [
  '/go /go/ 301',
  `/go/ ${CHECKOUT_URLS.sand} 302`,
  '/monthly /monthly/ 301',
  `/monthly/ ${CHECKOUT_URLS.sand} 302`,
  '/lifetime /lifetime/ 301',
  `/lifetime/ ${CHECKOUT_URLS.sand} 302`,
  '/go/dma /go/dma/ 301',
  `/go/dma/ ${CHECKOUT_URLS.dma} 302`,
  '/go/hwid /go/hwid/ 301',
  `/go/hwid/ ${CHECKOUT_URLS.hwid} 302`,
  '/go/skin-changer /go/skin-changer/ 301',
  `/go/skin-changer/ ${CHECKOUT_URLS.skin} 302`,
].join('\n');

const START = '___CHECKOUT_AFFILIATE_START___';
const END = '___CHECKOUT_AFFILIATE_END___';

let body = fs.readFileSync(redirectsPath, 'utf8');

if (body.includes(START)) {
  const re = new RegExp(`${START}[\\s\\S]*?${END}\\n?`, 'm');
  body = body.replace(re, `${START}\n${affiliateBlock}\n${END}\n`);
} else {
  const legacy = body.match(/^[\s\S]*?(?=\/support)/);
  const rest = legacy ? body.slice(legacy[0].length) : body;
  body = `${START}\n${affiliateBlock}\n${END}\n${rest.startsWith('/') ? rest : body}`;
  if (!body.includes(START)) {
    body = `${START}\n${affiliateBlock}\n${END}\n${body.replace(/^[\s\S]*?(?=\/support)/, '')}`;
  }
}

// First-time migration: replace old top block if markers missing after failed replace
if (!body.includes(START)) {
  const lines = body.split('\n');
  const supportIdx = lines.findIndex((l) => l.startsWith('/support'));
  const tail = supportIdx >= 0 ? lines.slice(supportIdx).join('\n') : '';
  body = `${START}\n${affiliateBlock}\n${END}\n${tail}`;
}

fs.writeFileSync(redirectsPath, body.endsWith('\n') ? body : `${body}\n`);
console.log('Synced checkout affiliate redirects → public/_redirects');
