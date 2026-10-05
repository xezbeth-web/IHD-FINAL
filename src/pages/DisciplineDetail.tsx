import { Link, NavLink, useParams } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { ogImageFor } from '../components/Img';
import InquiryForm from '../components/InquiryForm';
import { RevealText } from '../components/Motion';
import Scene from '../components/Scene';
import { PageHero, ProjectCard, SectionHeader, delay } from '../components/ui';
import { disciplines, getDiscipline } from '../data/disciplines';
import { disciplineFaqs } from '../data/faqs';
import { projects, projectsByDiscipline } from '../data/projects';
import { breadcrumbs, faqPage, graph, service, webPage } from '../lib/schema';
import { IN_PLACE } from '../lib/nav';
import { Seo } from '../lib/seo';
import NotFound from './NotFound';

const DisciplinePage = ({ slug }: { slug?: string }) => {
  const d = getDiscipline(slug);
  if (!d) return <NotFound />;

  const path = `/disciplines/${d.slug}`;
  const related = projectsByDiscipline(d.slug);
  const faqs = disciplineFaqs[d.slug];
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Disciplines', path: '/disciplines' },
    { name: d.name, path }
  ];

  return (
    <>
      <Seo
        title={d.seoTitle}
        description={d.metaDescription}
        path={path}
        image={ogImageFor(d.image)}
        imageAlt={d.imageAlt}
        jsonLd={graph(
          webPage('WebPage', path, d.seoTitle, d.metaDescription, { mainEntity: { '@id': service(d.slug)['@id'] } }),
          service(d.slug),
          faqPage(path, faqs),
          breadcrumbs(trail)
        )}
      />

      <PageHero
        eyebrow={`Discipline ${d.index} · ${d.name}`}
        trail={trail}
        title={d.h1}
        lead={d.positioning}
        image={{ src: d.image, alt: d.imageAlt }}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#enquire" className="btn-primary">
            Discuss your project <ArrowRight />
          </a>
          {related.length > 0 && (
            <a href="#projects" className="btn-ghost bg-black/20 backdrop-blur-sm">
              {related.length} related projects
            </a>
          )}
        </div>
      </PageHero>

      {/* Overview */}
      <Scene tone="alt" aria-labelledby="overview-heading">
        <div className="container-site grid gap-14 scene-pad lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5" data-rv>
              Overview
            </p>
            <h2 id="overview-heading" className="display-xl">
              <RevealText text={`Our ${d.name} practice`} delay={80} />
            </h2>
            <div className="mt-10 max-w-3xl space-y-6">
              {d.overview.map((para, i) => (
                <p key={para.slice(0, 24)} className="prose-body" data-rv style={delay(300 + i * 100)}>
                  {para}
                </p>
              ))}
            </div>
          </div>
          <nav aria-label="Disciplines" className="lg:col-span-3 lg:col-start-10 lg:pt-16" data-rv style={delay(400)}>
            <p className="label mb-5">All disciplines</p>
            <ul className="space-y-1 border-l border-white/10">
              {disciplines.map((x) => (
                <li key={x.slug}>
                  <NavLink
                    state={IN_PLACE}
                    to={`/disciplines/${x.slug}`}
                    className={({ isActive }) =>
                      `-ml-px block border-l py-2 pl-4 text-sm transition-colors duration-300 ${
                        isActive ? 'border-signal text-ink' : 'border-transparent text-ink-secondary hover:border-white/30 hover:text-ink'
                      }`
                    }
                  >
                    {x.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Scene>

      {/* Capabilities */}
      <Scene aria-labelledby="capabilities-heading">
        <div className="container-site scene-pad">
          <SectionHeader id="capabilities-heading" eyebrow="Technical Capabilities" title="Core specialisations" />
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {d.capabilities.map((c, i) => (
              <div key={c.title} className="group bg-canvas p-6 transition-colors duration-500 hover:bg-surface md:p-7" data-rv style={delay(150 + i * 60)}>
                <dt className="font-display text-lg font-light text-ink">
                  <span className="mb-3 block font-mono text-[11px] text-ink-muted transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {c.title}
                </dt>
                <dd className="mt-2 text-sm font-light leading-[1.75] text-ink-secondary">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Scene>

      {/* Applications */}
      <Scene tone="alt" aria-labelledby="applications-heading">
        <div className="container-site scene-pad">
          <SectionHeader id="applications-heading" eyebrow="Applications" title="Where this discipline is applied" />
          <ul className="grid grid-cols-1 gap-x-12 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {d.applications.map((a, i) => (
              <li key={a.title} className="border-t border-white/15 pt-6" data-rv style={delay(150 + i * 70)}>
                <h3 className="font-display text-lg font-light text-ink">{a.title}</h3>
                <p className="mt-2 text-sm font-light leading-[1.75] text-ink-secondary">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Scene>

      {/* Methodology */}
      <Scene aria-labelledby="method-heading">
        <div className="container-site scene-pad">
          <SectionHeader id="method-heading" eyebrow="Engineering Methodology" title="How we deliver" />
          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-white/15 lg:block" data-rv="line" style={delay(250)} aria-hidden="true" />
            {d.methodology.map((m, i) => (
              <li key={m.title} className="relative" data-rv style={delay(380 + i * 120)}>
                <span className="relative z-10 block h-[11px] w-[11px] rotate-45 border border-signal bg-canvas" aria-hidden="true" />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-light text-ink">{m.title}</h3>
                <p className="mt-3 text-[13.5px] font-light leading-[1.75] text-ink-secondary">{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Scene>

      {/* FAQ */}
      <Scene tone="alt" aria-labelledby="faq-heading">
        <div className="container-site grid gap-12 scene-pad lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5" data-rv>
              Questions
            </p>
            <h2 id="faq-heading" className="display-xl">
              <RevealText text="Frequently asked questions" delay={80} />
            </h2>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {faqs.map((f, i) => (
              <details key={f.q} className="group py-6" data-rv style={delay(200 + i * 80)}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-light text-ink transition-colors group-hover:text-signal md:text-xl">{f.q}</h3>
                  <span
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-ink-secondary transition-transform duration-500 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-[15px] font-light leading-[1.8] text-ink-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Scene>

      {/* Related projects */}
      {related.length > 0 && (
        <Scene id="projects" aria-labelledby="related-heading">
          <div className="container-site scene-pad">
            <SectionHeader
              id="related-heading"
              eyebrow="Relevant Projects"
              title={`${d.name} projects`}
              lead={`${related.length} of our ${projects.length} portfolio projects include ${d.name} scope. Each project page lists the disciplines engaged.`}
              action={
                <Link to={`/projects?discipline=${d.slug}`} className="link-arrow">
                  All {related.length} {d.label.toLowerCase()} projects <ArrowRight />
                </Link>
              }
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p, i) => (
                <div key={p.slug} className="h-full" data-rv style={delay(200 + i * 100)}>
                  <ProjectCard project={p} aspect="aspect-[16/9]" />
                </div>
              ))}
            </div>
          </div>
        </Scene>
      )}

      {/* Related disciplines */}
      <Scene tone="alt" aria-labelledby="related-disciplines-heading">
        <div className="container-site scene-pad">
          <SectionHeader id="related-disciplines-heading" eyebrow="Related Disciplines" title={`Often designed alongside ${d.name}`} />
          <div
            className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 ${
              d.related.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}
          >
            {d.related.map((s, i) => {
              const r = getDiscipline(s)!;
              return (
                <Link
                  key={s}
                  to={`/disciplines/${s}`}
                  className="group flex flex-col justify-between gap-10 bg-canvas-alt p-8 transition-colors duration-500 hover:bg-surface-raised md:p-10"
                  data-rv
                  style={delay(200 + i * 100)}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      {r.index} / {r.label}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-light text-ink">{r.name}</h3>
                    <p className="mt-3 text-sm font-light leading-[1.75] text-ink-secondary">{r.summary}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                    {r.anchor} <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* Enquiry */}
      <Scene id="enquire" tone="deep" aria-labelledby="enquire-heading">
        <div className="container-site grid gap-14 scene-pad lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-5">
            <p className="eyebrow" data-rv>
              Engagement Desk
            </p>
            <h2 id="enquire-heading" className="display-xl">
              <RevealText text={`Discuss ${d.name} for your project`} delay={80} />
            </h2>
            <p className="prose-body" data-rv style={delay(300)}>
              Share the facility type, location and project stage. The relevant discipline lead will review your brief and
              respond within one business day.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface p-5 sm:p-8 lg:col-span-7" data-rv style={delay(250)}>
            <InquiryForm defaultDiscipline={d.name} />
          </div>
        </div>
      </Scene>
    </>
  );
};

/** Keyed by discipline: switching from the side menu swaps the content where the visitor is
 *  (an in-place navigation), and the remount replays each scene's reveal as the transition. */
const DisciplineDetail = () => {
  const { slug } = useParams();
  return <DisciplinePage key={slug} slug={slug} />;
};

export default DisciplineDetail;
