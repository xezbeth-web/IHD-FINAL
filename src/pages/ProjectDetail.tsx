import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '../components/Icons';
import { Img, imageSize, ogImageFor } from '../components/Img';
import Reveal from '../components/Reveal';
import { Breadcrumbs, CtaBand, DisciplineChips, ProjectCard } from '../components/ui';
import { getDiscipline } from '../data/disciplines';
import { getProject, projects, sectorName } from '../data/projects';
import { getSectorPage } from '../data/sectorPages';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { SITE, absoluteUrl } from '../lib/site';
import NotFound from './NotFound';

const listFormat = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

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

      <section className="border-b border-white/10 pb-12 pt-14 md:pt-20">
        <div className="container-site">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow mb-5 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            Project No. {p.projectNumber} · {p.types[0]}
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-[3.5rem]">
            {p.name}
          </h1>
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-ink-secondary md:text-lg">{p.summary}</p>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-4">
            {[
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
            ].map((row) => (
              <div key={row.k} className="bg-canvas p-5">
                <dt className="label mb-2">{row.k}</dt>
                <dd className="text-sm text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Project photography" className="border-b border-white/10 py-10 md:py-12">
        <div className="container-site">
          <figure className="mx-auto" style={{ maxWidth: Math.max((imageSize(p.image)?.width ?? 1600) * 1.25, 720) }}>
            <div className="overflow-hidden rounded-sm border border-white/10 bg-surface-raised">
              <Img src={p.image} alt={p.imageAlt} priority sizes="(min-width: 1280px) 1216px, 100vw" className="max-h-[680px] w-full object-cover" />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{p.name} · {p.location}</figcaption>
          </figure>
          {p.gallery?.map((g) => (
            <figure key={g.image} className="mt-8 md:w-1/2">
              <div className="overflow-hidden rounded-sm border border-white/10 bg-surface-raised">
                <Img src={g.image} alt={g.alt} sizes="(min-width: 768px) 50vw, 100vw" className="w-full object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{p.name} · additional view</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="container-site grid gap-14 py-20 md:py-24 lg:grid-cols-12">
        <section className="lg:col-span-5" aria-labelledby="overview-heading">
          <p className="eyebrow mb-3">Project Overview</p>
          <h2 id="overview-heading" className="heading-section">
            About the project
          </h2>
          <div className="mt-6 space-y-5">
            <p className="prose-body">{p.summary}</p>
            <p className="prose-body">
              IHD Philippines’ engagement on {p.name} covered {listFormat(scope.map((d) => d.name))}
              {scope.length > 1 ? ' — coordinated within one consultancy.' : '.'}
            </p>
          </div>
        </section>

        <section className="lg:col-span-7" aria-labelledby="scope-heading">
          <p className="eyebrow mb-3">Engineering Scope</p>
          <h2 id="scope-heading" className="heading-section">
            Disciplines engaged
          </h2>
          <p className="prose-body mt-4">
            What each discipline typically covers in {sectorName(p.sector).toLowerCase()} projects like this one:
          </p>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {scope.map((d) => (
              <li key={d.slug} className="py-6">
                <h3 className="flex items-baseline gap-3 text-base font-medium text-ink">
                  <span className="font-mono text-[11px] text-ink-muted">{d.index}</span>
                  {d.name}
                </h3>
                <p className="mt-2 pl-8 text-sm font-light leading-relaxed text-ink-secondary">
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

      <section className="border-t border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="similar-heading">
        <div className="container-site">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">Related Projects</p>
              <h2 id="similar-heading" className="heading-section">
                Similar {sectorName(p.sector).toLowerCase()} projects
              </h2>
            </div>
            <Link to={`/sectors/${p.sector}`} className="link-arrow">
              {sectorName(p.sector)} projects <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x, i) => (
              <Reveal key={x.slug} delay={i * 60} className="h-full">
                <ProjectCard project={x} />
              </Reveal>
            ))}
          </div>

          {sameRegion.length > 0 && (
            <div className="mt-14 border-t border-white/10 pt-8">
              <h2 className="label mb-4 text-ink-secondary">More projects in {p.region}</h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
        </div>
      </section>

      <nav aria-label="Project navigation" className="border-t border-white/10">
        <div className="container-site grid grid-cols-2 divide-x divide-white/10">
          <Link to={`/projects/${prev.slug}`} className="group py-8 pr-4 transition-colors hover:bg-white/[0.02]">
            <span className="label flex items-center gap-2">
              <ArrowLeft /> Previous project
            </span>
            <span className="mt-2 block font-display text-base text-ink-secondary group-hover:text-ink md:text-lg">{prev.name}</span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group py-8 pl-4 text-right transition-colors hover:bg-white/[0.02] md:pl-8">
            <span className="label flex items-center justify-end gap-2">
              Next project <ArrowRight />
            </span>
            <span className="mt-2 block font-display text-base text-ink-secondary group-hover:text-ink md:text-lg">{next.name}</span>
          </Link>
        </div>
      </nav>

      <CtaBand
        title={`Planning a similar ${p.types[0].toLowerCase()} project?`}
        lead="Tell us about the facility, location and stage. The relevant discipline lead will review your brief and respond within one business day."
      />
    </>
  );
};

export default ProjectDetail;
