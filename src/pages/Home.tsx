import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { Img } from '../components/Img';
import InquiryForm from '../components/InquiryForm';
import Marquee from '../components/Marquee';
import { CountUp, RevealText, ScrollLitText } from '../components/Motion';
import Scene from '../components/Scene';
import SectionRail from '../components/SectionRail';
import StoryScroll from '../components/StoryScroll';
import { HERO_PAD, ScrollCue } from '../components/ui';
import { getDiscipline, disciplines } from '../data/disciplines';
import { lifecycle } from '../data/practice';
import { getProject, projects, regions, sectors } from '../data/projects';
import { developers, leadership, team } from '../data/team';
import { graph, webPage } from '../lib/schema';
import { prefersReducedMotion } from '../lib/scroll';
import { Seo } from '../lib/seo';
import { SITE } from '../lib/site';

const TITLE = 'IHD Philippines | Acoustics, AV & Building Technology Consultancy';
const DESCRIPTION =
  'Philippine technology consultancy for architectural acoustics, AV design, security, IT and ELV, IoT and GRMS — for hotels, venues and commercial buildings.';

const heroStack = {
  main: getProject('rockwell-performing-arts-theater')!,
  low: getProject('the-fifth-at-rockwell')!,
  high: getProject('grand-hyatt-manila-rooftop')!
};

const featured = [
  'metrobank-center-grand-hyatt',
  'crimson-mactan',
  'shangri-la-plaza-chapel',
  'hotel-okura-manila'
].map((slug) => getProject(slug)!);

const sectorCovers: Record<string, string> = {
  hospitality: 'hotel-okura-manila',
  worship: 'full-gospel-church-makati',
  'culture-education': 'pasig-catholic-school-auditorium',
  'commercial-residential': 'philam-life-building'
};

const metrics = [
  { value: projects.length, pad: 2, label: 'Portfolio projects', note: 'Hotels, venues, churches and towers' },
  { value: disciplines.length, pad: 2, label: 'Engineering disciplines', note: 'Coordinated under one practice' },
  { value: regions.length, pad: 2, label: 'Regions served', note: 'From Metro Manila to Cebu, Palawan and Davao' },
  { value: leadership.length + team.length, pad: 2, label: 'Engineers & consultants', note: 'Led by multi-disciplinary section heads' }
];

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/* ── 04 · Project index: hover or focus a row to bring its photograph forward; otherwise it cycles. ── */
const CYCLE_MS = 5000;

