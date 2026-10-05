import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '../components/Icons';
import { Img, imageSize, ogImageFor } from '../components/Img';
import { RevealText } from '../components/Motion';
import Scene from '../components/Scene';
import { CtaBand, DisciplineChips, PageHero, ProjectCard, SectionHeader, delay } from '../components/ui';
import { getDiscipline } from '../data/disciplines';
import { getProject, projects, sectorName } from '../data/projects';
import { getSectorPage } from '../data/sectorPages';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { SITE, absoluteUrl } from '../lib/site';
import NotFound from './NotFound';

const listFormat = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** Photographs narrower than this are shown framed rather than stretched full-bleed. */
const FULL_BLEED_MIN_WIDTH = 1200;

const ProjectDetail = () => {
  const { slug } = useParams();
  const p = getProject(slug);
  if (!p) return <NotFound />;

  const path = `/projects/${p.slug}`;
  const scope = p.disciplines.map((s) => getDiscipline(s)!);
  const scopeLabel =
    scope.length > 2 ? 'Multi-Discipline Engineering' : scope.map((d) => (d.slug === 'information-technology' ? 'IT' : d.label)).join(' & ');
  const title = `${p.name} | ${scopeLabel} | IHD Philippines`;
  const scopeSentence = `${listFormat(scope.map((d) => d.label.toLowerCase()))} consultancy by IHD Philippines for ${p.name}, ${p.location}.`;
  const lead = scopeSentence.charAt(0).toUpperCase() + scopeSentence.slice(1);
  const description = lead.length + p.summary.length < 160 ? `${lead} ${p.summary}` : lead;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/projects' },
    { name: p.name, path }
  ];

  const index = projects.indexOf(p);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const similar = projects
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({
      x,
      score:
        (x.sector === p.sector ? 2 : 0) +
        x.disciplines.filter((d) => p.disciplines.includes(d)).length +
        (x.region === p.region ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ x }) => x);

  const sameRegion = projects.filter((x) => x.region === p.region && x.slug !== p.slug);
  const sectorFocus = getSectorPage(p.sector);
  const size = imageSize(p.image);
  const fullBleed = (size?.width ?? 0) >= FULL_BLEED_MIN_WIDTH;

  const facts = [
    { k: 'Project type', v: p.types.join(', ') },
    { k: 'Location', v: `${p.location}, Philippines` },
    {
      k: 'Sector',
      v: (
        <Link to={`/sectors/${p.sector}`} className="underline decoration-white/20 underline-offset-4 hover:text-signal">
          {sectorName(p.sector)}
        </Link>
      )
    },
    { k: 'Disciplines', v: <DisciplineChips slugs={p.disciplines} linked /> }
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        type="article"
        image={ogImageFor(p.image)}
        imageAlt={p.imageAlt}
        jsonLd={graph(
          webPage('WebPage', path, title, description, {
            primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(ogImageFor(p.image) ?? SITE.defaultOgImage), caption: p.imageAlt }
          }),
          breadcrumbs(trail)
        )}
      />

      <PageHero
        eyebrow={`Project No. ${p.projectNumber} · ${p.types[0]}`}
        trail={trail}
        title={p.name}
        lead={p.summary}
        image={fullBleed ? { src: p.image, alt: p.imageAlt } : undefined}
        aside={
          fullBleed ? undefined : (
            <div className="mx-auto overflow-hidden rounded-lg border border-white/10 bg-surface-raised" style={{ maxWidth: Math.max((size?.width ?? 600) * 1.2, 360) }}>
              <div className="rv-zoom">
                <Img src={p.image} alt={p.imageAlt} priority sizes="(min-width: 1024px) 40vw, 100vw" className="max-h-[60svh] w-full object-cover" />
              </div>
            </div>
          )
        }
      >
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
          {facts.map((row) => (
            <div key={row.k} className="bg-canvas/80 p-5 backdrop-blur-sm md:p-6">
              <dt className="label mb-2">{row.k}</dt>
              <dd className="text-sm text-ink">{row.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Photography — full colour, undimmed */}
      {(fullBleed || p.gallery) && (
        <Scene tone="deep" aria-label="Project photography">
          <div className="container-site scene-pad">
            <div className={`grid items-end gap-6 ${p.gallery ? 'lg:grid-cols-12' : ''}`}>
              {fullBleed && (
                <figure className={p.gallery ? 'lg:col-span-8' : ''}>
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-surface-raised" data-rv="img" style={delay(100)}>
                    <div className="rv-zoom">
                      <Img src={p.image} alt={p.imageAlt} sizes="(min-width: 1280px) 1216px, 100vw" className="max-h-[72svh] w-full object-cover" />
                    </div>
                  </div>
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted" data-rv style={delay(400)}>
                    {p.name} · {p.location}
                  </figcaption>
                </figure>
              )}
              {p.gallery?.map((g) => (
                <figure key={g.image} className={fullBleed ? 'lg:col-span-4' : 'mx-auto max-w-xl lg:col-span-12'}>
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-surface-raised" data-rv="img" style={delay(300)}>
                    <div className="rv-zoom">
                      <Img src={g.image} alt={g.alt} sizes="(min-width: 1024px) 33vw, 100vw" className="w-full object-cover" />
                    </div>
                  </div>
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted" data-rv style={delay(500)}>
                    {p.name} · additional view
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Scene>
      )}

      {/* Overview and scope */}
      <Scene tone="alt" as="div">
        <div className="container-site grid gap-14 scene-pad lg:grid-cols-12 lg:gap-16">
          <section className="lg:col-span-5" aria-labelledby="overview-heading">
            <p className="eyebrow mb-5" data-rv>
              Project Overview
            </p>
            <h2 id="overview-heading" className="display-xl">
              <RevealText text="About the project" delay={80} />
            </h2>
            <div className="mt-8 space-y-6">
              <p className="prose-body" data-rv style={delay(300)}>
                {p.summary}
              </p>
              <p className="prose-body" data-rv style={delay(400)}>
                IHD Philippines’ engagement on {p.name} covered {listFormat(scope.map((d) => d.name))}
                {scope.length > 1 ? ' — coordinated within one consultancy.' : '.'}
              </p>
            </div>

            {sameRegion.length > 0 && (
              <div className="mt-10 border-t border-white/10 pt-6" data-rv style={delay(500)}>
                <h3 className="label mb-4 text-ink-secondary">More projects in {p.region}</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {sameRegion.map((x) => (
                    <li key={x.slug}>
                      <Link to={`/projects/${x.slug}`} className="text-ink-secondary transition-colors hover:text-ink">
                        {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="lg:col-span-7" aria-labelledby="scope-heading">
            <p className="eyebrow mb-5" data-rv>
              Engineering Scope
            </p>
            <h2 id="scope-heading" className="font-display text-2xl font-light text-ink md:text-3xl" data-rv style={delay(150)}>
              Disciplines engaged
            </h2>
            <p className="prose-body mt-4" data-rv style={delay(250)}>
              What each discipline typically covers in {sectorName(p.sector).toLowerCase()} projects like this one:
            </p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {scope.map((d, i) => (
                <li key={d.slug} className="py-[clamp(1rem,2.6vh,1.75rem)]" data-rv style={delay(350 + i * 90)}>
                  <h3 className="flex items-baseline gap-3 font-display text-lg font-light text-ink">
                    <span className="font-mono text-[11px] text-ink-muted">{d.index}</span>
                    {d.name}
                  </h3>
                  <p className="mt-2 pl-8 text-sm font-light leading-[1.75] text-ink-secondary">
                    {sectorFocus?.focus.find((f) => f.discipline === d.slug)?.detail ?? d.summary}
                  </p>
                  <Link to={`/disciplines/${d.slug}`} className="link-arrow mt-4 pl-8">
                    {d.anchor} <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Scene>

      {/* Related projects and project-to-project navigation */}
      <Scene aria-labelledby="similar-heading">
        <div className="container-site scene-pad-t pb-12">
          <SectionHeader
            id="similar-heading"
            eyebrow="Related Projects"
            title={`Similar ${sectorName(p.sector).toLowerCase()} projects`}
            action={
              <Link to={`/sectors/${p.sector}`} className="link-arrow">
                {sectorName(p.sector)} projects <ArrowRight />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x, i) => (
              <div key={x.slug} className="h-full" data-rv style={delay(200 + i * 100)}>
                <ProjectCard project={x} aspect="aspect-[16/9]" />
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Project navigation" className="mt-auto border-t border-white/10">
          <div className="container-site grid grid-cols-2 divide-x divide-white/10">
            <Link to={`/projects/${prev.slug}`} className="group py-9 pr-4 transition-colors hover:bg-white/[0.02]">
              <span className="label flex items-center gap-2">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" /> Previous project
              </span>
              <span className="mt-2 block font-display text-base text-ink-secondary transition-colors group-hover:text-ink md:text-xl">{prev.name}</span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group py-9 pl-4 text-right transition-colors hover:bg-white/[0.02] md:pl-8">
              <span className="label flex items-center justify-end gap-2">
                Next project <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block font-display text-base text-ink-secondary transition-colors group-hover:text-ink md:text-xl">{next.name}</span>
            </Link>
          </div>
        </nav>
      </Scene>

      <CtaBand
        title={`Planning a similar ${p.types[0].toLowerCase()} project?`}
        lead="Tell us about the facility, location and stage. The relevant discipline lead will review your brief and respond within one business day."
      />
    </>
  );
};

export default ProjectDetail;
