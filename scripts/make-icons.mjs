// Generates the favicon set and app icons from the vector "iHD" glyph.
//
//   npm run icons
//
// Writes to /public: favicon.svg (modern browsers), favicon.ico (16/32/48 — also what
// Google Search shows beside results), apple-touch-icon.png, and the 192/512 and maskable
// icons referenced by site.webmanifest.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const CANVAS = '#0c0e12';

const glyph = fs.readFileSync(path.join(ROOT, 'assets-src', 'brand', 'ihd-glyph.svg'), 'utf8');
const [vx, vy, vw, vh] = glyph.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const inner = glyph.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<!--[\s\S]*?-->/g, '').trim();

/** Square icon: the glyph centred at `scale` of the icon width on the canvas colour. */
const iconSvg = (size, scale, radius = 0) => {
  const w = size * scale;
  const k = w / vw;
  const h = vh * k;
  const tx = (size - w) / 2 - vx * k;
  const ty = (size - h) / 2 - vy * k;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${CANVAS}"/>
  <g transform="translate(${+tx.toFixed(2)} ${+ty.toFixed(2)}) scale(${+k.toFixed(5)})">
    ${inner.replace(/\n\s*/g, '\n    ')}
  </g>
</svg>
`;
};

const png = (size, scale, radius = 0) =>
  sharp(Buffer.from(iconSvg(size, scale, radius)), { density: 72 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// Tabs render favicons tiny, so the glyph fills almost the whole square there.
fs.writeFileSync(path.join(PUBLIC, 'favicon.svg'), iconSvg(64, 0.86, 12));

// favicon.ico with embedded PNGs (supported by every current browser and by Google).
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map((s) => png(s, 0.9, Math.round(s * 0.18))));
const header = Buffer.alloc(6 + 16 * icoImages.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = header.length;
icoImages.forEach((img, i) => {
  const at = 6 + i * 16;
  header.writeUInt8(icoSizes[i], at);
  header.writeUInt8(icoSizes[i], at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(img.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += img.length;
});
fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ...icoImages]));

// iOS rounds the corners itself; Android masks "maskable" icons to a circle, so keep the glyph
// inside the central safe zone there.
fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), await png(180, 0.72));
fs.writeFileSync(path.join(PUBLIC, 'icon-192.png'), await png(192, 0.76, 36));
fs.writeFileSync(path.join(PUBLIC, 'icon-512.png'), await png(512, 0.76, 96));
fs.writeFileSync(path.join(PUBLIC, 'icon-maskable-512.png'), await png(512, 0.58));

console.log('Icons written: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png');
