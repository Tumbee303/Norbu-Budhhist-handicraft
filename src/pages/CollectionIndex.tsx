import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui';
import { generatePageSEO, injectSEO } from '../components/SEO';
import { VISIBLE_CATEGORIES, getFeaturedProducts } from '../data';

export function CollectionIndex() {
  const featuredProducts = getFeaturedProducts(6);

  useEffect(() => {
    injectSEO(generatePageSEO('collection'));
  }, []);

  return (
    <section className="section" aria-labelledby="collection-heading">
      <Container>
        <header className="text-center mb-12 lg:mb-16">
          <h1 id="collection-heading" className="font-heading text-display-lg text-text-primary mb-4">
            Our Collections
          </h1>
          <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
            Five distinct categories of Buddhist art and handicrafts. Each piece is selected for its quality, authenticity, and ability to bring meaning to your space.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {VISIBLE_CATEGORIES.map((category) => (
            <article
              key={category.slug}
              className="group bg-background border border-border rounded-xl overflow-hidden transition-all duration-normal hover:border-primary/50 hover:shadow-elevated"
            >
              <Link
                to={`/collection/${category.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg
                        className="mx-auto w-16 h-16 text-text-muted mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-body text-body-sm text-text-muted">
                        {category.imagePlaceholder}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-heading-lg text-text-primary mb-2 group-hover:text-primary transition-colors duration-fast">
                    {category.name}
                  </h2>
                  <p className="font-body text-body-sm text-text-secondary mb-4">
                    {category.description}
                  </p>
                  <span className="font-body text-caption text-primary tracking-wide uppercase">
                    View Collection →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Featured Products */}
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="font-heading text-display-md text-text-primary mb-8 text-center">
            Featured Pieces
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-background border border-border rounded-xl overflow-hidden transition-all duration-normal hover:border-primary/50 hover:shadow-elevated"
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <svg
                            className="mx-auto w-16 h-16 text-text-muted mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="font-body text-body-sm text-text-muted">
                            {product.images[0]?.placeholder || '[PRODUCT_IMAGE]'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="font-body text-caption text-primary tracking-widest uppercase block mb-2">
                        {VISIBLE_CATEGORIES.find(c => c.id === product.categoryId)?.name || 'Collection'}
                      </span>
                      <h3 className="font-heading text-heading-lg text-text-primary mb-2">
                        {product.title}
                      </h3>
                      <p className="font-body text-body-sm text-text-secondary line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <svg
                className="mx-auto w-16 h-16 text-text-muted mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="font-heading text-heading-lg text-text-primary mb-2">
                No Featured Products Yet
              </h3>
              <p className="font-body text-body text-text-secondary max-w-md mx-auto mb-6">
                Products marked as "featured" in the admin dashboard will appear here once published.
              </p>
              <p className="font-body text-caption text-text-muted">
                [PRODUCT_INVENTORY_AND_DESCRIPTIONS] — Actual product records pending
              </p>
            </div>
          )}
        </section>
      </Container>
    </section>
  );
}