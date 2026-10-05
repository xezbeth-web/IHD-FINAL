import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { HeadContext, renderHeadTags, type SeoProps } from './lib/seo';

export { legacyRedirects, prerenderRoutes, routeImages } from './routes';
export { SITE } from './lib/site';

/** Renders one URL to static HTML plus the <head> tags its <Seo> component declared. */
export const render = (url: string) => {
  let head: SeoProps | null = null;
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={{ set: (data) => (head = data) }}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>
  );
  if (!head) throw new Error(`No <Seo> rendered for ${url}`);
  return { html, head: renderHeadTags(head) };
};
