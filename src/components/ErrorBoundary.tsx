import { Component, type ErrorInfo, type ReactNode } from 'react';
import { SITE } from '../lib/site';

interface State {
  failed: boolean;
}

/** Keeps a runtime error in one page from blanking the whole site; shows contact details instead. */
class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page error:', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="flex min-h-[60vh] items-center py-24">
        <div className="container-site">
          <p className="eyebrow mb-5">Something went wrong</p>
          <h1 className="font-display text-4xl font-light tracking-tight text-ink">This page could not be displayed</h1>
          <p className="prose-body mt-6 max-w-xl">
            Please reload the page or return to the homepage. You can also reach us directly at{' '}
            <a href={`mailto:${SITE.email}`} className="text-ink underline underline-offset-4">
              {SITE.email}
            </a>{' '}
            or{' '}
            <a href={`tel:${SITE.phoneE164}`} className="text-ink underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a href="/" className="btn-ghost">
              Back to home
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorBoundary;
