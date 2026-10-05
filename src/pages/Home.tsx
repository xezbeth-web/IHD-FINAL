import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { Img } from '../components/Img';
import InquiryForm from '../components/InquiryForm';
import Reveal from '../components/Reveal';
import { ProjectCard, SectionHeader } from '../components/ui';
import { disciplines } from '../data/disciplines';
import { lifecycle } from '../data/practice';
import { getProject, projects, regions, sectors } from '../data/projects';
import { developers, leadership, team } from '../data/team';
import { graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { SITE } from '../lib/site';

const TITLE = 'IHD Philippines | Acoustics, AV & Building Technology Consultancy';
const DESCRIPTION =
  'Philippine technology consultancy for architectural acoustics, AV design, security, IT and ELV, IoT and GRMS — for hotels, venues and commercial buildings.';

const heroMosaic = [
  getProject('rockwell-performing-arts-theater')!,
  getProject('the-fifth-at-rockwell')!,
  getProject('grand-hyatt-manila-rooftop')!
];
const featured = [
  getProject('metrobank-center-grand-hyatt')!,
  getProject('crimson-mactan')!,
  getProject('shangri-la-plaza-chapel')!
];
const sectorCovers: Record<string, string> = {
  hospitality: 'hotel-okura-manila',
  worship: 'full-gospel-church-makati',
  'culture-education': 'pasig-catholic-school-auditorium',
  'commercial-residential': 'philam-life-building'
};

const metrics = [
  { value: String(projects.length), label: 'Portfolio projects', note: 'Hotels, venues, churches and towers' },
  { value: String(disciplines.length).padStart(2, '0'), label: 'Engineering disciplines', note: 'Coordinated under one practice' },
  { value: String(regions.length).padStart(2, '0'), label: 'Regions served', note: 'From Metro Manila to Cebu, Palawan and Davao' },
  { value: String(leadership.length + team.length), label: 'Engineers & consultants', note: 'Led by multi-disciplinary section heads' }
];

const Home = () => (
  <>
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      path="/"
      jsonLd={graph(webPage('WebPage', '/', TITLE, DESCRIPTION))}
    />

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-16 md:pb-24 md:pt-24">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pr-6">
            <p className="eyebrow-muted mb-6 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              Technology & Engineering Consultancy · Philippines
            </p>
            <h1 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Architectural acoustics, audiovisual and intelligent building systems — engineered as one.
            </h1>
            <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-ink-secondary md:text-lg">
              IHD Philippines is a technology consultancy for hotels, performance venues, worship spaces and commercial
              buildings. We design acoustics, AV, security, IT and ELV infrastructure, IoT and guest room systems — from
              discovery to commissioning.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-primary">
                View the project portfolio
                <ArrowUpRight />
              </Link>
              <Link to="/disciplines" className="btn-ghost">
                Engineering disciplines
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid h-full grid-cols-2 grid-rows-[1fr_auto] gap-3">
              {heroMosaic.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className={`group relative overflow-hidden rounded-sm border border-white/10 bg-surface-raised ${
                    i === 0 ? 'col-span-2 aspect-[16/9] lg:aspect-auto lg:min-h-[260px]' : 'aspect-[4/3]'
                  }`}
                >
                  <Img
                    src={p.image}
                    alt={p.imageAlt}
                    priority={i === 0}
                    sizes={i === 0 ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'}
                    className="img-treatment absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white">
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5">
              <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">{m.label}</dt>
              <dd className="order-1 font-mono text-3xl font-light text-ink md:text-4xl">{m.value}</dd>
              <dd className="order-3 text-[12px] text-ink-muted">{m.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Disciplines */}
    <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="disciplines-heading">
      <div className="container-site">
        <SectionHeader
          id="disciplines-heading"
          eyebrow="Practice Scope"
          title="Six engineering disciplines, one coordinated design"
          lead="Most building technology now shares the same network, ceiling space and operating team. We design these systems together so they are coordinated before construction — not reconciled after it."
          action={
            <Link to="/disciplines" className="link-arrow">
              All disciplines <ArrowRight />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <article key={d.slug} className="group relative flex flex-col justify-between gap-8 bg-canvas p-8 transition-colors hover:bg-surface-raised">
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  {d.index} / {d.label}
                </p>
                <h3 className="text-lg font-medium text-ink">
                  <Link to={`/disciplines/${d.slug}`} className="after:absolute after:inset-0">
                    {d.name}
                  </Link>
                </h3>
                <p className="text-sm font-light leading-relaxed text-ink-secondary">{d.summary}</p>
              </div>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                {d.anchor}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Selected projects */}
    <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="projects-heading">
      <div className="container-site">
        <SectionHeader
          id="projects-heading"
          eyebrow="Project Index"
          title="Selected commissions"
          lead="A landmark tower in Bonifacio Global City, a Cebu beach resort engineered across four disciplines, and a chapel set within one of Ortigas’ busiest malls."
          action={
            <Link to="/projects" className="link-arrow">
              All {projects.length} projects <ArrowRight />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Sectors */}
    <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="sectors-heading">
      <div className="container-site">
        <SectionHeader
          id="sectors-heading"
          eyebrow="Sectors"
          title="Where our engineering is at work"
          lead="Our portfolio is concentrated in environments where sound, image, connectivity and security directly shape the experience of guests, congregations and audiences."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => {
            const items = projects.filter((p) => p.sector === s.slug);
            const cover = getProject(sectorCovers[s.slug]) ?? items[0];
            return (
              <Reveal key={s.slug} delay={i * 60}>
                <Link to={`/sectors/${s.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-surface-raised">
                    <Img src={cover.image} alt={cover.imageAlt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="img-treatment h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-45% to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
                        {String(items.length).padStart(2, '0')} projects
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-normal text-white">{s.name}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.description}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* Lifecycle */}
    <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="lifecycle-heading">
      <div className="container-site">
        <SectionHeader
          id="lifecycle-heading"
          eyebrow="Engagement Model"
          title="From discovery to commissioning"
          lead="Every engagement follows the same disciplined path, so design intent carries through construction, installation and handover."
          action={
            <Link to="/about#approach" className="link-arrow">
              Our approach <ArrowRight />
            </Link>
          }
        />
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {lifecycle.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 60}>
                <div className="space-y-3 border-l border-white/15 p-6">
                  <p className="font-mono text-xs text-signal">0{i + 1}</p>
                  <h3 className="text-base font-medium text-ink">{step.title}</h3>
                  <p className="text-[13px] font-light leading-relaxed text-ink-secondary">{step.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Developers */}
    <section className="border-b border-white/10 bg-canvas-alt py-20" aria-labelledby="developers-heading">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="eyebrow-muted mb-2">Developer Relationships</p>
            <h2 id="developers-heading" className="font-display text-xl font-normal text-ink">
              Property developers we have worked with
            </h2>
          </div>
        </Reveal>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-4">
          {developers.map((d) => (
            <li key={d.name} className="flex h-28 items-center justify-center bg-canvas px-8">
              <Img src={d.image} alt={`${d.name} logo`} sizes="200px" className="max-h-9 w-auto max-w-[160px] object-contain opacity-80" />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <Link to="/partners" className="link-arrow">
            Our developer partners and project ecosystem <ArrowRight />
          </Link>
        </p>
      </div>
    </section>

    {/* Inquiry */}
    <section className="bg-canvas py-20 md:py-24" aria-labelledby="inquiry-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="space-y-6">
              <p className="eyebrow">Engagement Desk</p>
              <h2 id="inquiry-heading" className="font-display text-3xl font-light leading-tight text-ink">
                Bring IHD into your project early
              </h2>
              <p className="prose-body">
                Whether it is a hotel, a venue, a place of worship or a commercial tower, the earlier acoustics and
                technology are considered, the less needs to be corrected later. Tell us about your project and the
                relevant discipline lead will respond.
              </p>
              <dl className="space-y-4 border-t border-white/10 pt-6 font-mono text-xs">
                <div>
                  <dt className="mb-0.5 uppercase tracking-wider text-ink-muted">Technical enquiries</dt>
                  <dd><a href={`mailto:${SITE.email}`} className="text-ink hover:text-signal">{SITE.email}</a></dd>
                </div>
                <div>
                  <dt className="mb-0.5 uppercase tracking-wider text-ink-muted">Direct line</dt>
                  <dd><a href={`tel:${SITE.phoneE164}`} className="text-ink hover:text-signal">{SITE.phoneDisplay}</a></dd>
                </div>
                <div>
                  <dt className="mb-0.5 uppercase tracking-wider text-ink-muted">Response</dt>
                  <dd className="text-ink">Within one business day</dd>
                </div>
              </dl>
            </div>
          </Reveal>
          <div className="rounded-sm border border-white/10 bg-surface p-5 sm:p-8 lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
