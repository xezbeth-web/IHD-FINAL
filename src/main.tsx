import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './fonts.css';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Production pages are prerendered (scripts/prerender.mjs), so hydrate them; dev renders from scratch.
  if (rootElement.firstElementChild) {
    ReactDOM.hydrateRoot(rootElement, app);
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
  // Read by the reveal failsafe in index.html.
  (window as Window & { __ihdHydrated?: boolean }).__ihdHydrated = true;
}
