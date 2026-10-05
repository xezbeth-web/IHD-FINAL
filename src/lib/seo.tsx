import { createContext, useContext, useEffect } from 'react';
import { SITE, absoluteUrl } from './site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

interface HeadCollector {
  set: (data: SeoProps) => void;
}

// On the server (prerender) a collector captures the page's head data during render.
// In the browser the context is empty and <Seo> updates document.head in an effect.
export const HeadContext = createContext<HeadCollector | null>(null);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const escapeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export const renderHeadTags = (data: SeoProps) => {
  const url = absoluteUrl(data.path);
  const image = absoluteUrl(data.image ?? SITE.defaultOgImage);
  const tags = [
    `<title>${escapeHtml(data.title)}</title>`,
    `<meta name="description" content="${escapeHtml(data.description)}">`,
    `<meta name="robots" content="${data.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    data.noindex ? '' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="en_PH">`,
    `<meta property="og:type" content="${data.type ?? 'website'}">`,
    `<meta property="og:title" content="${escapeHtml(data.title)}">`,
    `<meta property="og:description" content="${escapeHtml(data.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    data.imageAlt ? `<meta property="og:image:alt" content="${escapeHtml(data.imageAlt)}">` : '',
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(data.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(data.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    ...(data.jsonLd ?? []).map((graph) => `<script type="application/ld+json">${escapeJson(graph)}</script>`)
  ];
  return tags
    .filter(Boolean)
    .map((tag) => tag.replace(/^<(\w+)/, '<$1 data-seo'))
    .join('\n    ');
};

const applyHead = (data: SeoProps) => {
  document.title = data.title;
  document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove());
  document.head.insertAdjacentHTML('beforeend', renderHeadTags(data));
};

export const Seo = (props: SeoProps) => {
  const collector = useContext(HeadContext);
  if (collector) collector.set(props);

  const key = JSON.stringify(props);
  useEffect(() => {
    applyHead(JSON.parse(key) as SeoProps);
  }, [key]);

  return null;
};
