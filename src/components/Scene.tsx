import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { clamp, onScrollFrame, prefersReducedMotion, requestScrollFrame, whenBooted } from '../lib/scroll';

export type SceneTone = 'base' | 'alt' | 'deep';

interface SceneProps {
  children: ReactNode;
  /** Anchor id for in-page links (placed on a static marker so sticky stacking can't skew the target). */
  id?: string;
  /** Short name shown in the section rail. */
  label?: string;
  tone?: SceneTone;
  /** Fill at least one viewport and centre the content vertically. */
  full?: boolean;
  /** Stick at the end of the scene so the next one slides over it. */
  stack?: boolean;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  as?: 'section' | 'div' | 'nav';
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

/**
 * A full-viewport "page" in the scroll story.
 *
 * - Adds `.in-view` once the scene enters, which plays its `[data-rv]` reveals.
 * - Rises into view with a short parallax lag, then dims and recedes while the next scene
 *   covers it; children marked `data-depth="<px>"` drift by that many pixels over the exit.
 * - Sticks once its bottom reaches the viewport bottom, holds for a beat (`.scene-hold`), then
 *   the following scene slides over it.
 * Without JavaScript or with reduced motion, it is an ordinary section.
 */
const Scene = ({
  children,
  id,
  label,
  tone = 'base',
  full = true,
  stack = true,
  className = '',
  innerClassName = '',
  style,
  as: Tag = 'section',
  ...aria
}: SceneProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const shadeRef = useRef<HTMLDivElement | null>(null);
  const holdRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const anchor = anchorRef.current;
    const inner = innerRef.current;
    const shade = shadeRef.current;
    if (!el || !anchor || !inner || !shade) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          whenBooted(() => el.classList.add('in-view'));
        }
      },
      { rootMargin: '0px 0px -18% 0px' }
    );
    io.observe(el);

    // Fit to screen: on desktop, a full scene whose content runs slightly taller than the viewport
    // (up to 20%) is scaled down just enough to show as one whole view, so it can hold in place
    // with its title visible. Phones keep their natural, scrolling layouts.
    let zoom = 1;
    const fit = () => {
      if (!full || window.innerWidth < 1024) {
        if (zoom !== 1) inner.style.zoom = '';
        zoom = 1;
        return;
      }
      let content = 0;
      for (const child of inner.children) {
        const position = getComputedStyle(child).position;
        if (position === 'absolute' || position === 'fixed') continue;
        content += child.getBoundingClientRect().height / zoom;
      }
      const ratio = content / window.innerHeight;
      const next = ratio > 1.005 && ratio <= 1.2 ? Math.max(0.84, Math.floor((1 / ratio) * 1000) / 1000) : 1;
      if (Math.abs(next - zoom) > 0.004) {
        zoom = next;
        inner.style.zoom = next === 1 ? '' : String(next);
      }
    };
    const fitObserver = new ResizeObserver(fit);
    fitObserver.observe(inner);
    window.addEventListener('resize', fit);

    if (prefersReducedMotion()) {
      el.classList.add('in-view');
      return () => {
        io.disconnect();
        fitObserver.disconnect();
        window.removeEventListener('resize', fit);
      };
    }

    // Only stack when another scene follows; the last one simply scrolls away into the footer.
    const hold = holdRef.current;
    const stacks = stack && !!hold?.nextElementSibling;
    if (stacks) el.classList.add('is-stacked');
    let height = el.offsetHeight;
    // Scroll distance the scene stays fully in place (stuck, undimmed) before the next one
    // starts to cover it — a beat to take each page in. Set by `.scene-hold` in motion.css.
    let holdHeight = stacks && hold ? hold.offsetHeight : 0;
    const ro = new ResizeObserver(() => {
      height = el.offsetHeight;
      holdHeight = stacks && hold ? hold.offsetHeight : 0;
      requestScrollFrame();
    });
    ro.observe(el);
    if (stacks && hold) ro.observe(hold);

    // Effects are written straight onto the few elements that move — never as inherited custom
    // properties — so a scroll frame restyles a handful of nodes rather than whole scenes.
    const layers = [...el.querySelectorAll<HTMLElement>('[data-depth]')].map((node) => ({
      node,
      depth: Number(node.dataset.depth)
    }));

    let last = { top: NaN, enter: -1, exit: -1, live: false };
    const off = onScrollFrame((vh) => {
      // The anchor sits in normal flow directly above the scene, so it reports where the
      // scene would be without sticking.
      const top = anchor.getBoundingClientRect().top;
      const live = top < vh * 1.6 && top + height + holdHeight > -vh * 1.6;
      if (!live) {
        if (!last.live) return;
        // Leaving the active range (including a jump straight past it): settle to neutral so no
        // stale entrance offset or dimming lingers on a scene that's parked off screen.
        return () => {
          inner.style.willChange = '';
          inner.style.transform = '';
          shade.style.opacity = '';
          layers.forEach(({ node }) => (node.style.transform = ''));
          last = { top: last.top, enter: -1, exit: -1, live: false };
        };
      }
      const stickTop = Math.min(0, Math.round(vh - height));
      const enter = Math.round(clamp((vh - top) / (vh * 0.85)) * 1000) / 1000;
      const exit = stacks ? Math.round(clamp((vh - (top + height + holdHeight)) / vh) * 1000) / 1000 : 0;
      if (last.live && stickTop === last.top && enter === last.enter && exit === last.exit) return;
      return () => {
        if (stacks && stickTop !== last.top) el.style.top = `${stickTop}px`;
        if (!last.live) inner.style.willChange = 'transform';
        if (enter !== last.enter || exit !== last.exit) {
          inner.style.transform =
            enter === 1 && exit === 0 ? '' : `translate3d(0,${((1 - enter) * 9).toFixed(2)}vh,0) scale(${(1 - exit * 0.06).toFixed(4)})`;
          shade.style.opacity = exit ? (exit * 0.75).toFixed(3) : '';
          layers.forEach(({ node, depth }) => {
            node.style.transform = exit ? `translate3d(0,${(exit * depth).toFixed(1)}px,0)` : '';
          });
        }
        last = { top: stickTop, enter, exit, live: true };
      };
    });

    return () => {
      io.disconnect();
      ro.disconnect();
      fitObserver.disconnect();
      window.removeEventListener('resize', fit);
      off();
    };
  }, [stack, full]);

  return (
    <>
      <span ref={anchorRef} id={id} data-scene-anchor={label ? '' : undefined} data-label={label} className="scene-anchor" aria-hidden="true" />
      <Tag ref={ref as never} className={`scene scene-${tone} ${full ? 'scene-full' : ''} ${className}`} style={style} {...aria}>
        <div ref={innerRef} className={`scene-inner ${full ? 'flex min-h-[inherit] flex-col justify-center' : ''} ${innerClassName}`}>
          {children}
        </div>
        <div ref={shadeRef} className="scene-shade" aria-hidden="true" />
      </Tag>
      <div ref={holdRef} className="scene-hold" aria-hidden="true" />
    </>
  );
};

export default Scene;
