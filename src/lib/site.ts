// Business facts used across copy, metadata and structured data.
// Keep this the single source of truth: everything here must be verifiable.
export const SITE = {
  url: 'https://ihd-mnl.com',
  name: 'IHD Philippines',
  legalName: 'IHD Philippines Ltd. Inc.',
  tagline: 'Technology Consultancy',
  email: 'design@ihd-mnl.com',
  phoneDisplay: '+63 (917) 863-4060',
  phoneE164: '+639178634060',
  hours: 'Monday – Friday, 8:30 AM – 5:30 PM (PHT)',
  responseTime: 'We respond within one business day.',
  defaultOgImage: '/images/og/default.jpg',
  logo: '/images/brand/ihd-logo.png',
  social: [
    { name: 'Facebook', url: 'https://www.facebook.com/ihdmnl/' },
    { name: 'Instagram', url: 'https://www.instagram.com/ihd_mnl/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ihd-ph/' }
  ]
} as const;

export type SocialName = (typeof SITE.social)[number]['name'];
export const socialUrl = (name: SocialName) => SITE.social.find((s) => s.name === name)!.url;

export const absoluteUrl = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path === '/' ? '' : path}`);
