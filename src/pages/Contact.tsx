import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Button } from '../ui';
import { generatePageSEO, injectSEO } from '../components/SEO';
import { SITE_SETTINGS } from '../data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ApiError {
  error: string;
  errors?: string[];
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  product: '',
  message: '',
};

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

export function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    product: searchParams.get('product') || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileWidgetRef = useRef<number | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectSEO(generatePageSEO('contact'));
  }, []);

  // Load Turnstile script
  useEffect(() => {
    if (TURNSTILE_SITE_KEY && !turnstileLoaded) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setTurnstileLoaded(true);
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [turnstileLoaded]);

  // Render Turnstile widget when container is ready
  useEffect(() => {
    if (turnstileLoaded && turnstileContainerRef.current && !turnstileWidgetRef.current && TURNSTILE_SITE_KEY) {
      // @ts-expect-error - turnstile is loaded globally
      turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
        theme: 'dark',
      });
    }
  }, [turnstileLoaded]);

  // Reset token when form resets
  const resetTurnstile = () => {
    if (turnstileWidgetRef.current !== null) {
      // @ts-expect-error - turnstile is loaded globally via script
      window.turnstile.reset(turnstileWidgetRef.current);
      turnstileWidgetRef.current = null;
      setTurnstileToken('');
      // Re-render
      if (turnstileContainerRef.current && TURNSTILE_SITE_KEY) {
        // @ts-expect-error - turnstile is loaded globally via script
        turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
          theme: 'dark',
        });
      }
    }
  };

  useEffect(() => {
    injectSEO(generatePageSEO('contact'));
  }, []);

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    if (data.message.length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Client-side Turnstile check
    if (!turnstileToken) {
      setErrorMessage('Please complete the Turnstile verification.');
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const apiError: ApiError = result;
        if (apiError.errors && apiError.errors.length > 0) {
          // Handle field-specific errors
          const fieldErrors: FormErrors = {};
          apiError.errors.forEach((err) => {
            if (err.includes('Name')) fieldErrors.name = err;
            else if (err.includes('Email')) fieldErrors.email = err;
            else if (err.includes('Message')) fieldErrors.message = err;
          });
          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
          } else {
            setErrorMessage(apiError.error || 'Validation failed');
          }
        } else if (apiError.error?.includes('Turnstile')) {
          setErrorMessage('Turnstile verification failed. Please try again.');
          resetTurnstile();
        } else if (apiError.error?.includes('product reference')) {
          setErrorMessage('Invalid product reference.');
        } else if (apiError.error?.includes('Too many requests')) {
          setErrorMessage('Too many requests. Please try again later.');
        } else {
          setErrorMessage(apiError.error || 'Failed to send inquiry. Please try again.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData(initialFormData);
      setTurnstileToken('');
      resetTurnstile();
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send inquiry. Please try again or contact us directly.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="section" aria-labelledby="contact-heading">
      <Container size="lg">
        <header className="text-center mb-12 lg:mb-16">
          <h1 id="contact-heading" className="font-heading text-display-lg text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
            Have a question about a piece? Want to visit our store? We&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <article>
            <h2 className="font-heading text-heading-lg text-text-primary mb-6">Send an Inquiry</h2>

            {status === 'success' && (
              <div
                className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg text-text-primary font-body text-body"
                role="alert"
              >
                Thank you for your inquiry! We&apos;ll respond within 1–2 business days.
              </div>
            )}

            {status === 'error' && (
              <div
                className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 font-body text-body"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block font-body text-body-sm text-text-secondary mb-2">
                  Name <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg font-body text-body text-text-primary placeholder-text-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    errors.name ? 'border-red-500' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Your name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={status === 'submitting'}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 font-body text-body-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-body text-body-sm text-text-secondary mb-2">
                  Email <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg font-body text-body text-text-primary placeholder-text-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    errors.email ? 'border-red-500' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="your@email.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={status === 'submitting'}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 font-body text-body-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block font-body text-body-sm text-text-secondary mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus hover:border-primary/50"
                  placeholder="+977 XX XXXXXXX"
                  disabled={status === 'submitting'}
                />
              </div>

              {formData.product && (
                <div>
                  <p className="font-body text-body-sm text-text-secondary mb-2">
                    Product Reference
                  </p>
                  <div className="w-full px-4 py-3 bg-surface border border-border rounded-lg font-body text-body text-text-primary">
                    {formData.product}
                  </div>
                  <input type="hidden" name="product" value={formData.product} />
                </div>
              )}

              <div>
                <label htmlFor="message" className="block font-body text-body-sm text-text-secondary mb-2">
                  Message <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-background border rounded-lg font-body text-body text-text-primary placeholder-text-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y min-h-[120px] ${
                    errors.message ? 'border-red-500' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Tell us about your inquiry..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  disabled={status === 'submitting'}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 font-body text-body-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Turnstile Widget */}
              <div className="pt-2" aria-hidden="true">
                <div ref={turnstileContainerRef} className="bg-surface border border-border rounded-lg p-4">
                  {!TURNSTILE_SITE_KEY && (
                    <p className="font-body text-body-sm text-text-muted text-center">
                      Turnstile site key not configured. Set VITE_TURNSTILE_SITE_KEY in environment.
                    </p>
                  )}
                  {!turnstileLoaded && TURNSTILE_SITE_KEY && (
                    <p className="font-body text-body-sm text-text-muted text-center">
                      Loading Turnstile verification...
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" size="lg" fullWidth loading={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </article>

          {/* Contact Information */}
          <aside className="space-y-8">
            <div>
              <h2 className="font-heading text-heading-lg text-text-primary mb-6">Visit Our Store</h2>
              <address className="not-italic font-body text-body text-text-secondary space-y-4">
                <div>
                  <p className="font-heading text-heading-md text-text-primary">Norbu Buddhist Handicraft</p>
                  <a
                    href={SITE_SETTINGS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                  >
                    {SITE_SETTINGS.address}
                  </a>
                </div>
                <div>
                  <p className="font-heading text-heading-md text-text-primary">Opening Hours</p>
                  <p>{SITE_SETTINGS.openingHours}</p>
                </div>
              </address>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="font-heading text-heading-lg text-text-primary mb-6">Other Ways to Reach Us</h2>
              <ul className="space-y-4 font-body text-body">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-body-sm">Email</p>
                    <a
                      href={`mailto:${SITE_SETTINGS.contactEmail}`}
                      className="text-text-secondary hover:text-primary transition-colors duration-fast"
                    >
                      {SITE_SETTINGS.contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-body-sm">Phone</p>
                    <a
                      href={`tel:${SITE_SETTINGS.phone}`}
                      className="text-text-secondary hover:text-primary transition-colors duration-fast"
                    >
                      {SITE_SETTINGS.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67m-13.472-12.019c0-7.418 6.022-13.438 13.438-13.438 7.418 0 13.438 6.02 13.438 13.438 0 5.572-3.483 10.336-8.32 12.154-.474.18-1.125.058-1.494-.226-.37-.285-.75-.742-1.141-1.282-.38-.524-1.055-2.203-1.296-2.485-.24-.273-.53-.377-.85-.377h-.086c-.516 0-1.826.202-2.746.83-.918.624-1.627 1.436-2.01 1.884-.383.448-.78.898-1.2.898-.148 0-.224-.064-.507-.347-.297-.283-.733-1.002-.922-1.233-.189-.232-.318-.32-.43-.354-.113-.034-.24-.034-.487.017-.248.05-.63.23-1.148.438-.518.208-1.075.42-1.522.42-.475 0-.977-.233-1.358-.57-.383-.337-.837-.807-1.13-1.015-.382-.268-.632-.416-.95-.512-.318-.096-.634-.135-.95-.135-.318 0-.724.086-1.024.248-.3.162-.612.39-.876.54-.264.15-.532.273-.94.273-.475 0-1.04-.223-1.494-.573-.453-.35-1.027-.973-1.027-2.088v-.07c0-.52.202-1.016.57-1.368.37-.35.922-.733 1.32-1.03.398-.297.796-.548 1.2-.798.403-.25.855-.375 1.3-.375.33 0 .69.113 1.024.318.33.202.586.47 1.058.798l.017.034c.475.317 1.076.83 1.342 1.148.266.318.475.669.612.94.149.273.198.573.198.94v.124c0 .574-.318 1.04-.94 1.04-.475 0-.978-.298-1.358-.824-.38-.525-.77-1.272-.92-1.63-.15-.354-.27-.732-.27-1.148 0-.448.134-.897.388-1.233.255-.336.607-.608 1.024-.83.418-.223.898-.375 1.3-.375.57 0 1.076.199 1.45.598.374.398.68 1.04.877 1.46.197.42.296.897.296 1.46 0 .744-.272 1.323-.798 1.824-.524.502-1.204.772-1.954.94-.474.167-1.016.167-1.503.017zm-8.528 17.857c-2.485 0-4.536-1.504-5.25-3.59.654-2.07 3.178-3.75 5.25-3.75 2.084 0 4.607 1.68 5.25 3.75-.714 2.086-2.765 3.59-5.25 3.59z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-body-sm">WhatsApp</p>
                    <a
                      href={`https://wa.me/${SITE_SETTINGS.whatsappE164}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors duration-fast"
                    >
                      {SITE_SETTINGS.whatsappE164}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="font-heading text-heading-lg text-text-primary mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href={SITE_SETTINGS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={SITE_SETTINGS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}