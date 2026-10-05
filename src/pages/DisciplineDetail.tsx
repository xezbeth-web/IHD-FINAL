import { Link, NavLink, useParams } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { Img, ogImageFor } from '../components/Img';
import InquiryForm from '../components/InquiryForm';
import Reveal from '../components/Reveal';
import { Breadcrumbs, ProjectCard, SectionHeader } from '../components/ui';
import { disciplines, getDiscipline } from '../data/disciplines';
import { disciplineFaqs } from '../data/faqs';
import { projects, projectsByDiscipline } from '../data/projects';
import { breadcrumbs, faqPage, graph, service, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import NotFound from './NotFound';

const DisciplineDetail = () => {
  const { slug } = useParams();
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

      {/* Masthead with image */}
      <section className="border-b border-white/10 pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="container-site">
          <Breadcrumbs trail={trail} />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                Discipline {d.index} · {d.name}
              </p>
              <h1 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">{d.h1}</h1>
              <p className="mt-6 text-base font-light leading-relaxed text-ink-secondary md:text-lg">{d.positioning}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#enquire" className="btn-primary">
                  Discuss your project <ArrowRight />
                </a>
                {related.length > 0 && (
                  <a href="#projects" className="btn-ghost">
                    {related.length} related projects
                  </a>
                )}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-surface-raised">
                <Img src={d.image} alt={d.imageAlt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover grayscale-[30%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Disciplines" className="sticky top-28">
            <p className="label mb-4">Disciplines</p>
            <ul className="space-y-1 border-l border-white/10">
              {disciplines.map((x) => (
                <li key={x.slug}>
                  <NavLink
                    to={`/disciplines/${x.slug}`}
                    className={({ isActive }) =>
                      `-ml-px block border-l py-2 pl-4 text-sm transition-colors ${
                        isActive ? 'border-signal text-ink' : 'border-transparent text-ink-secondary hover:text-ink'
                      }`
                    }
                  >
                    {x.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="space-y-20 lg:col-span-9">
          {/* Overview */}
          <section aria-labelledby="overview-heading">
            <p className="eyebrow mb-3">Overview</p>
            <h2 id="overview-heading" className="heading-section">
              Our {d.name} practice
            </h2>
            <div className="mt-6 max-w-3xl space-y-5">
              {d.overview.map((para) => (
                <p key={para.slice(0, 24)} className="prose-body">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section aria-labelledby="capabilities-heading">
            <p className="eyebrow mb-3">Technical Capabilities</p>
            <h2 id="capabilities-heading" className="heading-section">
              Core specialisations
            </h2>
            <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
              {d.capabilities.map((c, i) => (
                <div key={c.title} className="bg-canvas p-6 sm:[&:last-child:nth-child(odd)]:col-span-2">
                  <dt className="flex items-baseline gap-3 text-base font-medium text-ink">
                    <span className="font-mono text-[11px] text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                    {c.title}
                  </dt>
                  <dd className="mt-2 pl-8 text-sm font-light leading-relaxed text-ink-secondary">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Applications */}
          <section aria-labelledby="applications-heading">
            <p className="eyebrow mb-3">Applications</p>
            <h2 id="applications-heading" className="heading-section">
              Where this discipline is applied
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {d.applications.map((a) => (
                <li key={a.title} className="border-t border-white/10 pt-5">
                  <h3 className="text-base font-medium text-ink">{a.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-ink-secondary">{a.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Methodology */}
          <section aria-labelledby="method-heading">
            <p className="eyebrow mb-3">Engineering Methodology</p>
            <h2 id="method-heading" className="heading-section">
              How we deliver
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {d.methodology.map((m, i) => (
                <li key={m.title} className="border-l border-white/15 pl-5">
                  <p className="font-mono text-xs text-signal">0{i + 1}</p>
                  <h3 className="mt-2 text-base font-medium text-ink">{m.title}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed text-ink-secondary">{m.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <p className="eyebrow mb-3">Questions</p>
            <h2 id="faq-heading" className="heading-section">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-base font-medium">{f.q}</h3>
                    <span className="mt-1 shrink-0 font-mono text-ink-muted transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm font-light leading-relaxed text-ink-secondary">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <section id="projects" className="border-t border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="related-heading">
          <div className="container-site">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 6).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related disciplines */}
      <section className="border-t border-white/10 py-20" aria-labelledby="related-disciplines-heading">
        <div className="container-site">
          <p className="eyebrow mb-3">Related Disciplines</p>
          <h2 id="related-disciplines-heading" className="heading-section mb-10">
            Often designed alongside {d.name}
          </h2>
          <div className={`grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 ${d.related.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {d.related.map((slug) => {
              const r = getDiscipline(slug)!;
              return (
                <Link key={slug} to={`/disciplines/${slug}`} className="group flex flex-col justify-between gap-6 bg-canvas p-7 transition-colors hover:bg-surface-raised">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      {r.index} / {r.label}
                    </p>
                    <h3 className="mt-3 text-lg font-medium text-ink">{r.name}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-ink-secondary">{r.summary}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
                    {r.anchor} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="border-t border-white/10 bg-canvas-alt py-20 md:py-24" aria-labelledby="enquire-heading">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <p className="eyebrow">Engagement Desk</p>
            <h2 id="enquire-heading" className="heading-section">
              Discuss {d.name} for your project
            </h2>
            <p className="prose-body">
              Share the facility type, location and project stage. The relevant discipline lead will review your brief
              and respond within one business day.
            </p>
          </div>
          <div className="rounded-sm border border-white/10 bg-surface p-5 sm:p-8 lg:col-span-7">
            <InquiryForm defaultDiscipline={d.name} />
          </div>
        </div>
      </section>
    </>
  );
};

export default DisciplineDetail;
