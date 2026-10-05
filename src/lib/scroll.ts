// One shared, rAF-throttled scroll loop for every scroll-linked effect on the page.
//
// Subscribers run in two phases per frame so layout reads never interleave with style
// writes: each `measure` reads (getBoundingClientRect etc.) and may return a `write`
// callback, and all writes run after every read has finished.

type Write = () => void;
type Measure = (viewportHeight: number) => Write | void;

const subscribers = new Set<Measure>();
let queued = false;

const frame = () => {
  queued = false;
  const vh = window.innerHeight;
  const writes: Write[] = [];
  subscribers.forEach((measure) => {
    const write = measure(vh);
    if (write) writes.push(write);
  });
  writes.forEach((write) => write());
};

const request = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(frame);
};

/** Subscribe to scroll/resize frames. Runs once immediately. Returns an unsubscribe function. */
export const onScrollFrame = (measure: Measure) => {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }
  subscribers.add(measure);
  request();
  return () => {
    subscribers.delete(measure);
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    }
  };
};

/** Ask for a frame without a scroll event (e.g. after content changes height). */
export const requestScrollFrame = () => {
  if (typeof window !== 'undefined') request();
};

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs `fn` now, or once the first-visit boot screen (index.html) has started to clear. */
export const whenBooted = (fn: () => void) => {
  const waiting =
    document.documentElement.classList.contains('booting') && !(window as Window & { __ihdBooted?: boolean }).__ihdBooted;
  if (waiting) window.addEventListener('ihd:booted', fn, { once: true });
  else fn();
};

/** Smooth-scroll to an absolute document offset (instant when motion is reduced). */
export const scrollToOffset = (top: number) =>
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
