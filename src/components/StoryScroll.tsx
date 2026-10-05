import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { disciplines } from '../data/disciplines';
import { projectsByDiscipline } from '../data/projects';
import { clamp, onScrollFrame, scrollToOffset } from '../lib/scroll';
import { ArrowRight } from './Icons';
import { Img } from './Img';

const steps = disciplines;
const n = steps.length;

/**
 * Scroll-driven story: a tall track with a sticky, full-viewport stage. As the track scrolls
 * past, progress (0→1) selects which discipline is on stage; the outgoing one lifts away and
 * the incoming one rises in, with its photograph crossfading behind.
 *
 * All six states are in the HTML (one H3 each), so the content is fully crawlable. Without
 * JavaScript the track collapses and the states render as an ordinary list.
 */
const StoryScroll = ({ headingId }: { headingId: string }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLSpanElement | null>(null);
  const segRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Photographs mount one step ahead of the reader, so only the first two load up front.
  const [loaded, setLoaded] = useState(1);
  const [ready, setReady] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    setReady(true);
    let last = -1;
    return onScrollFrame((vh) => {
      const r = track.getBoundingClientRect();
      const total = r.height - vh;
      // Skip all work while the stage is well off screen.
      if (total <= 0 || r.top > vh * 1.5 || r.bottom < -vh * 0.5) return;
      const p = Math.round(clamp(-r.top / total) * 10000) / 10000;
      if (p === last) return;
      const idx = Math.min(n - 1, Math.floor(p * n));
      return () => {
        last = p;
        // Progress is written directly onto the indicators rather than as an inherited
        // custom property, which would restyle the whole stage every frame.
        if (railFillRef.current) railFillRef.current.style.transform = `scaleY(${p})`;
        segRefs.current.forEach((seg, i) => {
          if (seg) seg.style.transform = `scaleX(${clamp(p * n - i)})`;
        });
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
          setLoaded((l) => Math.max(l, idx + 1));
        }
      };
    });
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    scrollToOffset(top + ((i + 0.5) / n) * total);
  };

  return (
    <div ref={trackRef} className="story-track" style={{ '--steps': n } as CSSProperties}>
      <div className="story-stage">
        {/* Photography layer — dimmed to ~half brightness, so a 1280px source is plenty. */}
        <div className="story-media" aria-hidden="true">
          {steps.map((d, i) => (
            <div key={d.slug} className="story-bg" data-on={i === active || undefined}>
              {i <= loaded && <Img src={d.image} alt="" sizes="(min-width: 1024px) 66vw, 100vw" className="h-full w-full object-cover" />}
            </div>
          ))}
          <div className="story-shade" />
          <div className="story-grid" />
        </div>

        <div className="container-site relative flex h-full flex-col">
          {/* Fixed title bar */}
          <div className="story-head flex items-end justify-between gap-6 pt-28 md:pt-32">
            <div>
              <p className="eyebrow mb-3">Practice Scope</p>
              <h2 id={headingId} className="max-w-md font-display text-xl font-light leading-snug text-ink md:text-2xl">
                Six engineering disciplines, one coordinated design
              </h2>
            </div>
            <Link to="/disciplines" className="link-arrow hidden md:inline-flex">
              All disciplines <ArrowRight />
            </Link>
          </div>

          {/* Stage */}
          <div className="story-states relative flex-1 xl:px-64">
            {steps.map((d, i) => {
              const count = projectsByDiscipline(d.slug).length;
              const state = i === active ? 'active' : i < active ? 'before' : 'after';
              return (
                <article
                  key={d.slug}
                  className="story-state"
                  data-state={state}
                  aria-labelledby={`story-${d.slug}`}
                  {...(ready && i !== active ? { inert: '' } : {})}
                >
                  <p className="story-k font-mono text-[11px] uppercase tracking-eyebrow text-signal" style={{ '--k': 0 } as CSSProperties}>
                    {d.index} — {d.label}
                    {count > 0 && <span className="text-ink-secondary"> · {count} projects</span>}
                  </p>
                  <h3
                    id={`story-${d.slug}`}
                    className="story-k mt-5 max-w-4xl font-display text-[2.4rem] font-light leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl xl:text-[4.75rem]"
                    style={{ '--k': 1 } as CSSProperties}
                  >
                    {d.name}
                  </h3>
                  <p
                    className="story-k mt-6 max-w-2xl text-[15px] font-light leading-[1.75] text-ink-body md:text-lg md:leading-[1.7]"
                    style={{ '--k': 2 } as CSSProperties}
                  >
                    {d.summary}
                  </p>
                  <ul className="story-k mt-7 hidden flex-wrap justify-center gap-2 sm:flex" style={{ '--k': 3 } as CSSProperties}>
                    {d.capabilities.slice(0, 4).map((c) => (
                      <li key={c.title} className="chip border-white/15 bg-black/30 backdrop-blur-sm">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/disciplines/${d.slug}`} className="story-k link-arrow mt-8" style={{ '--k': 4 } as CSSProperties}>
                    {d.anchor} <ArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Progress: index rail on large screens, segments everywhere */}
          <nav aria-label="Disciplines in this section" className="story-rail">
            <span ref={railFillRef} className="story-rail-fill" aria-hidden="true" />
            <ol>
              {steps.map((d, i) => (
                <li key={d.slug}>
                  <button type="button" onClick={() => goTo(i)} data-on={i === active || undefined} aria-current={i === active ? 'step' : undefined}>
                    <span className="font-mono text-[10.5px] text-ink-muted">{d.index}</span>
                    <span>{d.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="story-foot flex items-center gap-6 pb-8 md:pb-10">
            <p className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-ink-secondary" aria-hidden="true">
              <span className="text-ink">{steps[active].index}</span> / {String(n).padStart(2, '0')}
            </p>
            <div className="flex flex-1 gap-1.5" aria-hidden="true">
              {steps.map((d, i) => (
                <span key={d.slug} className="story-seg">
                  <i ref={(node) => (segRefs.current[i] = node)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryScroll;
