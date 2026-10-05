import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { navItems } from '../lib/nav';
import { Seo } from '../lib/seo';

const NotFound = () => (
  <>
    <Seo
      title="Page not found | IHD Philippines"
      description="The page you are looking for does not exist or has moved."
      path="/404"
      noindex
    />
    <section className="flex min-h-[60vh] items-center py-24">
      <div className="container-site">
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="font-display text-4xl font-light tracking-tight text-ink md:text-5xl">This page could not be found</h1>
        <p className="prose-body mt-6 max-w-xl">
          The page may have moved during our site update. Try one of the sections below, or browse the project
          portfolio.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Back to home <ArrowRight />
          </Link>
          <Link to="/projects" className="btn-ghost">
            Project portfolio
          </Link>
        </div>
        <nav aria-label="Site sections" className="mt-14 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-secondary hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  </>
);

export default NotFound;
