import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, SectionHeader } from '../components/ui';
import { projects } from '../data/projects';
import { developers } from '../data/team';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';

const TITLE = 'Developer Partners & Clients | IHD Philippines';
const DESCRIPTION =
  'IHD Philippines works with Ayala Land, DMCI Homes, Filinvest and Megaworld, and with architects, engineers and hotel operators on venues across the Philippines.';
const PATH = '/partners';

const hospitality = projects.filter((p) => p.sector === 'hospitality');

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
    />

    <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="developers-heading">
      <div className="container-site">
        <SectionHeader
          id="developers-heading"
          eyebrow="Developer Relationships"
          title="Property developers we have worked with"
          lead="We have collaborated with some of the Philippines’ leading real estate developers."
        />
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((d) => (
            <li key={d.name} className="flex flex-col items-center justify-center gap-5 bg-canvas px-8 py-12">
              <Img src={d.image} alt={`${d.name} logo`} sizes="240px" className="h-12 w-auto max-w-[200px] object-contain opacity-85" />
              <span className="label">{d.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="border-b border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="collab-heading">
      <div className="container-site">
        <SectionHeader
          id="collab-heading"
          eyebrow="Collaboration"
          title="Who we work alongside"
          lead="Our team works closely with architects, engineers and clients to integrate technology and acoustic principles throughout design and construction."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2">
          {collaboration.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="bg-canvas p-8">
              <h3 className="text-lg font-medium text-ink">{c.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-ink-secondary">{c.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="border-b border-white/10 py-20 md:py-24" aria-labelledby="venues-heading">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">Hospitality Portfolio</p>
          <h2 id="venues-heading" className="heading-section">
            Hotels and resorts in our portfolio
          </h2>
          <p className="prose-body mt-4">
            Hospitality is the largest part of our portfolio: {hospitality.length} hotels, resorts, health clubs and
            serviced residences, from city hotels in Metro Manila to beach resorts in Cebu, Boracay and Palawan.
          </p>
          <Link to="/sectors/hospitality" className="link-arrow mt-8">
            View hospitality projects <ArrowRight />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7">
          {hospitality.map((p) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link to={`/projects/${p.slug}`} className="flex items-baseline justify-between gap-4 py-3 text-sm text-ink-secondary transition-colors hover:text-ink">
                <span>{p.name}</span>
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">{p.region}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-canvas-alt py-20 md:py-24" aria-labelledby="sectors-heading">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Industry Reach</p>
          <h2 id="sectors-heading" className="heading-section">
            Sectors our partnerships span
          </h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {sectorsServed.map((s) => (
              <li key={s} className="flex items-center gap-3 py-3.5 text-sm text-ink-body">
                <span className="h-1 w-1 bg-signal" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Working with IHD</p>
          <h2 className="heading-section">What partners gain</h2>
          <dl className="mt-8 space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="border-l border-white/15 pl-5">
                <dt className="text-base font-medium text-ink">{b.title}</dt>
                <dd className="mt-1.5 text-sm font-light leading-relaxed text-ink-secondary">{b.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    <CtaBand title="Interested in working together?" lead="Let’s discuss how IHD can support your next development, venue or renovation." />
  </>
);

export default Partners;
