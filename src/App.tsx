import { Suspense, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollBar from './components/ScrollBar';
import { isInPlace } from './lib/nav';
import type { Pages } from './pages/registry';
import { legacyRedirects } from './routes';

const isDisciplinePage = (path: string) => /^\/disciplines\/[^/]+$/.test(path);

/** Scrolls to the top (or hash target) on navigation and moves focus to the new page's heading
 *  so screen-reader users hear that the page changed. The initial load is left alone, and so are
 *  in-place content swaps. */
const NavigationManager = ({ swap }: { swap: boolean }) => {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    if (swap) return;
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0 });
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const heading = document.querySelector<HTMLElement>('main h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.style.outline = 'none';
      heading.focus({ preventScroll: true });
    }
  }, [pathname, hash, swap]);
  return null;
};

const App = ({ pages }: { pages: Pages }) => {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  // Route transitions play only on client-side navigation, never on the prerendered first paint,
  // and not for in-place content swaps (the page wrapper keeps its key, so nothing remounts).
  // A swap is a link marked IN_PLACE, or Back/Forward between two discipline pages.
  const lastPath = useRef(pathname);
  const pageKey = useRef(pathname);
  const navigated = useRef(false);
  const swap = useRef(false);
  if (lastPath.current !== pathname) {
    swap.current =
      isInPlace(state) || (navigationType === 'POP' && isDisciplinePage(lastPath.current) && isDisciplinePage(pathname));
    lastPath.current = pathname;
    if (!swap.current) {
      navigated.current = true;
      pageKey.current = pathname;
    }
  }
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-white px-4 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <NavigationManager swap={swap.current} />
      <Header />
      <ScrollBar />
      {navigated.current && <div key={`wipe-${pageKey.current}`} className="route-wipe" aria-hidden="true" />}
      <main id="main">
        <div key={pageKey.current} className={navigated.current ? 'page-enter' : undefined}>
          <ErrorBoundary>
            {/* Pages load on demand in the browser. While a page's chunk is still downloading during
                hydration, React keeps the prerendered HTML on screen, so nothing flashes. */}
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<pages.Home />} />
                <Route path="/about" element={<pages.About />} />
                <Route path="/disciplines" element={<pages.Disciplines />} />
                <Route path="/disciplines/:slug" element={<pages.DisciplineDetail />} />
                <Route path="/projects" element={<pages.Projects />} />
                <Route path="/projects/:slug" element={<pages.ProjectDetail />} />
                <Route path="/sectors/:slug" element={<pages.Sector />} />
                <Route path="/partners" element={<pages.Partners />} />
                <Route path="/contact" element={<pages.Contact />} />
                {Object.entries(legacyRedirects).map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to} replace />} />
                ))}
                <Route path="*" element={<pages.NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
