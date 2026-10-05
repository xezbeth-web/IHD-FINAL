import { Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import { PageHero } from '../components/ui';
import { disciplines } from '../data/disciplines';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { SITE } from '../lib/site';

const TITLE = 'Contact IHD Philippines | Acoustic, AV & Technology Consultancy';
const DESCRIPTION =
  'Request technical advisory from IHD Philippines for acoustics, audiovisual, security, IT, IoT or GRMS. Call +63 917 863 4060 or email design@ihd-mnl.com.';
const PATH = '/contact';

const briefChecklist = [
  'Facility type — hotel, venue, church, school, office or residential',
  'Location and approximate size of the spaces involved',
  'Project stage — concept, design development, construction or renovation',
  'Disciplines you need, or the problem you are trying to solve',
  'Key dates such as design submissions, tender or opening'
];

const nextSteps = [
  { title: 'Review', detail: 'Your brief is routed to the relevant discipline lead.' },
  { title: 'Respond', detail: 'We reply within one business day with questions or next steps.' },
  { title: 'Discuss', detail: 'We arrange a conversation to understand requirements and scope.' }
];

const Contact = () => (
  <>
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph(
        webPage('ContactPage', PATH, TITLE, DESCRIPTION),
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: PATH }
        ])
      )}
    />

    <PageHero
      eyebrow="Engagement Desk"
      trail={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: PATH }
      ]}
      title="Contact IHD for engineering and technology advisory"
      lead="Whether it is a flagship hotel, a performance venue, a campus expansion or a resilient control center, tell us about your project. We respond within one business day."
    />

    <section className="py-16 md:py-20" aria-labelledby="form-heading">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        <div className="lg:col-span-5 lg:row-start-1">
          <div>
            <h2 className="label mb-5 text-ink-secondary">Direct contact</h2>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              <div className="py-5">
                <dt className="label mb-1">Technical enquiries</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="font-display text-xl text-ink transition-colors hover:text-signal">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="label mb-1">Direct line</dt>
                <dd>
                  <a href={`tel:${SITE.phoneE164}`} className="font-display text-xl text-ink transition-colors hover:text-signal">
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="label mb-1">Office hours</dt>
                <dd className="text-sm text-ink-body">{SITE.hours}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="rounded-sm border border-white/10 bg-surface p-5 sm:p-8 lg:sticky lg:top-28">
            <h2 id="form-heading" className="mb-2 font-display text-2xl font-light text-ink">
              Send a project brief
            </h2>
            <p className="mb-8 text-sm font-light text-ink-secondary">Fields marked * are required.</p>
            <InquiryForm />
          </div>
        </div>

        <div className="space-y-12 lg:col-span-5 lg:row-start-2">
          <div>
            <h2 className="label mb-5 text-ink-secondary">What to include in your brief</h2>
            <ul className="space-y-3">
              {briefChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-light leading-relaxed text-ink-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label mb-5 text-ink-secondary">What happens next</h2>
            <ol className="space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="border-l border-white/15 pl-5">
                  <p className="font-mono text-xs text-signal">0{i + 1}</p>
                  <h3 className="mt-1 text-base font-medium text-ink">{s.title}</h3>
                  <p className="mt-1 text-[13px] font-light text-ink-secondary">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-white/10 bg-canvas-alt py-16" aria-labelledby="explore-heading">
      <div className="container-site">
        <h2 id="explore-heading" className="label mb-6 text-ink-secondary">
          Not sure which discipline you need?
        </h2>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <li key={d.slug}>
              <Link to={`/disciplines/${d.slug}`} className="block h-full bg-canvas p-6 transition-colors hover:bg-surface-raised">
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{d.index}</span>
                <span className="mt-2 block text-base font-medium text-ink">{d.name}</span>
                <span className="mt-1 block text-[13px] font-light text-ink-secondary">{d.anchor}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default Contact;
