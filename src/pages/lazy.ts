import { lazy } from 'react';
import Home from './Home';
import NotFound from './NotFound';
import type { Pages } from './registry';

// Each inner page (and the data only it needs, such as FAQs and sector copy) ships as its own
// chunk. Home stays in the main bundle because most visits start there.
const loaders = {
  About: () => import('./About'),
  Disciplines: () => import('./Disciplines'),
  DisciplineDetail: () => import('./DisciplineDetail'),
  Projects: () => import('./Projects'),
  ProjectDetail: () => import('./ProjectDetail'),
  Sector: () => import('./Sector'),
  Partners: () => import('./Partners'),
  Contact: () => import('./Contact')
};

export const pages: Pages = {
  Home,
  NotFound,
  About: lazy(loaders.About),
  Disciplines: lazy(loaders.Disciplines),
  DisciplineDetail: lazy(loaders.DisciplineDetail),
  Projects: lazy(loaders.Projects),
  ProjectDetail: lazy(loaders.ProjectDetail),
  Sector: lazy(loaders.Sector),
  Partners: lazy(loaders.Partners),
  Contact: lazy(loaders.Contact)
};

/** Starts downloading the chunk for a path (no-op for Home and unknown paths). */
export const preloadRoute = (path: string) => {
  const [first, second] = path.split(/[?#]/)[0].split('/').filter(Boolean);
  const loader =
    first === 'about'
      ? loaders.About
      : first === 'disciplines'
        ? second
          ? loaders.DisciplineDetail
          : loaders.Disciplines
        : first === 'projects'
          ? second
            ? loaders.ProjectDetail
            : loaders.Projects
          : first === 'sectors'
            ? loaders.Sector
            : first === 'partners'
              ? loaders.Partners
              : first === 'contact'
                ? loaders.Contact
                : null;
  return loader?.();
};
