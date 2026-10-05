export const navItems = [
  { label: 'Home', to: '/', index: '00' },
  { label: 'Practice Profile', to: '/about', index: '01' },
  { label: 'Disciplines', to: '/disciplines', index: '02' },
  { label: 'Portfolio', to: '/projects', index: '03' },
  { label: 'Partners', to: '/partners', index: '04' },
  { label: 'Contact', to: '/contact', index: '05' }
];

/** Links that swap a page's content where the visitor is (e.g. the discipline switcher) pass
 *  this as router state: the URL updates, but there is no route transition and no scroll. */
export const IN_PLACE = { inPlace: true } as const;
export const isInPlace = (state: unknown) => (state as { inPlace?: boolean } | null)?.inPlace === true;
