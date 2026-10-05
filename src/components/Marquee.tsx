import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '../lib/scroll';

interface MarqueeProps {
  items: ReactNode[];
  /** Base drift in pixels per second. */
  speed?: number;
  /** Copies of `items` per half-track; raise it until one half is wider than the widest screen. */
  repeat?: number;
  className?: string;
  itemClassName?: string;
  separator?: ReactNode;
  label?: string;
}

/**
 * Continuously drifting strip that loops without a seam: the track holds two identical
 * halves and wraps by exactly one half's width. Scrolling the page speeds it up briefly and
 * sets its direction. It only animates while on screen, and stays still for reduced motion.
 */
const Marquee = ({ items, speed = 38, repeat = 2, className = '', itemClassName = '', separator, label }: MarqueeProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const halfRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const half = halfRef.current;
    if (!root || !track || !half || prefersReducedMotion()) return;

    let width = half.offsetWidth;
    const ro = new ResizeObserver(() => (width = half.offsetWidth));
    ro.observe(half);

    let x = 0;
    let direction = 1;
    let boost = 0;
    let lastScroll = window.scrollY;
    let lastTime = 0;
    let raf = 0;
    let running = false;

    const tick = (time: number) => {
      const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
      lastTime = time;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll;
      lastScroll = scrollY;
      if (delta !== 0) direction = delta > 0 ? 1 : -1;
      // Scroll velocity adds a short-lived boost that eases back to the base drift.
      boost = Math.max(boost * 0.92, Math.min(6, Math.abs(delta) * 0.12));
      x -= speed * (1 + boost) * direction * dt;
      if (width > 0) x = ((x % width) - width) % width;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        lastTime = 0;
        lastScroll = window.scrollY;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  const sequence = Array.from({ length: repeat }, () => items).flat();
  const renderHalf = (hidden: boolean) => (
    <div ref={hidden ? undefined : halfRef} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {sequence.map((item, i) => (
        <span key={i} className={`flex shrink-0 items-center ${itemClassName}`} aria-hidden={(!hidden && i >= items.length) || undefined}>
          {item}
          {separator && <span className="marquee-sep" aria-hidden="true">{separator}</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className={`marquee relative overflow-hidden ${className}`} role={label ? 'region' : undefined} aria-label={label}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  );
};

export default Marquee;
