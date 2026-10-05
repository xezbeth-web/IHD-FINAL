import { Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import Scene from '../components/Scene';
import { PageHero, SectionHeader, delay } from '../components/ui';
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
      compact
    />

    <Scene tone="alt" aria-labelledby="form-heading">
      <div className="container-site grid items-start gap-12 scene-pad lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5" data-rv style={delay(150)}>
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

        <div className="lg:col-span-7">
          <div className="rounded-lg border border-white/10 bg-surface p-5 sm:p-8" data-rv style={delay(250)}>
            <h2 id="form-heading" className="mb-2 font-display text-3xl font-light text-ink">
              Send a project brief
            </h2>
            <p className="mb-8 text-sm font-light text-ink-secondary">Fields marked * are required.</p>
            <InquiryForm />
          </div>
        </div>

      </div>
    </Scene>

    <Scene aria-labelledby="brief-heading">
        <div className="container-site grid gap-14 scene-pad lg:grid-cols-2 lg:gap-20" data-rv style={delay(150)}>
          <div>
            <p className="eyebrow mb-5">Preparing a brief</p>
            <h2 id="brief-heading" className="display-xl mb-10">What to include in your brief</h2>
            <ul className="space-y-3">
              {briefChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] font-light leading-[1.75] text-ink-body">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">After you send it</p>
            <h2 className="display-xl mb-10">What happens next</h2>
            <ol className="space-y-6">
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
    </Scene>

    <Scene tone="deep" aria-labelledby="explore-heading">
      <div className="container-site scene-pad">
        <SectionHeader id="explore-heading" eyebrow="Disciplines" title="Not sure which discipline you need?" />
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <li key={d.slug} data-rv style={delay(150 + i * 70)}>
              <Link to={`/disciplines/${d.slug}`} className="group block h-full bg-canvas p-8 transition-colors duration-500 hover:bg-surface-raised md:p-9">
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted transition-colors group-hover:text-signal">{d.index}</span>
                <span className="mt-3 block font-display text-xl font-light text-ink">{d.name}</span>
                <span className="mt-1 block text-[13px] font-light text-ink-secondary">{d.anchor}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Scene>
  </>
);

export default Contact;
