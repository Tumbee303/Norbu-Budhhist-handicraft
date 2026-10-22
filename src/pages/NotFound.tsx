import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../ui';
import { injectSEO } from '../components/SEO';

export function NotFound() {
  useEffect(() => {
    injectSEO({
      title: 'Page Not Found | Norbu Buddhist Handicraft',
      description: 'Sorry, we couldn\'t find the page you\'re looking for.',
      noIndex: true,
    });
  }, []);

  return (
    <section className="min-h-[60vh] flex items-center justify-center" aria-labelledby="not-found-heading">
      <Container className="text-center">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 id="not-found-heading" className="font-heading text-display-lg text-text-primary">
            Page Not Found
          </h1>
          <p className="font-body text-body-lg text-text-secondary max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/collection">Browse Collections</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}