// Post-build quality gate. Fails the build if any prerendered page breaks a basic SEO or
// accessibility rule, or links to a page that does not exist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
const isRedirect = (html) => html.includes('http-equiv="refresh"');
const routeOf = (file) => {
  const rel = path.relative(dist, file).replace(/\\/g, '/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

const errors = [];
const titles = new Map();
const descriptions = new Map();
const links = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (isRedirect(html)) continue;
  const route = routeOf(file);
  const fail = (msg) => errors.push(`${route}: ${msg}`);

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(`expected 1 <h1>, found ${h1s}`);

  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta[^>]*name="description" content="([^"]+)"/)?.[1];
  if (!title) fail('missing <title>');
  if (!description) fail('missing meta description');
  if (title) titles.set(title, [...(titles.get(title) ?? []), route]);
  if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), route]);

  if (route !== '/404' && !/<link[^>]*rel="canonical"/.test(html)) fail('missing canonical link');

  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img)) fail(`image without alt: ${img.slice(0, 80)}`);
  }

  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail('invalid JSON-LD');
    }
  }

  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
    const target = href.split(/[?#]/)[0] || '/';
    links.set(target, [...(links.get(target) ?? []), route]);
  }
}

for (const [title, routes] of titles) if (routes.length > 1) errors.push(`duplicate title "${title}" on ${routes.join(', ')}`);
for (const [, routes] of descriptions) if (routes.length > 1) errors.push(`duplicate meta description on ${routes.join(', ')}`);

const resolves = (target) => {
  if (target === '/') return true;
  const clean = target.replace(/\/$/, '');
  return [`${clean}.html`, clean, `${clean}/index.html`].some((p) => {
    const f = path.join(dist, p);
    return fs.existsSync(f) && fs.statSync(f).isFile();
  });
};
for (const [target, routes] of links) {
  if (!resolves(target)) errors.push(`broken internal link ${target} (from ${[...new Set(routes)].slice(0, 3).join(', ')})`);
}

if (errors.length) {
  console.error(`\nSite check failed with ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}\n`);
  process.exit(1);
}
console.log(`Site check passed: ${htmlFiles.length} HTML files, ${links.size} internal link targets verified.`);
