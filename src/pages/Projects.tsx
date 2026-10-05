import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { ogImageFor } from '../components/Img';
import { CtaBand, PageHero, ProjectCard } from '../components/ui';
import { disciplines, getDiscipline } from '../data/disciplines';
import { projects, regions, sectors } from '../data/projects';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { absoluteUrl } from '../lib/site';

const TITLE = 'Engineering Projects & Case Studies | IHD Philippines Portfolio';
const DESCRIPTION = `${projects.length} acoustics, audiovisual, IT and security projects across the Philippines — hotels and resorts, theaters, events halls, churches, schools and towers.`;
const PATH = '/projects';

const filterButton = (active: boolean) =>
  `rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
    active ? 'border-signal/60 bg-signal-strong/10 text-ink' : 'border-white/10 text-ink-secondary hover:border-white/30 hover:text-ink'
  }`;

const Projects = () => {
  const [params, setParams] = useSearchParams();
  // Filters are applied after hydration so the prerendered markup always matches the unfiltered list.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const discipline = hydrated ? params.get('discipline') ?? 'all' : 'all';
  const sector = hydrated ? params.get('sector') ?? 'all' : 'all';

  const setFilter = (key: 'discipline' | 'sector', value: string) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const results = useMemo(
    () =>
      projects.filter(
        (p) =>
          (discipline === 'all' || p.disciplines.includes(discipline as never)) && (sector === 'all' || p.sector === sector)
      ),
    [discipline, sector]
  );

  const disciplinesWithProjects = disciplines.filter((d) => projects.some((p) => p.disciplines.includes(d.slug)));
  const activeDiscipline = getDiscipline(discipline);
  const activeSector = sectors.find((s) => s.slug === sector);

  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        image={ogImageFor('projects/rockwellperformingarts')}
        jsonLd={graph(
          webPage('CollectionPage', PATH, TITLE, DESCRIPTION, {
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: projects.length,
              itemListElement: projects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: absoluteUrl(`/projects/${p.slug}`),
                name: p.name
              }))
            }
          }),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: PATH }
          ])
        )}
      />

      <PageHero
        eyebrow="Project Portfolio"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: PATH }
        ]}
        title="Engineering projects across the Philippines"
        lead={`${projects.length} projects in hospitality, performance, worship, education and commercial real estate — from Metro Manila hotels and theaters to resorts in Cebu, Boracay and Palawan. Filter by discipline or sector, or open any project for its scope.`}
      />

      <section className="py-14 md:py-16" aria-labelledby="results-heading">
        <div className="container-site">
          <div className="mb-10 space-y-5 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <p className="label w-24 shrink-0">Discipline</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
                <button type="button" className={filterButton(discipline === 'all')} aria-pressed={discipline === 'all'} onClick={() => setFilter('discipline', 'all')}>
                  All
                </button>
                {disciplinesWithProjects.map((d) => (
                  <button
                    key={d.slug}
                    type="button"
                    className={filterButton(discipline === d.slug)}
                    aria-pressed={discipline === d.slug}
                    onClick={() => setFilter('discipline', d.slug)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <p className="label w-24 shrink-0">Sector</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
                <button type="button" className={filterButton(sector === 'all')} aria-pressed={sector === 'all'} onClick={() => setFilter('sector', 'all')}>
                  All
                </button>
                {sectors.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    className={filterButton(sector === s.slug)}
                    aria-pressed={sector === s.slug}
                    onClick={() => setFilter('sector', s.slug)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="results-heading" className="font-display text-xl font-light text-ink">
              {results.length === projects.length ? 'All projects' : `${results.length} of ${projects.length} projects`}
            </h2>
            <div className="flex flex-wrap gap-6">
              {activeSector && (
                <Link to={`/sectors/${activeSector.slug}`} className="link-arrow">
                  {activeSector.name} overview <ArrowRight />
                </Link>
              )}
              {activeDiscipline && (
                <Link to={`/disciplines/${activeDiscipline.slug}`} className="link-arrow">
                  {activeDiscipline.anchor} <ArrowRight />
                </Link>
              )}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {results.length} projects
          </p>

          {results.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="prose-body border border-white/10 p-8">
              No projects match this combination.{' '}
              <button type="button" className="text-ink underline underline-offset-4" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                Clear filters
              </button>
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-canvas-alt py-20" aria-labelledby="locations-heading">
        <div className="container-site">
          <p className="eyebrow mb-3">Locations</p>
          <h2 id="locations-heading" className="heading-section mb-10">
            Projects by region
          </h2>
          <div className="gap-x-10 md:columns-2 lg:columns-3">
            {regions.map((region) => {
              const items = projects.filter((p) => p.region === region);
              return (
                <div key={region} className="mb-10 break-inside-avoid border-t border-white/10 pt-5">
                  <h3 className="flex items-baseline justify-between text-base font-medium text-ink">
                    {region}
                    <span className="font-mono text-[11px] text-ink-muted">{String(items.length).padStart(2, '0')}</span>
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/projects/${p.slug}`} className="text-ink-secondary transition-colors hover:text-ink">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Projects;
