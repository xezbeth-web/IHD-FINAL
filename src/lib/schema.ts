import { disciplines } from '../data/disciplines';
import { SITE, absoluteUrl } from './site';

// schema.org helpers. Only facts present in SITE and the content files are emitted.

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export const organization = () => ({
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  image: absoluteUrl(SITE.defaultOgImage),
  email: SITE.email,
  telephone: SITE.phoneE164,
  address: { '@type': 'PostalAddress', addressCountry: 'PH' },
  areaServed: { '@type': 'Country', name: 'Philippines' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30'
  },
  knowsAbout: disciplines.map((d) => d.name),
  makesOffer: disciplines.map((d) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: d.name, url: absoluteUrl(`/disciplines/${d.slug}`) }
  }))
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-PH'
});

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path)
  }))
});

export const webPage = (type: string, path: string, name: string, description: string, extra: Record<string, unknown> = {}) => ({
  '@type': type,
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en-PH',
  ...extra
});

export const service = (slug: string) => {
  const d = disciplines.find((x) => x.slug === slug)!;
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(`/disciplines/${d.slug}`)}#service`,
    name: d.name,
    serviceType: d.h1,
    description: d.summary,
    url: absoluteUrl(`/disciplines/${d.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Philippines' }
  };
};

export const faqPage = (path: string, faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': `${absoluteUrl(path)}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
});

export const graph = (...nodes: Record<string, unknown>[]) => [
  { '@context': 'https://schema.org', '@graph': [organization(), website(), ...nodes] }
];
