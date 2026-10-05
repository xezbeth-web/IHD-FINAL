import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
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
import { legacyRedirects } from './routes';

/** Scrolls to the top (or hash target) on navigation and moves focus to the new page's heading
 *  so screen-reader users hear that the page changed. The initial load is left alone. */
const NavigationManager = () => {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
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
  }, [pathname, hash]);
  return null;
};

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-white px-4 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <NavigationManager />
      <Header />
      <main id="main" className="pt-20">
        <ErrorBoundary key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/disciplines" element={<Disciplines />} />
            <Route path="/disciplines/:slug" element={<DisciplineDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/sectors/:slug" element={<Sector />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            {Object.entries(legacyRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default App;
