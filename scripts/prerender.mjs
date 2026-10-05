// Post-build step: renders every route to static HTML so search engines and social
// crawlers receive full content and per-page metadata without executing JavaScript.
//
// GitHub Pages serves /about from about.html, so each route is written as <path>.html
// and canonical URLs carry no trailing slash.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

const { render, prerenderRoutes, legacyRedirects, routeImages, SITE } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

// Preload the Latin subsets of the two text faces used above the fold (hashed filenames).
const assets = fs.readdirSync(path.join(dist, 'assets'));
const preloads = ['inter-latin-wght-normal', 'plus-jakarta-sans-latin-wght-normal']
  .map((prefix) => assets.find((f) => f.startsWith(`${prefix}-`) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`);
template = template.replace('<!--font-preload-->', preloads.join('\n    '));

// Inline the (small) stylesheet so first paint does not wait on a render-blocking request.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href), 'utf8');
  return `<style>${css}</style>`;
});

// Each inner page is its own chunk (src/pages/lazy.ts). Preload the current page's chunk and its
// imports in the HTML so they download alongside the main bundle instead of after it.
const manifestPath = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const pageFor = (route) => {
  const [first, second] = route.split('/').filter(Boolean);
  if (first === 'about') return 'About';
  if (first === 'disciplines') return second ? 'DisciplineDetail' : 'Disciplines';
  if (first === 'projects') return second ? 'ProjectDetail' : 'Projects';
  if (first === 'sectors') return 'Sector';
  if (first === 'partners') return 'Partners';
  if (first === 'contact') return 'Contact';
  return null;
};
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);
const preloadedByEntry = new Set([entryKey, ...(manifest[entryKey].imports ?? [])]);
const chunkPreloads = (route) => {
  const page = pageFor(route);
  if (!page) return '';
  const files = new Set();
  const walk = (key) => {
    if (preloadedByEntry.has(key) || !manifest[key]) return;
    files.add(manifest[key].file);
    (manifest[key].imports ?? []).forEach(walk);
  };
  walk(`src/pages/${page}.tsx`);
  return [...files].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`).join('\n    ');
};

const fileFor = (route) => path.join(dist, route === '/' ? 'index.html' : `${route.slice(1)}.html`);

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
};

const page = (route) => {
  const { html, head } = render(route);
  const preloads = chunkPreloads(route);
  return template.replace('<!--app-head-->', preloads ? `${head}\n    ${preloads}` : head).replace('<!--app-html-->', html);
};

for (const route of prerenderRoutes) {
  write(fileFor(route), page(route));
}

// 404 page, served by GitHub Pages for any unknown path. The client router then
// hydrates it as the NotFound route.
write(path.join(dist, '404.html'), page('/__not-found__'));

// Legacy URLs: static redirect stubs (GitHub Pages has no server-side redirects).
for (const [from, to] of Object.entries(legacyRedirects)) {
  const target = `${SITE.url}${to}`;
  write(
    fileFor(from),
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved — ${SITE.name}</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${to}">${target}</a>.</p></body>
</html>
`
  );
}

// Sitemap
const priority = (route) => (route === '/' ? '1.0' : route.split('/').length === 2 ? '0.8' : '0.6');
const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const imagesByRoute = routeImages();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${prerenderRoutes
  .map((route) => {
    const imgs = (imagesByRoute[route] ?? [])
      .map((img) => `\n    <image:image>\n      <image:loc>${xml(SITE.url + img.loc)}</image:loc>\n    </image:image>`)
      .join('');
    return `  <url>
    <loc>${SITE.url}${route === '/' ? '/' : route}</loc>
    <priority>${priority(route)}</priority>${imgs}
  </url>`;
  })
  .join('\n')}
</urlset>
`;
write(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true });
console.log(
  `Prerendered ${prerenderRoutes.length} pages, 404.html, ${Object.keys(legacyRedirects).length} redirects and sitemap.xml`
);
