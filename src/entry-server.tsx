import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import DisciplineDetail from './pages/DisciplineDetail';
import Disciplines from './pages/Disciplines';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Partners from './pages/Partners';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Sector from './pages/Sector';
import { HeadContext, renderHeadTags, type SeoProps } from './lib/seo';

export { legacyRedirects, prerenderRoutes, routeImages } from './routes';
export { SITE } from './lib/site';

/** Renders one URL to static HTML plus the <head> tags its <Seo> component declared. */
// The prerender renders every page eagerly so each HTML file is complete.
const pages = { Home, About, Disciplines, DisciplineDetail, Projects, ProjectDetail, Sector, Partners, Contact, NotFound };

export const render = (url: string) => {
  let head: SeoProps | null = null;
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={{ set: (data) => (head = data) }}>
        <StaticRouter location={url}>
          <App pages={pages} />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>
  );
  if (!head) throw new Error(`No <Seo> rendered for ${url}`);
  return { html, head: renderHeadTags(head) };
};
