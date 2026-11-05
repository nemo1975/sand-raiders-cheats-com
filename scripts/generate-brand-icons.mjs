import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const brandDir = path.join(publicDir, 'images', 'brand');

const bundledGrid = path.join(brandDir, 'sr-logo-grid.jpg');
const defaultSource = path.join(brandDir, 'sr-logo-quadrant.png');

const gridSource = fs.existsSync(bundledGrid)
  ? bundledGrid
  : fs.existsSync(defaultSource)
    ? defaultSource
    : path.join(
        process.env.USERPROFILE ?? '',
        '.cursor',
        'projects',
        'c-Projects-sand-raiders-cheats-com',
        'assets',
        'image-8fbc9c3e-32b0-401f-b14a-56b98d54b11a.jpg',
      );

if (!fs.existsSync(gridSource)) {
  console.error('SR logo grid not found. Place sr-logo-grid.jpg in public/images/brand/');
  process.exit(1);
}

fs.mkdirSync(brandDir, { recursive: true });

/** Matches site background / theme (see global.css, site.webmanifest). */
const TILE = { r: 10, g: 6, b: 20, alpha: 1 };

async function croppedLogo() {
  const { width, height } = await sharp(gridSource).rotate().metadata();
  if (!width || !height) throw new Error('Could not read logo grid dimensions');

  const halfW = Math.floor(width / 2);
  const halfH = Math.floor(height / 2);

  return sharp(gridSource)
    .rotate()
    .extract({ left: halfW, top: 0, width: width - halfW, height: halfH })
    .modulate({ brightness: 1.28, saturation: 1.22 });
}

async function logoOnTile(size) {
  return (await croppedLogo()).resize(size, size, { fit: 'contain', background: TILE }).png();
}

const master = await logoOnTile(512);
await master.clone().toFile(path.join(brandDir, 'sr-favicon-master.png'));
await master.clone().resize(128, 128).toFile(path.join(brandDir, 'nav-mark.png'));

await master.clone().resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
await master.clone().resize(32, 32).toFile(path.join(publicDir, 'favicon-32.png'));
await master.clone().resize(16, 16).toFile(path.join(publicDir, 'favicon-16.png'));
await master.clone().resize(32, 32).toFile(path.join(publicDir, 'favicon.ico'));

const png64 = await master.clone().resize(64, 64).png().toBuffer();
const b64 = png64.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Sand Raiders Cheats">
  <defs>
    <linearGradient id="sr-bg" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2e1065"/>
      <stop offset="1" stop-color="#0a0614"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#sr-bg)"/>
  <rect x="1.25" y="1.25" width="61.5" height="61.5" rx="12.75" fill="none" stroke="#7c3aed" stroke-opacity="0.45" stroke-width="1"/>
  <image width="50" height="50" x="7" y="7" href="data:image/png;base64,${b64}" />
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

console.log('Brand icons generated (SR on dark purple tile).');