const ProjectIndex = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % featured.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, visible, paused]);

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16" style={{ '--cycle': `${CYCLE_MS}ms` } as CSSProperties}>
      <div className="min-w-0 lg:order-2 lg:col-span-7" data-rv="img" style={d(150)}>
        <div className="project-frame relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-surface-raised lg:aspect-auto lg:h-[min(68svh,640px)]">
          {featured.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} data-on={i === active || undefined} tabIndex={-1} aria-hidden="true">
              <Img src={p.image} alt={p.imageAlt} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16 md:p-7">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/80">
                  {p.types[0]} · {p.location}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="min-w-0 lg:order-1 lg:col-span-5">
        <p className="eyebrow mb-5" data-rv>
          Project Index
        </p>
        <h2 id="projects-heading" className="display-xl">
          <RevealText text="Selected commissions" delay={80} />
        </h2>
        <p className="prose-body mt-6 max-w-md" data-rv style={d(250)}>
          Landmark towers, beach resorts, city hotels and sanctuaries — a selection from {projects.length} projects across
          the Philippines.
        </p>

        <ol className="mt-9 border-t border-white/10" onMouseLeave={() => setPaused(false)}>
          {featured.map((p, i) => (
            <li
              key={p.slug}
              className="project-row relative border-b border-white/10"
              data-on={i === active || undefined}
              data-paused={paused || undefined}
              data-rv
              style={d(320 + i * 70)}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="group flex items-baseline gap-5 py-3.5 md:py-4"
                onMouseEnter={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onFocus={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
              >
                <span className="font-mono text-[11px] text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-display text-lg font-light transition-colors duration-500 md:text-xl ${
                      i === active ? 'text-ink' : 'text-ink-secondary group-hover:text-ink'
                    }`}
                  >
                    {p.name}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
                    {p.region} · {p.disciplines.map((s) => getDiscipline(s)!.label).join(' / ')}
                  </span>
                </span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-all duration-500 ${
                    i === active ? 'translate-x-0 text-signal opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                />
              </Link>
              <span className="project-row-bar absolute -bottom-px left-0 h-px w-full bg-signal" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <Link to="/projects" className="link-arrow mt-8" data-rv style={d(700)}>
          All {projects.length} projects <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

/* ── 05 · Sector panels: the focused panel widens to reveal its description. ── */
const SectorPanels = () => {
  const [active, setActive] = useState(0);
  return (
    <ul className="sector-panels sm:grid-cols-2">
      {sectors.map((s, i) => {
        const count = projects.filter((p) => p.sector === s.slug).length;
        const cover = getProject(sectorCovers[s.slug])!;
        return (
          <li key={s.slug} className="sector-panel" data-on={i === active || undefined}>
            <Link
              to={`/sectors/${s.slug}`}
              className="group relative flex h-[42svh] min-h-[15rem] flex-col justify-end overflow-hidden rounded-sm border border-white/10 bg-surface-raised p-6 sm:h-[34svh] lg:h-full md:p-7"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-rv
              style={d(200 + i * 90)}
            >
              <Img
                src={cover.image}
                alt={cover.imageAlt}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                className={`absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out ${
                  i === active ? 'scale-100 grayscale-0' : 'scale-105 grayscale-[60%]'
                }`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" aria-hidden="true" />
              <span className="relative">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                  {String(i + 1).padStart(2, '0')} · {String(count).padStart(2, '0')} projects
                </span>
                <h3 className="mt-2 font-display text-2xl font-light leading-tight text-white md:text-[1.75rem]">{s.name}</h3>
                <span className="sector-reveal">
                  <span className="sector-more">
                    <span className="block max-w-sm pt-3 text-[13.5px] leading-[1.7] text-white/75">{s.description}</span>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                      Explore sector <ArrowRight className="h-3 w-3" />
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Home = () => (
  <>
    <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={graph(webPage('WebPage', '/', TITLE, DESCRIPTION))} />
    <SectionRail />

    {/* 01 · Hero */}
    <Scene id="intro" label="Intro" aria-labelledby="hero-heading" className="scene-intro overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[16vw] -top-[24vh] h-[80vh] w-[80vh] glow" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className={`container-site relative flex flex-1 flex-col justify-center ${HERO_PAD}`}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8 xl:col-span-7">
            <p className="eyebrow-muted mb-7 flex items-center gap-2.5" data-rv>
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              Technology & Engineering Consultancy · Philippines
            </p>
            <h1 id="hero-heading" className="font-display font-light text-ink [font-size:clamp(2.4rem,min(4.7vw,8.2vh),4.6rem)] [letter-spacing:-0.035em] [line-height:1.04]">
              <RevealText text="Architectural acoustics, audiovisual and intelligent building systems — engineered as one." step={20} />
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-[1.75] text-ink-secondary md:text-lg md:leading-[1.7]" data-rv style={d(250)}>
              IHD Philippines is a technology consultancy for hotels, performance venues, worship spaces and commercial
              buildings. We design acoustics, AV, security, IT and ELV infrastructure, IoT and guest room systems — from
              discovery to commissioning.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" data-rv style={d(380)}>
              <Link to="/projects" className="btn-primary">
                View the project portfolio
                <ArrowUpRight />
              </Link>
              <Link to="/disciplines" className="btn-ghost">
                Engineering disciplines
              </Link>
            </div>
          </div>

          {/* Layered photography with depth: each layer drifts at its own rate as the scene is covered. */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-4 lg:max-w-none xl:col-span-5">
            <div className="relative ml-auto w-[86%]" data-depth="-40">
              <Link
                to={`/projects/${heroStack.main.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-surface-raised lg:aspect-auto lg:h-[min(62svh,640px)]"
                data-rv="img"
                style={d(250)}
              >
                <div className="rv-zoom">
                  <Img
                    src={heroStack.main.image}
                    alt={heroStack.main.imageAlt}
                    priority
                    sizes="(min-width: 1024px) 34vw, 86vw"
                    className="img-treatment h-full w-full object-cover"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-right font-mono text-[10.5px] uppercase tracking-[0.14em] text-white">
                  {heroStack.main.name}
                </span>
              </Link>
            </div>
            <div className="absolute -left-2 bottom-[8%] w-[46%] sm:-left-6" data-depth="-130">
              <Link
                to={`/projects/${heroStack.low.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-white/15 bg-surface-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                data-rv="img"
                style={d(500)}
              >
                <div className="rv-zoom">
                  <Img src={heroStack.low.image} alt={heroStack.low.imageAlt} sizes="(min-width: 1024px) 18vw, 40vw" className="img-treatment h-full w-full object-cover" />
                </div>
              </Link>
            </div>
            <div className="absolute -top-6 left-[6%] hidden w-[30%] sm:block" data-depth="-80">
              <Link
                to={`/projects/${heroStack.high.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-sm border border-white/15 bg-surface-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                data-rv="img"
                style={d(650)}
              >
                <div className="rv-zoom">
                  <Img src={heroStack.high.image} alt={heroStack.high.imageAlt} sizes="(min-width: 1024px) 12vw, 30vw" className="img-treatment h-full w-full object-cover" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScrollCue />
    </Scene>

    {/* 02 · Practice statement */}
    <Scene id="practice" label="Practice" tone="alt" aria-labelledby="practice-heading">
      <div className="container-site scene-pad">
        <h2 id="practice-heading" className="eyebrow mb-10 flex items-center gap-2.5" data-rv>
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          An integrated technology practice
        </h2>
        <ScrollLitText
          className="max-w-5xl font-display font-light text-ink [font-size:clamp(1.75rem,min(3.6vw,6.2vh),3.4rem)] [letter-spacing:-0.025em] [line-height:1.18]"
          text="Most building technology now shares the same network, ceiling space and operating team. We design these systems together so they are coordinated before construction — not reconciled after it."
        />
        <Link to="/about" className="link-arrow mt-10" data-rv style={d(200)}>
          Our practice profile <ArrowRight />
        </Link>

        <div className="mt-[clamp(2.5rem,8vh,6rem)]">
          <span className="block h-px w-full bg-white/15" data-rv="line" style={d(150)} />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 pt-[clamp(1.5rem,4vh,2.5rem)] md:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex flex-col gap-2" data-rv style={d(250 + i * 90)}>
                <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">{m.label}</dt>
                <dd className="order-1 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
                  <CountUp value={m.value} pad={m.pad} />
                </dd>
                <dd className="order-3 text-[12.5px] leading-relaxed text-ink-muted">{m.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Scene>

    {/* 03 · Disciplines — sticky, scroll-driven story */}
    <Scene id="disciplines" label="Disciplines" tone="deep" full={false} aria-labelledby="disciplines-heading">
      <StoryScroll headingId="disciplines-heading" />
    </Scene>

    {/* 04 · Selected commissions */}
    <Scene id="projects" label="Projects" aria-labelledby="projects-heading">
      <div className="container-site scene-pad-t pb-14">
        <ProjectIndex />
      </div>
    </Scene>

    {/* 05 · Sectors */}
    <Scene id="sectors" label="Sectors" tone="alt" aria-labelledby="sectors-heading">
      <div className="container-site scene-pad-t pb-14">
        <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5" data-rv>
              Sectors
            </p>
            <h2 id="sectors-heading" className="display-xl">
              <RevealText text="Where our engineering is at work" delay={80} />
            </h2>
          </div>
          <p className="prose-body lg:col-span-5" data-rv style={d(300)}>
            Our portfolio is concentrated in environments where sound, image, connectivity and security directly shape
            the experience of guests, congregations and audiences.
          </p>
        </div>
        <SectorPanels />
      </div>
    </Scene>

    {/* 06 · Engagement model + developer relationships */}
    <Scene id="approach" label="Approach" aria-labelledby="lifecycle-heading">
      <div className="container-site scene-pad-t pb-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5" data-rv>
              Engagement Model
            </p>
            <h2 id="lifecycle-heading" className="display-xl">
              <RevealText text="From discovery to commissioning" delay={80} />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="prose-body" data-rv style={d(300)}>
              Every engagement follows the same disciplined path, so design intent carries through construction,
              installation and handover.
            </p>
            <Link to="/about#approach" className="link-arrow mt-6" data-rv style={d(380)}>
              Our approach <ArrowRight />
            </Link>
          </div>
        </div>

        <ol className="relative mt-[clamp(2.5rem,7vh,5rem)] grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-white/15 lg:block" data-rv="line" style={d(250)} aria-hidden="true" />
          {lifecycle.map((step, i) => (
            <li key={step.title} className="relative" data-rv style={d(380 + i * 120)}>
              <span className="relative z-10 block h-[11px] w-[11px] rotate-45 border border-signal bg-canvas" aria-hidden="true" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Phase 0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-light text-ink">{step.title}</h3>
              <p className="mt-3 text-[13.5px] font-light leading-[1.75] text-ink-secondary">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-white/10 pb-10 pt-8" data-rv="fade" style={d(500)}>
        <div className="container-site mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="eyebrow-muted">Property developers we have worked with</h2>
          <Link to="/partners" className="link-arrow">
            Partners <ArrowRight />
          </Link>
        </div>
        <Marquee
          label="Property developers"
          speed={28}
          repeat={4}
          itemClassName="px-10 md:px-14"
          items={developers.map((x) => (
            <Img key={x.name} src={x.image} alt={`${x.name} logo`} sizes="200px" className="h-8 w-auto max-w-[150px] object-contain opacity-70 md:h-9" />
          ))}
        />
      </div>
    </Scene>

    {/* 07 · Enquiry */}
    <Scene id="contact" label="Contact" tone="deep" aria-labelledby="inquiry-heading">
      <div className="container-site scene-pad">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-5">
            <p className="eyebrow" data-rv>
              Engagement Desk
            </p>
            <h2 id="inquiry-heading" className="display-xl">
              <RevealText text="Bring IHD into your project early" delay={80} />
            </h2>
            <p className="prose-body" data-rv style={d(300)}>
              Whether it is a hotel, a venue, a place of worship or a commercial tower, the earlier acoustics and
              technology are considered, the less needs to be corrected later. Tell us about your project and the
              relevant discipline lead will respond.
            </p>
            <dl className="space-y-5 border-t border-white/10 pt-7 font-mono text-xs" data-rv style={d(400)}>
              <div>
                <dt className="mb-1 uppercase tracking-wider text-ink-muted">Technical enquiries</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="font-display text-lg text-ink transition-colors hover:text-signal">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-wider text-ink-muted">Direct line</dt>
                <dd>
                  <a href={`tel:${SITE.phoneE164}`} className="font-display text-lg text-ink transition-colors hover:text-signal">
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 uppercase tracking-wider text-ink-muted">Response</dt>
                <dd className="text-ink">Within one business day</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface p-5 sm:p-8 lg:col-span-7" data-rv style={d(250)}>
            <InquiryForm />
          </div>
        </div>
      </div>
    </Scene>
  </>
);

export default Home;
