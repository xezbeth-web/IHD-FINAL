import { FormEvent, Suspense, lazy, useId, useRef, useState } from 'react';
import type ReCAPTCHAType from 'react-google-recaptcha';
import { disciplines } from '../data/disciplines';
import { SITE } from '../lib/site';

// reCAPTCHA and EmailJS are only loaded once a visitor starts filling in the form.
const ReCAPTCHA = lazy(() => import('react-google-recaptcha'));

const EMAILJS = {
  serviceId: 'service_7p3avvw',
  templateId: 'template_h05bgmn',
  publicKey: 'RfGoFDS_XhqzbbNEh'
};
const RECAPTCHA_SITE_KEY = '6LfzHjwsAAAAAGiDsWvaX4R963Mn8lA9NeWQaZeN';
const COOLDOWN_KEY = 'contact_form_cooldown';
const COOLDOWN_MS = 60_000;

const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const readCooldown = () => {
  try {
    return Number(localStorage.getItem(COOLDOWN_KEY) ?? 0);
  } catch {
    return 0;
  }
};

const writeCooldown = () => {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    /* storage unavailable — cooldown is best-effort */
  }
};

type Status = { type: 'success' | 'error'; text: string } | null;

const InquiryForm = ({ defaultDiscipline = '' }: { defaultDiscipline?: string }) => {
  const id = useId();
  const [engaged, setEngaged] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHAType>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('user_name') ?? '').trim();
    const email = String(data.get('user_email') ?? '').trim();
    const company = String(data.get('user_company') ?? '').trim();
    const phone = String(data.get('user_phone') ?? '').trim();
    const discipline = String(data.get('discipline') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    // Honeypot: hidden from people, filled in by bots. Pretend success and send nothing.
    if (String(data.get('website') ?? '').trim()) {
      form.reset();
      return setStatus({ type: 'success', text: 'Thank you — your brief has been received.' });
    }

    if (name.length < 2) return setStatus({ type: 'error', text: 'Please enter your name (at least 2 characters).' });
    if (!isValidEmail(email)) return setStatus({ type: 'error', text: 'Please enter a valid email address.' });
    if (message.length < 10) return setStatus({ type: 'error', text: 'Please describe your project in at least 10 characters.' });

    const elapsed = Date.now() - readCooldown();
    if (elapsed < COOLDOWN_MS) {
      const seconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      return setStatus({ type: 'error', text: `Please wait ${seconds} seconds before sending another message.` });
    }
    if (phone && !/^[+()\d\s.-]{7,20}$/.test(phone)) return setStatus({ type: 'error', text: 'Please enter a valid phone number, or leave it blank.' });
    if (!captchaToken) return setStatus({ type: 'error', text: 'Please complete the reCAPTCHA verification.' });

    // EmailJS template variables are user_name, user_email, user_company and message, so the
    // extra details are prepended to the message to reach the inbox without template changes.
    const details = [
      discipline && `Discipline focus: ${discipline}`,
      phone && `Phone: ${phone}`,
      `Sent from: ${SITE.url}${window.location.pathname}`
    ].filter(Boolean);

    setSending(true);
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          user_name: name,
          user_email: email,
          user_company: company,
          user_phone: phone,
          discipline,
          message: `${details.join('\n')}\n\n${message}`,
          'g-recaptcha-response': captchaToken
        },
        EMAILJS.publicKey
      );
      writeCooldown();
      setStatus({
        type: 'success',
        text: 'Thank you — your brief has been received. We respond within one business day.'
      });
      form.reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus({ type: 'error', text: `We couldn’t send your message. Please email us directly at ${SITE.email}.` });
    } finally {
      setSending(false);
    }
  };

  const fieldId = (name: string) => `${id}-${name}`;

  return (
    <form className="space-y-5" onSubmit={handleSubmit} onFocusCapture={() => setEngaged(true)} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="label mb-2 block text-ink-secondary">
            Name <span aria-hidden="true">*</span>
          </label>
          <input id={fieldId('name')} name="user_name" type="text" autoComplete="name" required disabled={sending} className="field" placeholder="e.g. Arch. R. Castillo" />
        </div>
        <div>
          <label htmlFor={fieldId('email')} className="label mb-2 block text-ink-secondary">
            Email <span aria-hidden="true">*</span>
          </label>
          <input id={fieldId('email')} name="user_email" type="email" autoComplete="email" required disabled={sending} className="field" placeholder="name@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('company')} className="label mb-2 block text-ink-secondary">
            Company / Project
          </label>
          <input id={fieldId('company')} name="user_company" type="text" autoComplete="organization" disabled={sending} className="field" placeholder="Developer, firm or project name" />
        </div>
        <div>
          <label htmlFor={fieldId('phone')} className="label mb-2 block text-ink-secondary">
            Phone / Viber <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id={fieldId('phone')} name="user_phone" type="tel" autoComplete="tel" inputMode="tel" disabled={sending} className="field" placeholder="+63 9XX XXX XXXX" />
        </div>
      </div>
      <div>
        <label htmlFor={fieldId('discipline')} className="label mb-2 block text-ink-secondary">
          Discipline focus
        </label>
        <select id={fieldId('discipline')} name="discipline" defaultValue={defaultDiscipline} disabled={sending} className="field">
          <option value="">Not sure yet / multiple</option>
          {disciplines.map((d) => (
            <option key={d.slug} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Leave this field empty</label>
        <input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={fieldId('message')} className="label mb-2 block text-ink-secondary">
          Project brief <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={5}
          required
          disabled={sending}
          className="field resize-y"
          placeholder="Facility type, location, project stage and timeline…"
        />
      </div>

      {engaged && (
        <div className="min-h-[78px] origin-left max-[380px]:scale-[0.88]">
          <Suspense fallback={<p className="label pt-6">Loading verification…</p>}>
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} theme="dark" />
          </Suspense>
        </div>
      )}

      <div aria-live="polite">
        {status && (
          <p
            className={`border p-3 font-mono text-xs ${
              status.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                : 'border-red-500/30 bg-red-950/20 text-red-300'
            }`}
          >
            {status.text}
          </p>
        )}
      </div>

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
        {sending ? 'Sending…' : 'Send project brief'}
      </button>
      <p className="text-[12px] text-ink-muted">
        Prefer email? Write to{' '}
        <a href={`mailto:${SITE.email}`} className="text-ink-secondary underline decoration-white/20 underline-offset-4 hover:text-ink">
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
};

export default InquiryForm;
