import React, { startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { pages, preloadRoute } from './pages/lazy';
import './fonts.css';
import './index.css';
import './motion.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <App pages={pages} />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Fetch the current page's chunk alongside the main bundle rather than after it.
  preloadRoute(location.pathname);

  // Prefetch a page's chunk as soon as a visitor points at (or touches) a link to it.
  const prefetch = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.('a[href^="/"]');
    if (link) preloadRoute(link.getAttribute('href') ?? '');
  };
  document.addEventListener('pointerover', prefetch, { passive: true });
  document.addEventListener('touchstart', prefetch, { passive: true });
  document.addEventListener('focusin', prefetch);

  // Production pages are prerendered (scripts/prerender.mjs), so hydrate them; dev renders from scratch.
  if (rootElement.firstElementChild) {
    // Hydrate as a transition so React yields to the browser between slices of work instead
    // of blocking the main thread for the whole page at once.
    startTransition(() => {
      ReactDOM.hydrateRoot(rootElement, app);
    });
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
  // Read by the reveal failsafe in index.html. If that failsafe already fired (hydration took
  // over 4s on a slow connection), restore the class so the page runs with its JS styles.
  (window as Window & { __ihdHydrated?: boolean }).__ihdHydrated = true;
  document.documentElement.classList.add('js');
}
