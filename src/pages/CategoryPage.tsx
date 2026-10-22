import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from '../ui';
import { generateCategorySEO, injectSEO } from '../components/SEO';
import { getCategoryBySlug, getProductsByCategory } from '../data';

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || '');
  const products = category ? getProductsByCategory(category.id) : [];

  useEffect(() => {
    if (category) {
      injectSEO(generateCategorySEO(category));
    }
  }, [category]);

  if (!category) {
    return (
      <section className="section" aria-labelledby="category-heading">
        <Container>
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted">
              <li><Link to="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/collection" className="hover:text-text-secondary transition-colors">Collection</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-primary">Category Not Found</li>
            </ol>
          </nav>
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <h1 id="category-heading" className="font-heading text-display-md text-text-primary mb-4">
              Category Not Found
            </h1>
            <p className="font-body text-body text-text-secondary">
              The category "{categorySlug}" does not exist.
            </p>
            <Button variant="outline" asChild className="mt-6">
              <Link to="/collection">Browse All Categories</Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Render empty state
  if (products.length === 0) {
    return (
      <section className="section" aria-labelledby="category-heading">
        <Container>
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted">
              <li>
                <Link to="/" className="hover:text-text-secondary transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/collection" className="hover:text-text-secondary transition-colors">Collection</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-primary">
                {category.name}
              </li>
            </ol>
          </nav>

          <header className="mb-12 lg:mb-16">
            <h1 id="category-heading" className="font-heading text-display-lg text-text-primary mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-body text-body-lg text-text-secondary max-w-2xl">
                {category.description}
              </p>
            )}
          </header>

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
            <h2 className="font-heading text-heading-lg text-text-primary mb-2">
              No Products Published Yet
            </h2>
            <p className="font-body text-body text-text-secondary max-w-md mx-auto mb-6">
              Published products in this category will appear here as a gallery grid.
            </p>
            <p className="font-body text-caption text-text-muted">
              [PRODUCT_INVENTORY_AND_DESCRIPTIONS] — Actual product records pending
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Render product grid
  return (
    <section className="section" aria-labelledby="category-heading">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted">
            <li>
              <Link to="/" className="hover:text-text-secondary transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/collection" className="hover:text-text-secondary transition-colors">Collection</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-primary">
              {category.name}
            </li>
          </ol>
        </nav>

        <header className="mb-12 lg:mb-16">
          <h1 id="category-heading" className="font-heading text-display-lg text-text-primary mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="font-body text-body-lg text-text-secondary max-w-2xl">
              {category.description}
            </p>
          )}
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
                  <h2 className="font-heading text-heading-lg text-text-primary mb-2">
                    {product.title}
                  </h2>
                  <p className="font-body text-body-sm text-text-secondary line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}