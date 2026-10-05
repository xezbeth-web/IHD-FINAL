import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img } from '../components/Img';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, SectionHeader } from '../components/ui';
import { disciplines } from '../data/disciplines';
import { lifecycle, principles } from '../data/practice';
import { getProject, projects, regions } from '../data/projects';
import { leadership, team, type Person } from '../data/team';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';

const TITLE = 'About IHD Philippines | Engineering & Technology Consultancy';
const DESCRIPTION =
  'IHD Philippines is a technology consultancy headquartered in the Philippines, led by engineers in acoustics, AV, security, IT, IoT and building systems.';
const PATH = '/about';

const banner = getProject('hotel-okura-manila')!;

const PersonCard = ({ person, large = false }: { person: Person; large?: boolean }) => (
  <figure className="flex items-center gap-5 border border-white/10 bg-surface p-5">
    <div className={`shrink-0 overflow-hidden rounded-full bg-surface-raised ${large ? 'h-24 w-24' : 'h-16 w-16'}`}>
      <Img
        src={person.image}
        alt={`Portrait of ${person.name}, ${person.role} at IHD Philippines`}
        sizes={large ? '96px' : '64px'}
        className="h-full w-full object-cover grayscale-[30%]"
      />
    </div>
    <figcaption>
      <p className={`font-display text-ink ${large ? 'text-lg' : 'text-base'}`}>{person.name}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-signal">{person.role}</p>
    </figcaption>
  </figure>
);

const About = () => (
  <>
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph(
        webPage('AboutPage', PATH, TITLE, DESCRIPTION),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Practice Profile', path: PATH }
        ])
      )}
    />

    <PageHero
      eyebrow="Practice Profile"
      trail={[
        { name: 'Home', path: '/' },
        { name: 'Practice Profile', path: PATH }
      ]}
      title="An engineering consultancy for the technology inside buildings"
      lead="Headquartered in the Philippines with a presence across Asia, IHD Philippines Ltd. Inc. specialises in acoustics, audiovisual systems, security, IT and ELV infrastructure, IoT and guest room management. Our mission is simple: turn our clients’ ambitions into reality."
    />

    {/* Story */}
    <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="story-heading">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-3">Who We Are</p>
          <h2 id="story-heading" className="heading-section">
            Engineers, designers and consultants who bridge strategy and implementation
          </h2>
        </Reveal>
        <Reveal className="space-y-5 lg:col-span-7" delay={80}>
          <p className="prose-body">
            IHD brings technical expertise and practical design thinking to the systems that determine how a building
            is experienced: how a room sounds, how a presentation or performance is seen and heard, how guests and
            residents are kept safe, and how every system stays connected.
          </p>
          <p className="prose-body">
            We work for the people who commission and shape buildings — developers, owners and operators, architects
            and engineering consultants — on hotels and resorts, performance venues and events halls, churches,
            schools, museums, offices and residential towers.
          </p>
          <p className="prose-body">
            Our portfolio of {projects.length} projects spans {regions.length} regions of the Philippines, from Metro
            Manila to Cebu, Boracay, Palawan, Davao and Clark. You can{' '}
            <Link to="/projects" className="text-ink underline decoration-signal/50 underline-offset-4 hover:text-signal">
              browse the full project portfolio
            </Link>{' '}
            or{' '}
            <Link to="/disciplines" className="text-ink underline decoration-signal/50 underline-offset-4 hover:text-signal">
              explore each engineering discipline
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>

    {/* Image band */}
    <section aria-label="Project photograph" className="border-b border-white/10">
      <figure className="relative">
        <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden bg-surface-raised md:aspect-[21/8]">
          <Img src={banner.image} alt={banner.imageAlt} sizes="100vw" className="h-full w-full object-cover grayscale-[25%]" />
        </div>
        <figcaption className="container-site flex justify-between gap-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          <span>{banner.name}</span>
          <Link to={`/projects/${banner.slug}`} className="text-ink-secondary hover:text-ink">
            View project
          </Link>
        </figcaption>
      </figure>
    </section>

    {/* Principles */}
    <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="principles-heading">
      <div className="container-site">
        <SectionHeader
          id="principles-heading"
          eyebrow="Philosophy"
          title="How we think about building technology"
          lead="Technology systems are only as good as their coordination with the architecture around them and the people who will run them."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="bg-canvas p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-ink-secondary">{p.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Approach */}
    <section id="approach" className="border-b border-white/10 py-20 md:py-24" aria-labelledby="approach-heading">
      <div className="container-site">
        <SectionHeader
          id="approach-heading"
          eyebrow="Approach"
          title="From discovery to deployment"
          lead="Roadmaps, system design, integration oversight and lifecycle support. Every project begins with thorough analysis and ends with verification."
        />
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {lifecycle.map((step, i) => (
            <li key={step.title} className="border-t border-white/15 pt-6">
              <p className="font-mono text-xs text-signal">Phase 0{i + 1}</p>
              <h3 className="mt-3 text-base font-medium text-ink">{step.title}</h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-secondary">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Capabilities */}
    <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="capabilities-heading">
      <div className="container-site">
        <SectionHeader
          id="capabilities-heading"
          eyebrow="Capabilities"
          title="Disciplines within the practice"
          action={
            <Link to="/disciplines" className="link-arrow">
              Discipline overview <ArrowRight />
            </Link>
          }
        />
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {disciplines.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/disciplines/${d.slug}`}
                className="group grid gap-2 py-6 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="font-mono text-[11px] text-ink-muted md:col-span-1">{d.index}</span>
                <span className="font-display text-lg text-ink md:col-span-4">{d.name}</span>
                <span className="text-sm font-light text-ink-secondary md:col-span-6">{d.summary}</span>
                <span className="hidden justify-end text-ink-secondary group-hover:text-signal md:col-span-1 md:flex">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* People */}
    <section id="leadership" className="py-20 md:py-24" aria-labelledby="leadership-heading">
      <div className="container-site">
        <SectionHeader
          id="leadership-heading"
          eyebrow="Leadership"
          title="Section leaders"
          lead="Our section leaders are multi-disciplinary experts who guide each project with precision — and take pride in seeing systems come alive in the spaces people use every day."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {leadership.map((p) => (
            <PersonCard key={p.name} person={p} large />
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-3">Team</p>
              <h2 className="heading-section">The engineers and consultants behind the work</h2>
              <p className="prose-body mt-4">
                Acoustic, audiovisual, IT and BIM/CAD specialists and technology engineers who carry each design from
                drawings to commissioning.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>

    <CtaBand title="Talk to the team about your project" />
  </>
);

export default About;
