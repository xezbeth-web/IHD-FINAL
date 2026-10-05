import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import Marquee from '../components/Marquee';
import { RevealText } from '../components/Motion';
import Scene from '../components/Scene';
import { CtaBand, PageHero, SectionHeader, delay } from '../components/ui';
import { getProject, projects } from '../data/projects';
import { developers } from '../data/team';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';

const TITLE = 'Developer Partners & Clients | IHD Philippines';
const DESCRIPTION =
  'IHD Philippines works with Ayala Land, DMCI Homes, Filinvest and Megaworld, and with architects, engineers and hotel operators on venues across the Philippines.';
const PATH = '/partners';

const hospitality = projects.filter((p) => p.sector === 'hospitality');
const heroProject = getProject('sheraton-cebu-mactan')!;

const sectorsServed = [
  'Commercial & corporate facilities',
  'Educational institutions',
  'Healthcare & medical centers',
  'Government & infrastructure',
  'Hospitality & entertainment'
];

const collaboration = [
  {
    title: 'Developers and owners',
    detail: 'Requirements, technology strategy and design reviews that protect the owner’s brief from concept to handover.'
  },
  {
    title: 'Architects and interior designers',
    detail: 'Acoustic, AV and device coordination resolved with the architecture, so systems support the design rather than compromise it.'
  },
  {
    title: 'Engineering consultants',
    detail: 'Close coordination with MEP and structural teams on noise control, containment, power and plant spaces.'
  },
  {
    title: 'Hotel operators and facility teams',
    detail: 'Systems that are documented, trained and supported for the people who run the building every day.'
  }
];

const benefits = [
  { title: 'Multi-disciplinary expertise', detail: 'Six engineering disciplines available within one practice.' },
  { title: 'Proven delivery', detail: `A portfolio of ${projects.length} projects across hospitality, worship, culture and commercial real estate.` },
  { title: 'Lifecycle support', detail: 'Support from concept through commissioning, with maintenance and optimisation advice after handover.' }
];

const Partners = () => (
  <>
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      image={ogImageFor('projects/okura')}
      jsonLd={graph(
        webPage('WebPage', PATH, TITLE, DESCRIPTION),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Partners', path: PATH }
        ])
      )}
    />

    <PageHero
      eyebrow="Partners & Clients"
      trail={[
        { name: 'Home', path: '/' },
        { name: 'Partners', path: PATH }
      ]}
      title="Developer partners and the project ecosystem we work within"
      lead="Over the years we have collaborated with forward-thinking organisations across industries. These partnerships allow us to deliver integrated technology and expert consultancy that lasts beyond handover."
      image={{ src: heroProject.image, alt: heroProject.imageAlt }}
    />

    <Scene tone="alt" aria-labelledby="developers-heading">
      <div className="container-site scene-pad-t">
        <SectionHeader
          id="developers-heading"
          eyebrow="Developer Relationships"
          title="Property developers we have worked with"
          lead="We have collaborated with some of the Philippines’ leading real estate developers."
        />
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((d, i) => (
            <li
              key={d.name}
              className="group flex flex-col items-center justify-center gap-6 bg-canvas-alt px-8 py-[clamp(2.5rem,7vh,4.5rem)] transition-colors duration-500 hover:bg-surface"
              data-rv
              style={delay(200 + i * 90)}
            >
              <Img
                src={d.image}
                alt={`${d.name} logo`}
                sizes="240px"
                className="h-12 w-auto max-w-[200px] object-contain opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="label">{d.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[clamp(2rem,6vh,4.5rem)] border-y border-white/10 py-5" data-rv="fade" style={delay(500)}>
        <Marquee
          label="Who we work with"
          speed={30}
          separator={<span className="h-1.5 w-1.5 rotate-45 bg-signal/80" />}
          itemClassName="font-display text-xl font-light tracking-tight text-ink/75 md:text-[1.6rem]"
          items={collaboration.map((c) => c.title)}
        />
      </div>
      <div className="h-[clamp(2rem,6.5vh,5rem)]" />
    </Scene>

    <Scene aria-labelledby="collab-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="collab-heading"
          eyebrow="Collaboration"
          title="Who we work alongside"
          lead="Our team works closely with architects, engineers and clients to integrate technology and acoustic principles throughout design and construction."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
          {collaboration.map((c, i) => (
            <div key={c.title} className="group bg-canvas p-7 transition-colors duration-500 hover:bg-surface md:p-8" data-rv style={delay(200 + i * 90)}>
              <p className="font-mono text-[11px] text-ink-muted transition-colors group-hover:text-signal">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl font-light text-ink md:text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm font-light leading-[1.75] text-ink-secondary">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>

    <Scene tone="alt" aria-labelledby="venues-heading">
      <div className="container-site grid gap-12 scene-pad lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5" data-rv>
            Hospitality Portfolio
          </p>
          <h2 id="venues-heading" className="display-xl">
            <RevealText text="Hotels and resorts in our portfolio" delay={80} />
          </h2>
          <p className="prose-body mt-6" data-rv style={delay(300)}>
            Hospitality is the largest part of our portfolio: {hospitality.length} hotels, resorts, health clubs and
            serviced residences, from city hotels in Metro Manila to beach resorts in Cebu, Boracay and Palawan.
          </p>
          <Link to="/sectors/hospitality" className="link-arrow mt-8" data-rv style={delay(400)}>
            View hospitality projects <ArrowRight />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7" data-rv style={delay(250)}>
          {hospitality.map((p) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link to={`/projects/${p.slug}`} className="group flex items-baseline justify-between gap-4 py-3 text-sm text-ink-secondary transition-colors hover:text-ink">
                <span className="transition-transform duration-500 group-hover:translate-x-1">{p.name}</span>
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">{p.region}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Scene>

    <Scene aria-labelledby="sectors-heading">
      <div className="container-site grid gap-16 scene-pad lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-5" data-rv>
            Industry Reach
          </p>
          <h2 id="sectors-heading" className="display-xl">
            <RevealText text="Sectors our partnerships span" delay={80} />
          </h2>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10" data-rv style={delay(300)}>
            {sectorsServed.map((s) => (
              <li key={s} className="flex items-center gap-3 py-3.5 text-sm text-ink-body">
                <span className="h-1 w-1 bg-signal" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5" data-rv>
            Working with IHD
          </p>
          <h2 className="display-xl">
            <RevealText text="What partners gain" delay={120} />
          </h2>
          <dl className="mt-10 space-y-8" data-rv style={delay(400)}>
            {benefits.map((b) => (
              <div key={b.title} className="border-l border-white/15 pl-5">
                <dt className="font-display text-lg font-light text-ink">{b.title}</dt>
                <dd className="mt-1.5 text-sm font-light leading-[1.75] text-ink-secondary">{b.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Scene>

    <CtaBand title="Interested in working together?" lead="Let’s discuss how IHD can support your next development, venue or renovation." />
  </>
);

export default Partners;
