import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, SectionHeader } from '../components/ui';
import { disciplines } from '../data/disciplines';
import { projectsByDiscipline } from '../data/projects';
import { breadcrumbs, graph, service, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';

const TITLE = 'Acoustics, AV, Security & IT Engineering Disciplines | IHD';
const DESCRIPTION =
  'Six engineering disciplines from one Philippine consultancy: architectural acoustics, AV design, security, IT and ELV, IoT and smart buildings, and GRMS.';
const PATH = '/disciplines';

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
    >
      <nav aria-label="Jump to discipline" className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <li key={d.slug}>
              <a href={`#${d.slug}`} className="chip transition-colors hover:border-white/30 hover:text-ink">
                {d.index} {d.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </PageHero>

    <section aria-label="Discipline overview">
      {disciplines.map((d, i) => {
        const count = projectsByDiscipline(d.slug).length;
        const flip = i % 2 === 1;
        return (
          <article
            key={d.slug}
            id={d.slug}
            className={`border-b border-white/10 py-16 md:py-20 ${flip ? 'bg-canvas-alt' : ''}`}
            aria-labelledby={`${d.slug}-heading`}
          >
            <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
                <Link to={`/disciplines/${d.slug}`} className="group block overflow-hidden rounded-sm border border-white/10" tabIndex={-1}>
                  <div className="aspect-[4/3] bg-surface-raised">
                    <Img src={d.image} alt={d.imageAlt} sizes="(min-width: 1024px) 40vw, 100vw" className="img-treatment h-full w-full object-cover" />
                  </div>
                </Link>
              </Reveal>
              <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`} delay={60}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  {d.index} / {d.label}
                  {count > 0 && <span className="text-signal"> · {count} portfolio projects</span>}
                </p>
                <h2 id={`${d.slug}-heading`} className="mt-3 font-display text-2xl font-light text-ink md:text-3xl">
                  {d.name}
                </h2>
                <p className="prose-body mt-4">{d.positioning}</p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-white/10 pt-6 sm:grid-cols-2">
                  {d.capabilities.slice(0, 6).map((c) => (
                    <li key={c.title} className="flex gap-2.5 text-sm text-ink-body">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                      {c.title}
                    </li>
                  ))}
                </ul>
                <Link to={`/disciplines/${d.slug}`} className="link-arrow mt-8">
                  {d.anchor} <ArrowRight />
                </Link>
              </Reveal>
            </div>
          </article>
        );
      })}
    </section>

    <section className="py-20 md:py-24" aria-labelledby="integration-heading">
      <div className="container-site">
        <SectionHeader
          id="integration-heading"
          eyebrow="Integrated Delivery"
          title="Why one practice for six disciplines"
          lead="Many of our projects engage several disciplines at once — acoustics with audiovisual in churches and ballrooms, or all four of acoustics, AV, IT and security in resorts and residential towers."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
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
          ].map((x, i) => (
            <Reveal key={x.title} delay={i * 60} className="border-l border-white/15 p-6">
              <h3 className="text-base font-medium text-ink">{x.title}</h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-secondary">{x.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CtaBand />
  </>
);

export default Disciplines;
