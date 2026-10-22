import { useEffect } from 'react';
import { Container } from '../ui';
import { generatePageSEO, injectSEO } from '../components/SEO';

export function Privacy() {
  useEffect(() => {
    injectSEO(generatePageSEO('privacy'));
  }, []);

  return (
    <section className="section" aria-labelledby="privacy-heading">
      <Container size="lg">
        <header className="mb-12 lg:mb-16">
          <h1 id="privacy-heading" className="font-heading text-display-lg text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-body text-text-secondary">
            Last updated: [DATE] — This policy is a draft and requires legal review before publication.
          </p>
        </header>

        <article className="prose prose-invert max-w-none font-body text-body text-text-secondary leading-relaxed space-y-8">
          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">1. Information We Collect</h2>
            <p>
              We collect personal information only when you voluntarily submit it through our contact form or product inquiry form.
              This includes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Message content</li>
              <li>Product reference (if inquiry is about a specific piece)</li>
            </ul>
            <p>
              We do <strong>not</strong> collect payment information, create customer accounts, or use tracking cookies for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">2. How We Use Your Information</h2>
            <p>Your information is used solely to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Respond to your inquiry</li>
              <li>Provide product information you requested</li>
              <li>Arrange store visits or viewings</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">3. Data Storage & Retention</h2>
            <p>
              Inquiries are stored in a Supabase-hosted PostgreSQL database. Only the authorized store administrator can access inquiry data.
            </p>
            <p>
              Retention period: <strong>[CONTACT_RETENTION_PERIOD]</strong> — to be determined by the owner and added before launch.
            </p>
            <p>
              After the retention period expires, inquiries are permanently deleted. You may request deletion at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">4. Third-Party Services</h2>
            <p>We use the following services that may process limited data:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cloudflare Pages / Pages Functions</strong> — Hosting and form handling (processes form submissions)</li>
              <li><strong>Supabase</strong> — Database and authentication (stores inquiry records)</li>
              <li><strong>Cloudflare Turnstile</strong> — Spam protection (verifies form submissions are human)</li>
            </ul>
            <p>These providers process data on our behalf under data processing agreements. No data is sold to advertisers.</p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">5. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>[BUSINESS_EMAIL]</strong>.</p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">6. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>HTTPS encryption for all data in transit</li>
              <li>Row Level Security (RLS) policies in Supabase restricting data access</li>
              <li>Cloudflare Turnstile verification on forms to prevent automated abuse</li>
              <li>Rate limiting on form submissions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">7. International Transfers</h2>
            <p>
              Our services are hosted on Cloudflare and Supabase infrastructure, which may involve data processing in multiple countries.
              Both providers offer Standard Contractual Clauses and other transfer mechanisms compliant with GDPR and other regulations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The updated version will be posted on this page with a revised "Last updated" date.
              Material changes will be communicated via a notice on our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-heading-lg text-text-primary mb-4">9. Contact</h2>
            <p>
              Questions about this policy or your data? Contact us:
            </p>
            <address className="not-italic">
              <p>Norbu Buddhist Handicraft</p>
              <p>[STORE_STREET_ADDRESS], [CITY_NEPAL]</p>
              <p>Email: <a href="mailto:[BUSINESS_EMAIL]" className="text-primary hover:underline">[BUSINESS_EMAIL]</a></p>
            </address>
          </section>
        </article>

        {/* Development Note */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-xl">
          <h2 className="font-heading text-heading-md text-text-primary mb-3">⚠️ Development Notice</h2>
          <p className="font-body text-body-sm text-text-secondary">
            This is a <strong>draft placeholder</strong> privacy policy. Before launch, this document must be:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2 font-body text-body-sm text-text-secondary">
            <li>Reviewed by legal counsel for compliance with applicable laws (Nepal, GDPR if serving EU visitors, etc.)</li>
            <li>Updated with actual retention period ([CONTACT_RETENTION_PERIOD])</li>
            <li>Updated with verified business contact information</li>
            <li>Confirmed to accurately reflect actual data practices</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}