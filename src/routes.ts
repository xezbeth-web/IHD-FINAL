import { disciplines } from './data/disciplines';
import images from './data/images.json';
import { projects, sectors } from './data/projects';

/** Every indexable URL. Used by the prerender step and to build sitemap.xml. */
export const prerenderRoutes = [
  '/',
  '/about',
  '/disciplines',
  ...disciplines.map((d) => `/disciplines/${d.slug}`),
  '/projects',
  ...sectors.map((s) => `/sectors/${s.slug}`),
  ...projects.map((p) => `/projects/${p.slug}`),
  '/partners',
  '/contact'
];

const largest = (key: string) => {
  const entry = (images as Record<string, { widths: number[] }>)[key];
  return entry ? `/images/${key}-${entry.widths[entry.widths.length - 1]}.webp` : null;
};

/** Images per route for the image sitemap. */
export const routeImages = (): Record<string, { loc: string; caption: string }[]> => {
  const map: Record<string, { loc: string; caption: string }[]> = {};
  const add = (route: string, key: string, caption: string) => {
    const loc = largest(key);
    if (loc) (map[route] ??= []).push({ loc, caption });
  };
  for (const p of projects) {
    add(`/projects/${p.slug}`, p.image, p.imageAlt);
    p.gallery?.forEach((g) => add(`/projects/${p.slug}`, g.image, g.alt));
  }
  for (const d of disciplines) add(`/disciplines/${d.slug}`, d.image, d.imageAlt);
  return map;
};

/** Legacy URLs from the previous site, permanently moved to their new equivalents. */
export const legacyRedirects: Record<string, string> = {
  '/sectors': '/projects',
  '/services': '/disciplines',
  '/services/acoustics': '/disciplines/acoustics',
  '/services/audio-visual': '/disciplines/audiovisual',
  '/services/security': '/disciplines/security',
  '/services/infotech': '/disciplines/information-technology',
  '/services/elv': '/disciplines/information-technology',
  '/services/iot': '/disciplines/iot-smart-buildings',
  '/services/bmsepms': '/disciplines/iot-smart-buildings',
  '/services/grms': '/disciplines/guest-room-management',
  ...Object.fromEntries(projects.map((p) => [`/projects/${p.projectNumber}`, `/projects/${p.slug}`]))
};
