import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { onScrollFrame } from '../lib/scroll';

/**
 * The site's scrollbar (native scrollbars are hidden in motion.css). The thumb brightens from a
 * faint grey to white as the reader approaches the end of the page. It can be dragged, and
 * clicking the track pages towards the click, like a native bar. Shown once JS has mounted it.
 */
const ScrollBar = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const geometry = useRef({ max: 0, travel: 0 });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('custom-scrollbar');

    const thumb = thumbRef.current;
    const track = trackRef.current;
    let last = '';
    const off = onScrollFrame((vh) => {
      const doc = root.scrollHeight;
      const max = Math.max(0, doc - vh);
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const height = Math.max(40, Math.round((vh * vh) / Math.max(doc, vh)));
      const travel = vh - height;
      geometry.current = { max, travel };
      const key = `${height}|${Math.round(p * travel)}|${p.toFixed(3)}|${max > 0}`;
      if (key === last) return;
      return () => {
        last = key;
        if (!thumb || !track) return;
        track.style.display = max > 0 ? '' : 'none';
        thumb.style.height = `${height}px`;
        thumb.style.transform = `translate3d(0,${(p * travel).toFixed(1)}px,0)`;
        // Faint grey at the top of the page, full white at the end.
        thumb.style.backgroundColor = `rgba(255,255,255,${(0.2 + 0.8 * p).toFixed(3)})`;
        thumb.style.boxShadow = p > 0.97 ? '0 0 10px rgba(255,255,255,0.45)' : '';
      };
    });

    return () => {
      off();
      root.classList.remove('custom-scrollbar');
    };
  }, []);

  // Dragging maps thumb travel to page scroll. Snap points are paused while dragging so the page
  // follows the pointer exactly.
  const onThumbDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const thumb = e.currentTarget;
    thumb.setPointerCapture(e.pointerId);
    const startY = e.clientY;
    const startScroll = window.scrollY;
    const root = document.documentElement;
    root.style.scrollSnapType = 'none';
    thumb.dataset.dragging = '';
    const move = (ev: PointerEvent) => {
      const { max, travel } = geometry.current;
      if (travel <= 0) return;
      window.scrollTo({ top: startScroll + ((ev.clientY - startY) / travel) * max, behavior: 'instant' });
    };
    const up = () => {
      root.style.scrollSnapType = '';
      delete thumb.dataset.dragging;
      thumb.removeEventListener('pointermove', move);
      thumb.removeEventListener('pointerup', up);
      thumb.removeEventListener('pointercancel', up);
    };
    thumb.addEventListener('pointermove', move);
    thumb.addEventListener('pointerup', up);
    thumb.addEventListener('pointercancel', up);
  };

  // Clicking the track pages up or down towards the click.
  const onTrackDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const rect = thumb.getBoundingClientRect();
    const direction = e.clientY < rect.top ? -1 : 1;
    window.scrollBy({ top: direction * window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <div ref={trackRef} className="site-scrollbar" onPointerDown={onTrackDown} aria-hidden="true">
      <div ref={thumbRef} className="site-scrollbar-thumb" onPointerDown={onThumbDown} />
    </div>
  );
};

export default ScrollBar;
