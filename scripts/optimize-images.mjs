// Generates web-ready image variants from the full-resolution originals in /assets-src.
//
//   npm run images
//
// Outputs responsive WebP files to /public/images, 1200x630 Open Graph JPEGs to
// /public/images/og, and a manifest (src/data/images.json) that the <Img> component
// reads for srcset, intrinsic width/height and Open Graph lookups.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.json');

const groups = {
  projects: { widths: [480, 720, 960, 1600], quality: 72, og: true },
  disciplines: { widths: [640, 1280, 1920], quality: 70, og: true },
  team: { widths: [240, 480], quality: 80, trim: true, square: true },
  partners: { widths: [320, 640], quality: 90, trim: true }
};

const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'og'), { recursive: true });

const manifest = {};

for (const [group, opts] of Object.entries(groups)) {
  const dir = path.join(SRC, group);
  fs.mkdirSync(path.join(OUT, group), { recursive: true });

  for (const file of fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const slug = slugify(file);
    let base = sharp(path.join(dir, file)).rotate();
    if (opts.trim) base = sharp(await base.trim().png().toBuffer());
    if (opts.square) {
      const { width, height } = await base.metadata();
      const size = Math.max(width, height);
      base = sharp(
        await base
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer()
      );
    }

    const { width, height } = await base.metadata();
    const widths = [...new Set(opts.widths.map((w) => Math.min(w, width)))];

    for (const w of widths) {
      await base
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: opts.quality })
        .toFile(path.join(OUT, group, `${slug}-${w}.webp`));
    }

    if (opts.og) {
      await base
        .clone()
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .flatten({ background: '#0c0e12' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(OUT, 'og', `${slug}.jpg`));
    }

    manifest[`${group}/${slug}`] = { width, height, widths, ...(opts.og ? { og: true } : {}) };
    console.log(`${group}/${slug}`, widths.join(','));
  }
}

// Brand assets: compact "iHD.ph" mark for the header, full lockup for schema/OG, favicons.
const logo = await sharp(path.join(SRC, 'brand', 'logo.png')).trim().png().toBuffer();
const { width: lw, height: lh } = await sharp(logo).metadata();
// The lockup is "iHD.ph | IHD Philippines Ltd. Inc. / Technology Consultancy"; the vertical
// divider sits at ~39.4% of the trimmed width and the "iHD" letterforms end at ~25.6% (the dot touches the D).
const mark = await sharp(logo).extract({ left: 0, top: 0, width: Math.round(lw * 0.393), height: lh }).trim().png().toBuffer();
const glyph = await sharp(logo).extract({ left: 0, top: 0, width: Math.round(lw * 0.2558), height: lh }).trim().png().toBuffer();
fs.mkdirSync(path.join(OUT, 'brand'), { recursive: true });

await sharp(mark).resize({ height: 64 }).webp({ quality: 90 }).toFile(path.join(OUT, 'brand', 'ihd-mark.webp'));
await sharp(mark).resize({ height: 64 }).png().toFile(path.join(OUT, 'brand', 'ihd-mark.png'));
await sharp(logo).resize({ width: 1200 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'brand', 'ihd-logo.png'));
const { width: mw, height: mh } = await sharp(await sharp(mark).resize({ height: 64 }).toBuffer()).metadata();
manifest['brand/ihd-mark'] = { width: mw, height: mh, widths: [] };

const square = (size, pad) =>
  sharp(glyph)
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: '#0c0e12' })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 12, g: 14, b: 18, alpha: 1 } })
    .flatten({ background: '#0c0e12' });
await square(32, 3).png().toFile(path.join(ROOT, 'public', 'favicon-32.png'));
await square(180, 24).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
await square(512, 64).png().toFile(path.join(ROOT, 'public', 'icon-512.png'));

// Default social card: the lockup centred on the canvas colour.
const lockup = await sharp(logo).resize({ width: 860 }).png().toBuffer();
const { height: lockH } = await sharp(lockup).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0c0e12' } })
  .composite([{ input: lockup, left: 170, top: Math.round((630 - lockH) / 2) }])
  .jpeg({ quality: 85 })
  .toFile(path.join(OUT, 'og', 'default.jpg'));

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} images -> ${path.relative(ROOT, MANIFEST)}`);
