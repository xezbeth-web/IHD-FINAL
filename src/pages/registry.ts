import type { ComponentType } from 'react';

/** Every routed page. The client passes lazily loaded versions (pages/lazy.ts); the prerender
 *  passes the eager modules (entry-server.tsx), so the static HTML is always complete. */
export interface Pages {
  Home: ComponentType;
  About: ComponentType;
  Disciplines: ComponentType;
  DisciplineDetail: ComponentType;
  Projects: ComponentType;
  ProjectDetail: ComponentType;
  Sector: ComponentType;
  Partners: ComponentType;
  Contact: ComponentType;
  NotFound: ComponentType;
}
