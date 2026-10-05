import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img } from '../components/Img';
import { RevealText } from '../components/Motion';
import Scene from '../components/Scene';
import { CtaBand, PageHero, SectionHeader, delay } from '../components/ui';
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

const PersonCard = ({ person, large = false, index }: { person: Person; large?: boolean; index: number }) => (
  <figure
    className="group flex items-center gap-5 rounded-lg border border-white/10 bg-surface p-4 transition-colors duration-500 hover:border-white/20 hover:bg-surface-raised"
    data-rv
    style={delay(150 + index * 60)}
  >
    <div className={`shrink-0 overflow-hidden rounded-full bg-surface-raised ${large ? 'h-24 w-24' : 'h-16 w-16'}`}>
      <Img
        src={person.image}
        alt={`Portrait of ${person.name}, ${person.role} at IHD Philippines`}
        sizes={large ? '96px' : '64px'}
        className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:grayscale-0"
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
      image={{ src: banner.image, alt: banner.imageAlt }}
    />

    {/* Who we are */}
    <Scene tone="alt" aria-labelledby="story-heading">
      <div className="container-site grid gap-12 scene-pad lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5" data-rv>
            Who We Are
          </p>
          <h2 id="story-heading" className="display-xl">
            <RevealText text="Engineers, designers and consultants who bridge strategy and implementation" delay={80} step={35} />
          </h2>
        </div>
        <div className="space-y-7 lg:col-span-6 lg:col-start-7 lg:pt-14">
          <p className="prose-body" data-rv style={delay(300)}>
            IHD brings technical expertise and practical design thinking to the systems that determine how a building is
            experienced: how a room sounds, how a presentation or performance is seen and heard, how guests and residents
            are kept safe, and how every system stays connected.
          </p>
          <p className="prose-body" data-rv style={delay(400)}>
            We work for the people who commission and shape buildings — developers, owners and operators, architects and
            engineering consultants — on hotels and resorts, performance venues and events halls, churches, schools,
            museums, offices and residential towers.
          </p>
          <p className="prose-body" data-rv style={delay(500)}>
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
        </div>
      </div>
    </Scene>

    {/* Principles */}
    <Scene aria-labelledby="principles-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="principles-heading"
          eyebrow="Philosophy"
          title="How we think about building technology"
          lead="Technology systems are only as good as their coordination with the architecture around them and the people who will run them."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="group bg-canvas p-7 transition-colors duration-500 hover:bg-surface md:p-8" data-rv style={delay(200 + i * 90)}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors group-hover:text-signal">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl font-light text-ink md:text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm font-light leading-[1.75] text-ink-secondary">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>

    {/* Approach */}
    <Scene id="approach" tone="alt" aria-labelledby="approach-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="approach-heading"
          eyebrow="Approach"
          title="From discovery to deployment"
          lead="Roadmaps, system design, integration oversight and lifecycle support. Every project begins with thorough analysis and ends with verification."
        />
        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-white/15 lg:block" data-rv="line" style={delay(250)} aria-hidden="true" />
          {lifecycle.map((step, i) => (
            <li key={step.title} className="relative" data-rv style={delay(380 + i * 120)}>
              <span className="relative z-10 block h-[11px] w-[11px] rotate-45 border border-signal bg-canvas-alt" aria-hidden="true" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Phase 0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-light text-ink">{step.title}</h3>
              <p className="mt-3 text-[13.5px] font-light leading-[1.75] text-ink-secondary">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </Scene>

    {/* Capabilities */}
    <Scene aria-labelledby="capabilities-heading">
      <div className="container-site scene-pad">
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
        <ul className="border-t border-white/10">
          {disciplines.map((d, i) => (
            <li key={d.slug} className="border-b border-white/10" data-rv style={delay(150 + i * 70)}>
              <Link
                to={`/disciplines/${d.slug}`}
                className="group grid gap-2 py-[clamp(0.9rem,2.4vh,1.6rem)] transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="font-mono text-[11px] text-ink-muted md:col-span-1">{d.index}</span>
                <span className="font-display text-xl font-light text-ink transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-2xl">
                  {d.name}
                </span>
                <span className="text-sm font-light leading-[1.75] text-ink-secondary md:col-span-6">{d.summary}</span>
                <span className="hidden justify-end text-ink-secondary transition-colors group-hover:text-signal md:col-span-1 md:flex">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Scene>

    {/* People */}
    <Scene id="leadership" tone="alt" aria-labelledby="leadership-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="leadership-heading"
          eyebrow="Leadership"
          title="Section leaders"
          lead="Our section leaders are multi-disciplinary experts who guide each project with precision — and take pride in seeing systems come alive in the spaces people use every day."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {leadership.map((p, i) => (
            <PersonCard key={p.name} person={p} large index={i} />
          ))}
        </div>
      </div>
    </Scene>

    <Scene aria-labelledby="team-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="team-heading"
          eyebrow="Team"
          title="The engineers and consultants behind the work"
          lead="Acoustic, audiovisual, IT and BIM/CAD specialists and technology engineers who carry each design from drawings to commissioning."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p, i) => (
            <PersonCard key={p.name} person={p} index={i % 3} />
          ))}
        </div>
      </div>
    </Scene>

    <CtaBand title="Talk to the team about your project" />
  </>
);

export default About;
