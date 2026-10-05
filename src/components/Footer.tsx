import { Link } from 'react-router-dom';
import { disciplines } from '../data/disciplines';
import { sectors } from '../data/projects';
import { SITE } from '../lib/site';

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#0a0c10] text-ink-secondary">
    <div className="container-site py-16">
      <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-3">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/images/brand/ihd-mark.webp" alt="" width={140} height={64} className="h-6 w-auto" loading="lazy" />
            <span className="text-sm font-medium tracking-tight text-ink">{SITE.legalName}</span>
          </Link>
          <p className="max-w-sm text-[13px] leading-relaxed text-ink-muted">
            Technology and engineering consultancy for architectural acoustics, audiovisual systems, security, IT and
            ELV infrastructure, IoT and guest room management — headquartered in the Philippines.
          </p>
        </div>

        <nav aria-label="Disciplines" className="lg:col-span-3">
          <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink">Disciplines</h2>
          <ul className="space-y-2.5 text-[13px]">
            {disciplines.map((d) => (
              <li key={d.slug}>
                <Link to={`/disciplines/${d.slug}`} className="transition-colors hover:text-ink">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sectors" className="lg:col-span-2">
          <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink">Sectors</h2>
          <ul className="space-y-2.5 text-[13px]">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link to={`/sectors/${s.slug}`} className="transition-colors hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Practice" className="lg:col-span-2">
          <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink">Practice</h2>
          <ul className="space-y-2.5 text-[13px]">
            <li><Link to="/about" className="transition-colors hover:text-ink">Practice Profile</Link></li>
            <li><Link to="/about#leadership" className="transition-colors hover:text-ink">Leadership & Team</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-ink">Project Portfolio</Link></li>
            <li><Link to="/partners" className="transition-colors hover:text-ink">Developer Partners</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-ink">Contact</Link></li>
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-2">
          <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink">Engagement Desk</h2>
          <dl className="space-y-3 text-[13px]">
            <div>
              <dt className="label mb-0.5">Technical enquiries</dt>
              <dd><a href={`mailto:${SITE.email}`} className="text-ink transition-colors hover:text-signal">{SITE.email}</a></dd>
            </div>
            <div>
              <dt className="label mb-0.5">Direct line</dt>
              <dd><a href={`tel:${SITE.phoneE164}`} className="text-ink transition-colors hover:text-signal">{SITE.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="label mb-0.5">Office hours</dt>
              <dd>{SITE.hours}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/5 pt-8 font-mono text-[11px] text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {SITE.legalName}. Technology Consultancy.</p>
        <p>Headquartered in the Philippines</p>
      </div>
    </div>
  </footer>
);

export default Footer;
