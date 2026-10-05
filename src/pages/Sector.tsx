import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, ProjectCard, SectionHeader } from '../components/ui';
import { getDiscipline } from '../data/disciplines';
import { getProject, projects, sectorName, sectors } from '../data/projects';
import { getSectorPage } from '../data/sectorPages';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { absoluteUrl } from '../lib/site';
import NotFound from './NotFound';

const Sector = () => {
  const { slug } = useParams();
  const s = getSectorPage(slug);
  if (!s) return <NotFound />;

  const path = `/sectors/${s.slug}`;
  const name = sectorName(s.slug);
  const items = projects.filter((p) => p.sector === s.slug);
  const cover = getProject(s.cover)!;
  const regionsHere = [...new Set(items.map((p) => p.region))];
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/projects' },
    { name, path }
  ];

  return (
    <>
      <Seo
        title={s.seoTitle}
        description={s.metaDescription}
        path={path}
        image={ogImageFor(cover.image)}
        imageAlt={cover.imageAlt}
        jsonLd={graph(
          webPage('CollectionPage', path, s.seoTitle, s.metaDescription, {
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: items.length,
              itemListElement: items.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: absoluteUrl(`/projects/${p.slug}`),
                name: p.name
              }))
            }
          }),
          breadcrumbs(trail)
        )}
      />

      <PageHero
        eyebrow={s.eyebrow}
        trail={trail}
        title={s.h1}
        lead={s.intro[0]}
        aside={
          <Link to={`/projects/${cover.slug}`} className="group relative block overflow-hidden rounded-sm border border-white/10">
            <div className="aspect-[4/3] bg-surface-raised">
              <Img src={cover.image} alt={cover.imageAlt} priority sizes="(min-width: 1024px) 40vw, 100vw" className="img-treatment h-full w-full object-cover" />
            </div>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
              {cover.name}
            </span>
          </Link>
        }
      >
        <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Projects</dt>
            <dd className="order-1 font-mono text-2xl font-light text-ink">{String(items.length).padStart(2, '0')}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Regions</dt>
            <dd className="order-1 font-mono text-2xl font-light text-ink">{String(regionsHere.length).padStart(2, '0')}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Disciplines</dt>
            <dd className="order-1 font-mono text-2xl font-light text-ink">{String(s.focus.length).padStart(2, '0')}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="context-heading">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Sector Context</p>
            <h2 id="context-heading" className="heading-section">
              What these buildings demand
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {s.intro.slice(1).map((para) => (
              <p key={para.slice(0, 24)} className="prose-body">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="focus-heading">
        <div className="container-site">
          <SectionHeader id="focus-heading" eyebrow="Disciplines" title={`Engineering for ${name.toLowerCase()}`} />
          <div className={`grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 ${s.focus.length % 2 === 0 ? "" : "lg:grid-cols-3"}`}>
            {s.focus.map((f) => {
              const d = getDiscipline(f.discipline)!;
              const n = items.filter((p) => p.disciplines.includes(f.discipline)).length;
              return (
                <Link key={f.discipline} to={`/disciplines/${d.slug}`} className="group flex flex-col justify-between gap-6 bg-canvas p-7 transition-colors hover:bg-surface-raised md:[&:last-child:nth-child(odd)]:col-span-2 lg:[&:nth-child(3):last-child]:col-span-1">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      {d.index} / {d.label}
                      {n > 0 && <span className="text-signal"> · {n} projects</span>}
                    </p>
                    <h3 className="mt-3 text-lg font-medium text-ink">{d.name}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-ink-secondary">{f.detail}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                    {d.anchor} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" aria-labelledby="sector-projects-heading">
        <div className="container-site">
          <SectionHeader
            id="sector-projects-heading"
            eyebrow="Projects"
            title={`${name} in our portfolio`}
            lead={`${items.length} projects across ${regionsHere.join(', ')}.`}
          />
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 3) * 60} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav aria-labelledby="other-sectors-heading" className="border-t border-white/10 py-16">
        <div className="container-site">
          <h2 id="other-sectors-heading" className="label mb-6 text-ink-secondary">
            Other sectors
          </h2>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-3">
            {sectors
              .filter((x) => x.slug !== s.slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link to={`/sectors/${x.slug}`} className="block h-full bg-canvas p-6 transition-colors hover:bg-surface-raised">
                    <span className="block text-base font-medium text-ink">{x.name}</span>
                    <span className="mt-1 block text-[13px] font-light text-ink-secondary">{x.description}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <CtaBand title="Planning a similar project?" />
    </>
  );
};

export default Sector;
