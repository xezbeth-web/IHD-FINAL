import { scrollToOffset } from '../lib/scroll';
import { SITE } from '../lib/site';

/** Back to the top, landing focus on the page's heading for keyboard and screen-reader users. */
const backToTop = () => {
  scrollToOffset(0);
  const heading = document.querySelector<HTMLElement>('main h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.style.outline = 'none';
    heading.focus({ preventScroll: true });
  }
};

/**
 * A single line that reads as the bottom edge of the final scene rather than a separate block:
 * the legal name and contact details (kept on every page for trust and local search), plus a
 * way back up. The final scene is shortened by this strip's height (motion.css) so the last
 * screen still holds as one whole view.
 */
const Footer = () => (
  <footer className="site-footer relative z-10 bg-[#08090c] text-ink-muted">
    <div className="container-site flex flex-col gap-4 border-t border-white/[0.06] py-6 font-mono text-[11px] tracking-[0.04em] md:flex-row md:items-center md:justify-between">
      <p className="flex flex-wrap gap-x-6 gap-y-2">
        <span>
          © {new Date().getFullYear()} {SITE.legalName}
        </span>
        <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-ink">
          {SITE.email}
        </a>
        <a href={`tel:${SITE.phoneE164}`} className="transition-colors hover:text-ink">
          {SITE.phoneDisplay}
        </a>
      </p>
      <button
        type="button"
        onClick={backToTop}
        className="group inline-flex items-center gap-2.5 self-start uppercase tracking-[0.16em] text-ink-secondary transition-colors hover:text-ink md:self-auto"
      >
        Back to top
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-signal group-hover:text-signal"
          aria-hidden="true"
        >
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="square" />
          </svg>
        </span>
      </button>
    </div>
  </footer>
);

export default Footer;
