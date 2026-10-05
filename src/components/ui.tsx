import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getDiscipline } from '../data/disciplines';
import type { Project } from '../data/projects';
import { ArrowRight, ArrowUpRight } from './Icons';
import { Img } from './Img';
import Reveal from './Reveal';

export interface Crumb {
  name: string;
  path: string;
}

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
  title: ReactNode;
  lead?: ReactNode;
  trail?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}

/** Inner-page masthead: breadcrumb, eyebrow, the page's single H1 and a lead paragraph. */
export const PageHero = ({ eyebrow, title, lead, trail, children, aside }: PageHeroProps) => (
  <section className="border-b border-white/10 pb-16 pt-14 md:pb-20 md:pt-20">
    <div className="container-site">
      {trail && <Breadcrumbs trail={trail} />}
      <div className={aside ? 'grid gap-12 lg:grid-cols-12 lg:items-end' : ''}>
        <div className={aside ? 'lg:col-span-7' : 'max-w-4xl'}>
          <p className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {lead && <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-ink-secondary md:text-lg">{lead}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </div>
  </section>
);

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  action?: ReactNode;
}

export const SectionHeader = ({ eyebrow, title, lead, id, action }: SectionHeaderProps) => (
  <Reveal>
    <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={id} className="heading-section">
          {title}
        </h2>
        {lead && <p className="prose-body mt-4 max-w-2xl">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-surface transition-colors hover:border-white/20">
      <div className={`relative ${aspect} overflow-hidden bg-surface-raised`}>
        <Img src={project.image} alt={project.imageAlt} sizes={sizes} className="img-treatment h-full w-full object-cover" />
        <span className="absolute left-3 top-3 bg-black/70 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {project.types[0]} · {project.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        <div>
          <p className="label mb-1.5">{project.location}</p>
          <Heading className="font-display text-lg font-normal text-ink">
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.name}
            </Link>
          </Heading>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <DisciplineChips slugs={project.disciplines} />
          <span className="shrink-0 text-ink-secondary transition-colors group-hover:text-signal" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export const CtaBand = ({
  title = 'Planning a venue, hotel or building that needs to perform?',
  lead = 'Share the project type, location and stage. Our discipline leads will review your brief and respond within one business day.'
}: {
  title?: string;
  lead?: string;
}) => (
  <section className="border-t border-white/10 bg-canvas-alt py-20 md:py-24">
    <div className="container-site">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">Engagement Desk</p>
            <h2 className="heading-section">{title}</h2>
            <p className="prose-body mt-4 max-w-2xl">{lead}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link to="/contact" className="btn-primary">
              Request technical advisory
              <ArrowRight />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
