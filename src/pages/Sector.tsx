import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, imageSize, ogImageFor } from '../components/Img';
import { RevealText } from '../components/Motion';
import Reveal from '../components/Reveal';
import Scene from '../components/Scene';
import { CtaBand, PageHero, ProjectCard, SectionHeader, delay } from '../components/ui';
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
  const fullBleed = (imageSize(cover.image)?.width ?? 0) >= 1200;
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
        image={fullBleed ? { src: cover.image, alt: cover.imageAlt } : undefined}
        aside={
          fullBleed ? undefined : (
          <Link to={`/projects/${cover.slug}`} className="group relative block overflow-hidden rounded-lg border border-white/10">
            <div className="rv-zoom aspect-[4/3] bg-surface-raised">
              <Img src={cover.image} alt={cover.imageAlt} priority sizes="(min-width: 1024px) 40vw, 100vw" className="img-treatment h-full w-full object-cover" />
            </div>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
              {cover.name}
            </span>
          </Link>
          )
        }
      >
        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Projects</dt>
            <dd className="order-1 font-display text-4xl font-light text-ink">{String(items.length).padStart(2, '0')}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Regions</dt>
            <dd className="order-1 font-display text-4xl font-light text-ink">{String(regionsHere.length).padStart(2, '0')}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-2 label">Disciplines</dt>
            <dd className="order-1 font-display text-4xl font-light text-ink">{String(s.focus.length).padStart(2, '0')}</dd>
          </div>
        </dl>
      </PageHero>

      <Scene tone="alt" aria-labelledby="context-heading">
        <div className="container-site grid gap-12 scene-pad lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" data-rv>
              Sector Context
            </p>
            <h2 id="context-heading" className="display-xl">
              <RevealText text="What these buildings demand" delay={80} />
            </h2>
          </div>
          <div className="space-y-7 lg:col-span-6 lg:col-start-7 lg:pt-14">
            {s.intro.slice(1).map((para, i) => (
              <p key={para.slice(0, 24)} className="prose-body" data-rv style={delay(300 + i * 100)}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </Scene>

      <Scene aria-labelledby="focus-heading">
        <div className="container-site scene-pad">
          <SectionHeader id="focus-heading" eyebrow="Disciplines" title={`Engineering for ${name.toLowerCase()}`} />
          <div className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 ${s.focus.length % 2 === 0 ? "" : "lg:grid-cols-3"}`}>
            {s.focus.map((f, i) => {
              const d = getDiscipline(f.discipline)!;
              const n = items.filter((p) => p.disciplines.includes(f.discipline)).length;
              return (
                <Link key={f.discipline} to={`/disciplines/${d.slug}`} className="group flex flex-col justify-between gap-6 bg-canvas p-7 transition-colors duration-500 hover:bg-surface-raised md:p-8 md:[&:last-child:nth-child(odd)]:col-span-2 lg:[&:nth-child(3):last-child]:col-span-1" data-rv style={delay(200 + i * 90)}>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      {d.index} / {d.label}
                      {n > 0 && <span className="text-signal"> · {n} projects</span>}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-light text-ink md:text-2xl">{d.name}</h3>
                    <p className="mt-2 text-sm font-light leading-[1.75] text-ink-secondary">{f.detail}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                    {d.anchor} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Scene>

      <Scene tone="alt" aria-labelledby="sector-projects-heading" full={false}>
        <div className="container-site scene-pad">
          <SectionHeader
            id="sector-projects-heading"
            eyebrow="Projects"
            title={`${name} in our portfolio`}
            lead={`${items.length} projects across ${regionsHere.join(', ')}.`}
          />
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 3) * 60} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>

          <nav aria-labelledby="other-sectors-heading" className="mt-20 border-t border-white/10 pt-10">
          <h2 id="other-sectors-heading" className="label mb-6 text-ink-secondary">
            Other sectors
          </h2>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {sectors
              .filter((x) => x.slug !== s.slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link to={`/sectors/${x.slug}`} className="group block h-full bg-canvas-alt p-7 transition-colors duration-500 hover:bg-surface-raised md:p-8">
                    <span className="flex items-center justify-between text-base font-medium text-ink">{x.name} <ArrowRight className="h-3.5 w-3.5 text-ink-muted transition-all duration-500 group-hover:translate-x-1 group-hover:text-signal" /></span>
                    <span className="mt-1 block text-[13px] font-light text-ink-secondary">{x.description}</span>
                  </Link>
                </li>
              ))}
          </ul>
          </nav>
        </div>
      </Scene>

      <CtaBand title="Planning a similar project?" />
    </>
  );
};

export default Sector;
