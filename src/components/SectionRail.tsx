import { useEffect, useState, type MouseEvent } from 'react';
import { onScrollFrame, scrollToOffset } from '../lib/scroll';

interface Entry {
  id: string;
  label: string;
}

/**
 * Fixed index of the page's labelled scenes (`<Scene label>`) showing which one is on screen.
 * Built from the DOM after mount, so it never affects the prerendered markup.
 */
const SectionRail = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const anchors = [...document.querySelectorAll<HTMLElement>('main [data-scene-anchor][id]')];
    setEntries(anchors.map((a) => ({ id: a.id, label: a.dataset.label ?? a.id })));
    let current = -1;
    return onScrollFrame((vh) => {
      let idx = 0;
      anchors.forEach((a, i) => {
        if (a.getBoundingClientRect().top <= vh * 0.45) idx = i;
      });
      if (idx === current) return;
      return () => {
        current = idx;
        setActive(idx);
      };
    });
  }, []);

  if (entries.length < 2) return null;

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    scrollToOffset(target.getBoundingClientRect().top + window.scrollY);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav aria-label="Sections on this page" className="section-rail fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol>
        {entries.map((entry, i) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} onClick={(e) => jump(e, entry.id)} aria-current={i === active ? 'location' : undefined}>
              <span>
                {String(i + 1).padStart(2, '0')} {entry.label}
              </span>
              <i aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SectionRail;
