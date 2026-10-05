import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { clamp, onScrollFrame, prefersReducedMotion } from '../lib/scroll';

/**
 * Headline that rises into place word by word, each word sliding up inside its own mask.
 * Plays when an ancestor `.scene` (or `.reveal`) gains `.in-view`/`.visible`. The text stays
 * plain, crawlable copy; the wrappers only add motion.
 */
export const RevealText = ({ text, delay = 0, step = 45 }: { text: string; delay?: number; step?: number }) => (
  <>
    {text.split(' ').map((word, i, all) => (
      <Fragment key={i}>
        <span className="rv-word">
          <span style={{ '--d': `${delay + i * step}ms` } as CSSProperties}>{word}</span>
        </span>
        {i < all.length - 1 ? ' ' : ''}
      </Fragment>
    ))}
  </>
);

/**
 * Statement whose words light up in reading order as it scrolls through the viewport.
 * Words below the reading line stay dim; without JS (or with reduced motion) all are lit.
 */
export const ScrollLitText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.classList.add('is-lit-tracking');
    let last = -1;
    return onScrollFrame((vh) => {
      const r = el.getBoundingClientRect();
      // 0 when the paragraph's top reaches 85% of the viewport, 1 when its bottom reaches 45%.
      const p = Math.round(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.4)) * 1000) / 1000;
      if (p === last) return;
      return () => {
        el.style.setProperty('--lit', String(p));
        last = p;
      };
    });
  }, []);

  return (
    <p ref={ref} className={`scroll-lit ${className}`} style={{ '--n': words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};

/**
 * Number that counts up from zero the first time it is scrolled into view. Prerendered HTML
 * carries the final value, so crawlers and no-JS visitors see the real figure.
 */
export const CountUp = ({ value, pad = 0, duration = 1400 }: { value: number; pad?: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = clamp((now - start) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(shown).padStart(pad, '0')}
    </span>
  );
};
