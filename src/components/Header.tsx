import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../lib/nav';
import { onScrollFrame } from '../lib/scroll';
import { SITE } from '../lib/site';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => setOpen(false), [pathname]);

  // Frosted once scrolled, hidden while scrolling down, back on any scroll up; the hairline
  // along the bottom tracks reading progress through the page.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    return onScrollFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, y / max) : 0;
      const hide = !openRef.current && y > 240 && y > lastY + 2;
      const show = y < lastY - 2 || y <= 240;
      lastY = y;
      return () => {
        header.toggleAttribute('data-scrolled', y > 24);
        if (hide) header.setAttribute('data-hidden', '');
        else if (show) header.removeAttribute('data-hidden');
        if (progressRef.current) progressRef.current.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
      };
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    headerRef.current?.removeAttribute('data-hidden');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-nav"]')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header
      ref={headerRef}
      className="site-header group/header fixed inset-x-0 top-0 z-50 border-b border-transparent data-[scrolled]:border-white/10 data-[scrolled]:bg-canvas/75 data-[scrolled]:backdrop-blur-xl"
    >
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <img src="/images/brand/ihd-mark.webp" alt="" width={140} height={64} className="h-7 w-auto" />
          <span className="sr-only flex-col border-l border-white/10 pl-3 sm:not-sr-only sm:flex">
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">IHD Philippines</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">Technology Consultancy</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-8 text-[13px] tracking-wide">
            {navItems
              .filter((item) => item.to !== '/')
              .map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group relative py-2 transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink-secondary hover:text-ink'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-500 ease-out ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded border border-white/20 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-white hover:bg-white hover:text-canvas sm:inline-flex"
          >
            Request Advisory
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2.5 rounded border border-white/15 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-white/40 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-500 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-500 ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <span ref={progressRef} className="scroll-progress absolute inset-x-0 bottom-[-1px] h-px bg-signal/80" aria-hidden="true" />
    </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className="menu-panel fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#08090c] pt-24 xl:hidden"
        data-open={open || undefined}
        {...(!open ? { inert: '' } : {})}
      >
        <ul className="container-site flex-1">
          {navItems.map((item, i) => (
            <li key={item.to} className="border-b border-white/[0.06]" style={{ '--i': i } as CSSProperties}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-baseline justify-between py-5 font-display text-3xl font-light tracking-tight transition-colors sm:text-4xl ${
                    isActive ? 'text-ink' : 'text-ink-secondary hover:text-ink'
                  }`
                }
              >
                {item.label}
                <span className="font-mono text-[11px] text-ink-muted">{item.index}</span>
              </NavLink>
            </li>
          ))}
          <li className="pt-8" style={{ '--i': navItems.length } as CSSProperties}>
            <Link to="/contact" className="btn-primary w-full">
              Request Advisory
            </Link>
          </li>
          <li className="space-y-1 py-10 font-mono text-[12px] text-ink-secondary" style={{ '--i': navItems.length + 1 } as CSSProperties}>
            <a href={`mailto:${SITE.email}`} className="block hover:text-ink">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneE164}`} className="block hover:text-ink">
              {SITE.phoneDisplay}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
