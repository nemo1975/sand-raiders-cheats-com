/**
 * Fail the build if checkout leaves the AMAN affiliate or reintroduces old codes.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CHECKOUT_URLS,
  ZADEYO_AFFILIATE_CODE,
  zadeyoAffiliateUrl,
} from '../src/config/checkout-redirects.mjs';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];

for (const [product, url] of Object.entries(CHECKOUT_URLS)) {
  const expected = zadeyoAffiliateUrl(product);
  if (url !== expected) {
    errors.push(`CHECKOUT_URLS.${product} does not match zadeyoAffiliateUrl(): ${url}`);
  }
  if (!url.includes(`/go/${ZADEYO_AFFILIATE_CODE}?`)) {
    errors.push(`CHECKOUT_URLS.${product} missing affiliate /go/${ZADEYO_AFFILIATE_CODE}: ${url}`);
  }
}

function scanFile(relPath) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) return;
  const text = fs.readFileSync(full, 'utf8');
  if (/zadeyo\.com\/go\/USMAN/i.test(text)) {
    errors.push(`${relPath} still contains USMAN affiliate`);
  }
  if (/zadeyo\.com\/go\/(?!AMAN)/i.test(text)) {
    const bad = text.match(/zadeyo\.com\/go\/[A-Za-z0-9_-]+/g);
    if (bad?.some((u) => !u.includes('/go/AMAN'))) {
      errors.push(`${relPath} contains non-AMAN zadeyo link: ${bad.join(', ')}`);
    }
  }
}

scanFile('public/_redirects');
scanFile('src/config/checkout-redirects.mjs');

const redirects = fs.readFileSync(path.join(root, 'public', '_redirects'), 'utf8');
for (const url of Object.values(CHECKOUT_URLS)) {
  if (!redirects.includes(url)) {
    errors.push(`public/_redirects missing affiliate URL: ${url}`);
  }
}

const checkDist = process.argv.includes('--dist');
const distGo = path.join(root, 'dist', 'go');
if (checkDist && fs.existsSync(distGo)) {
  for (const name of fs.readdirSync(distGo, { withFileTypes: true })) {
    const htmlPath = name.isDirectory()
      ? path.join(distGo, name.name, 'index.html')
      : null;
    if (!htmlPath || !fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (/zadeyo\.com\/go\/USMAN/i.test(html)) {
      errors.push(`dist/go/${name.name}/index.html still contains USMAN`);
    }
    const zadeyo = html.match(/https:\/\/zadeyo\.com\/go\/[^"'\\s]+/g) ?? [];
    for (const link of zadeyo) {
      if (!link.includes(`/go/${ZADEYO_AFFILIATE_CODE}?`)) {
        errors.push(`dist/go/${name.name}/index.html wrong affiliate: ${link}`);
      }
    }
  }
  const rootGo = path.join(root, 'dist', 'go', 'index.html');
  if (fs.existsSync(rootGo)) {
    const html = fs.readFileSync(rootGo, 'utf8');
    if (!html.includes(CHECKOUT_URLS.sand)) {
      errors.push('dist/go/index.html missing main sand affiliate URL');
    }
  }

  const home = path.join(root, 'dist', 'index.html');
  if (fs.existsSync(home)) {
    const html = fs.readFileSync(home, 'utf8');
    if (!html.includes(CHECKOUT_URLS.sand)) {
      errors.push('dist/index.html Buy CTAs missing sand affiliate URL');
    }
  }
}

if (errors.length) {
  console.error('Affiliate link verification failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`Affiliate links OK (zadeyo.com/go/${ZADEYO_AFFILIATE_CODE}, ${Object.keys(CHECKOUT_URLS).length} products).`);
