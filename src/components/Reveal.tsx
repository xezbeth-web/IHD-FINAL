import { PropsWithChildren, useEffect, useRef } from 'react';
import { whenBooted } from '../lib/scroll';

interface RevealProps extends PropsWithChildren {
  delay?: number;
  className?: string;
}

/** Rises and un-blurs its content the first time it scrolls into view (see `.reveal` in index.css). */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          whenBooted(() => element.classList.add('visible'));
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
};

export default Reveal;
