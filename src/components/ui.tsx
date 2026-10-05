import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getDiscipline } from '../data/disciplines';
import type { Project } from '../data/projects';
import { ArrowRight, ArrowUpRight } from './Icons';
import { Img } from './Img';
import { RevealText } from './Motion';
import Reveal from './Reveal';
import Scene from './Scene';

export interface Crumb {
  name: string;
  path: string;
}

/** Reveal delay for `[data-rv]` children. */
export const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export const Breadcrumbs = ({ trail }: { trail: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-8">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <li key={crumb.path} className="flex items-center gap-2">
            {last ? (
              <span aria-current="page" className="text-ink-secondary">
                {crumb.name}
              </span>
            ) : (
              <>
                <Link to={crumb.path} className="transition-colors hover:text-ink">
                  {crumb.name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  trail?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  /** Full-bleed photograph behind the masthead (manifest key + alt text). */
  image?: { src: string; alt: string };
  /** Shorter masthead for pages whose first job is a task (e.g. the contact form). */
  compact?: boolean;
}

/**
 * Inner-page opening scene: breadcrumb, eyebrow, the page's single H1 (revealed word by word)
 * and a lead, optionally over a full-bleed project photograph that drifts as the page scrolls.
 */
export const PageHero = ({ eyebrow, title, lead, trail, children, aside, image, compact = false }: PageHeroProps) => (
  <Scene full={!compact} aria-labelledby="page-title" className="scene-intro overflow-hidden">
    {image ? (
      <div className="absolute inset-0" data-depth="120">
        <div className="absolute inset-0" data-rv="fade">
          <Img src={image.src} alt={image.alt} priority sizes="100vw" className="h-full w-full object-cover opacity-50 grayscale-[35%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/75 to-canvas/30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/85 via-canvas/30 to-transparent" aria-hidden="true" />
      </div>
    ) : (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[12vw] -top-[26vh] h-[75vh] w-[75vh] glow" />
        <div className="hero-grid absolute inset-0" />
      </div>
    )}

    <div className={`container-site relative flex flex-1 flex-col pt-32 ${compact ? 'pb-14 md:pb-16' : 'justify-end pb-[clamp(2rem,7vh,6rem)]'}`}>
      {trail && (
        <div data-rv="fade">
          <Breadcrumbs trail={trail} />
        </div>
      )}
      <div className={aside ? 'grid gap-12 lg:grid-cols-12 lg:items-end' : ''}>
        <div className={aside ? 'lg:col-span-7' : 'max-w-5xl'}>
          <p className="eyebrow mb-7 flex items-center gap-2.5" data-rv style={delay(60)}>
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className="font-display font-light text-ink [font-size:clamp(2.4rem,min(5vw,8.6vh),4.75rem)] [letter-spacing:-0.035em] [line-height:1.04]"
          >
            <RevealText text={title} delay={40} step={22} />
          </h1>
          {lead && (
            <p className="mt-8 max-w-2xl text-base font-light leading-[1.75] text-ink-body md:text-lg md:leading-[1.7]" data-rv style={delay(250)}>
              {lead}
            </p>
          )}
          {children && (
            <div data-rv style={delay(380)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="lg:col-span-5" data-rv="img" style={delay(350)}>
            {aside}
          </div>
        )}
      </div>
      {!compact && (
        <div className="mt-[clamp(1.5rem,5vh,3.5rem)] hidden items-center gap-4 [@media(min-width:768px)_and_(min-height:840px)]:flex" data-rv="fade" style={delay(900)} aria-hidden="true">
          <span className="scroll-cue" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Scroll</span>
        </div>
      )}
    </div>
  </Scene>
);

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  id?: string;
  action?: ReactNode;
}

/** Section title block. Plays its own reveal, so it works inside or outside a Scene. */
export const SectionHeader = ({ eyebrow, title, lead, id, action }: SectionHeaderProps) => (
  <Reveal className="section-header">
    <div className="mb-[clamp(2rem,6vh,4rem)] flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow mb-5" data-rv>
          {eyebrow}
        </p>
        <h2 id={id} className="display-xl">
          <RevealText text={title} delay={80} />
        </h2>
        {lead && (
          <p className="prose-body mt-6 max-w-2xl" data-rv style={delay(300)}>
            {lead}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0" data-rv style={delay(400)}>
          {action}
        </div>
      )}
    </div>
  </Reveal>
);

export const DisciplineChips = ({ slugs, linked = false }: { slugs: string[]; linked?: boolean }) => (
  <ul className="flex flex-wrap gap-1.5">
    {slugs.map((slug) => {
      const d = getDiscipline(slug);
      if (!d) return null;
      return (
        <li key={slug}>
          {linked ? (
            <Link to={`/disciplines/${slug}`} className="chip-signal transition-colors hover:border-signal/60">
              {d.label}
            </Link>
          ) : (
            <span className="chip">{d.label}</span>
          )}
        </li>
      );
    })}
  </ul>
);

interface ProjectCardProps {
  project: Project;
  sizes?: string;
  aspect?: string;
  headingLevel?: 'h2' | 'h3';
}

export const ProjectCard = ({
  project,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  aspect = 'aspect-[16/10]',
  headingLevel = 'h3'
}: ProjectCardProps) => {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-surface transition-colors duration-500 hover:border-white/25">
      <div className={`relative ${aspect} overflow-hidden bg-surface-raised`}>
        <Img
          src={project.image}
          alt={project.imageAlt}
          sizes={sizes}
          className="h-full w-full object-cover grayscale-[35%] transition duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {project.types[0]} · {project.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div>
          <p className="label mb-2">{project.location}</p>
          <Heading className="font-display text-lg font-normal text-ink">
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.name}
            </Link>
          </Heading>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <DisciplineChips slugs={project.disciplines} />
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink-secondary transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:text-signal"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

/** Closing scene on inner pages: one clear next step. */
export const CtaBand = ({
  title = 'Planning a venue, hotel or building that needs to perform?',
  lead = 'Share the project type, location and stage. Our discipline leads will review your brief and respond within one business day.'
}: {
  title?: string;
  lead?: string;
}) => (
  <Scene tone="deep" aria-labelledby="cta-heading" className="overflow-hidden">
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 glow" />
      <div className="story-grid" />
    </div>
    <div className="container-site relative flex flex-col items-center scene-pad text-center">
      <p className="eyebrow mb-7" data-rv>
        Engagement Desk
      </p>
      <h2
        id="cta-heading"
        className="max-w-4xl font-display font-light text-ink [font-size:clamp(2.2rem,4.8vw,4.5rem)] [letter-spacing:-0.03em] [line-height:1.06]"
      >
        <RevealText text={title} delay={80} step={40} />
      </h2>
      <p className="prose-body mt-8 max-w-xl" data-rv style={delay(450)}>
        {lead}
      </p>
      <div className="mt-11 flex flex-wrap justify-center gap-3" data-rv style={delay(600)}>
        <Link to="/contact" className="btn-primary">
          Request technical advisory
          <ArrowRight />
        </Link>
        <Link to="/projects" className="btn-ghost">
          View the portfolio
        </Link>
      </div>
    </div>
  </Scene>
);
