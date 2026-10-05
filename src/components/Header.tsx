import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../lib/nav';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors ${isActive ? 'text-ink font-medium' : 'text-ink-secondary hover:text-ink'}`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-canvas/90 backdrop-blur-md">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/brand/ihd-mark.webp" alt="" width={140} height={64} className="h-7 w-auto" />
          <span className="sr-only flex-col border-l border-white/10 pl-3 sm:not-sr-only sm:flex">
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">IHD Philippines</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">Technology Consultancy</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[13px] tracking-wide">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded border border-white/20 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white hover:text-canvas sm:inline-flex"
          >
            Request Advisory
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded border border-white/15 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? 'top-1 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`border-t border-white/10 bg-canvas xl:hidden ${open ? 'block' : 'hidden'}`}
      >
        <ul className="container-site divide-y divide-white/5 py-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 text-base ${isActive ? 'text-ink' : 'text-ink-secondary'}`
                }
              >
                {item.label}
                <span className="font-mono text-[11px] text-ink-muted">{item.index}</span>
              </NavLink>
            </li>
          ))}
          <li className="py-4">
            <Link to="/contact" className="btn-primary w-full">
              Request Advisory
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
