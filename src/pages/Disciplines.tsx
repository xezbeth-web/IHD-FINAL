import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import { RevealText } from '../components/Motion';
import Scene from '../components/Scene';
import { CtaBand, PageHero, SectionHeader, delay } from '../components/ui';
import { disciplines } from '../data/disciplines';
import { getProject, projectsByDiscipline } from '../data/projects';
import { breadcrumbs, graph, service, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';

const TITLE = 'Acoustics, AV, Security & IT Engineering Disciplines | IHD';
const DESCRIPTION =
  'Six engineering disciplines from one Philippine consultancy: architectural acoustics, AV design, security, IT and ELV, IoT and smart buildings, and GRMS.';
const PATH = '/disciplines';

const heroProject = getProject('pasig-catholic-school-auditorium')!;

const integration = [
  {
    title: 'Shared infrastructure',
    detail: 'AV, security, IoT and guest room systems all run over the IT network. Designing them together avoids gaps and duplication.'
  },
  {
    title: 'Coordinated spaces',
    detail: 'Room acoustics, loudspeakers, displays, cameras and sensors compete for the same walls and ceilings. We resolve that on paper first.'
  },
  {
    title: 'One accountable team',
    detail: 'Owners and design teams deal with one consultancy for requirements, reviews and commissioning across disciplines.'
  }
];

const Disciplines = () => (
  <>
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      image={ogImageFor('disciplines/acoustics')}
      jsonLd={graph(
        webPage('CollectionPage', PATH, TITLE, DESCRIPTION, {
          hasPart: disciplines.map((d) => ({ '@id': service(d.slug)['@id'] }))
        }),
        ...disciplines.map((d) => service(d.slug)),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Disciplines', path: PATH }
        ])
      )}
    />

    <PageHero
      eyebrow="Engineering Disciplines"
      trail={[
        { name: 'Home', path: '/' },
        { name: 'Disciplines', path: PATH }
      ]}
      title="Acoustics, audiovisual and building technology engineering"
      lead="IHD covers six technical disciplines that increasingly depend on one another. Designing them within one practice means one coordinated set of requirements, one network strategy and one point of accountability for the client team."
      image={{ src: heroProject.image, alt: heroProject.imageAlt }}
    >
      <nav aria-label="Jump to discipline" className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <li key={d.slug}>
              <a href={`#${d.slug}`} className="chip bg-black/30 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-ink">
                {d.index} {d.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </PageHero>

    {disciplines.map((d, i) => {
      const count = projectsByDiscipline(d.slug).length;
      const flip = i % 2 === 1;
      return (
        <Scene key={d.slug} id={d.slug} tone={flip ? 'alt' : 'base'} aria-labelledby={`${d.slug}-heading`} className="overflow-hidden">
          {/* Oversized index numeral as a quiet background mark. */}
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-extralight leading-none tracking-tighter text-white/[0.025] lg:text-[26vw] ${
              flip ? '-left-[4vw]' : '-right-[4vw]'
            }`}
            aria-hidden="true"
          >
            {d.index}
          </span>
          <div className="container-site relative grid items-center gap-12 scene-pad lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`} data-rv="img" style={delay(150)}>
              <Link
                to={`/disciplines/${d.slug}`}
                className="group block aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-surface-raised lg:aspect-auto lg:h-[min(64svh,620px)]"
                tabIndex={-1}
              >
                <div className="rv-zoom">
                  <Img src={d.image} alt={d.imageAlt} sizes="(min-width: 1024px) 45vw, 100vw" className="img-treatment h-full w-full object-cover" />
                </div>
              </Link>
            </div>
            <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted" data-rv>
                {d.index} / {d.label}
                {count > 0 && <span className="text-signal"> · {count} portfolio projects</span>}
              </p>
              <h2 id={`${d.slug}-heading`} className="display-xl mt-5">
                <RevealText text={d.name} delay={80} />
              </h2>
              <p className="prose-body mt-6" data-rv style={delay(300)}>
                {d.positioning}
              </p>
              <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-white/10 pt-6 sm:grid-cols-2" data-rv style={delay(420)}>
                {d.capabilities.slice(0, 6).map((c) => (
                  <li key={c.title} className="flex gap-2.5 text-sm text-ink-body">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                    {c.title}
                  </li>
                ))}
              </ul>
              <Link to={`/disciplines/${d.slug}`} className="link-arrow mt-8" data-rv style={delay(520)}>
                {d.anchor} <ArrowRight />
              </Link>
            </div>
          </div>
        </Scene>
      );
    })}

    <Scene tone="alt" aria-labelledby="integration-heading">
      <div className="container-site scene-pad">
        <SectionHeader
          id="integration-heading"
          eyebrow="Integrated Delivery"
          title="Why one practice for six disciplines"
          lead="Many of our projects engage several disciplines at once — acoustics with audiovisual in churches and ballrooms, or all four of acoustics, AV, IT and security in resorts and residential towers."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
          {integration.map((x, i) => (
            <div key={x.title} className="bg-canvas-alt p-8 md:p-10" data-rv style={delay(200 + i * 100)}>
              <p className="font-mono text-[11px] text-signal">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl font-light text-ink">{x.title}</h3>
              <p className="mt-3 text-[13.5px] font-light leading-[1.75] text-ink-secondary">{x.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>

    <CtaBand />
  </>
);

export default Disciplines;
