import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from '../ui';
import { generateProductSEO, injectSEO } from '../components/SEO';
import { getProductBySlug, getCategoryById } from '../data';

export function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = getProductBySlug(productSlug || '');
  const category = product ? getCategoryById(product.categoryId) : null;

  useEffect(() => {
    if (product && category) {
      injectSEO(generateProductSEO(product, category));
      // Structured data would be injected here in a real implementation
    }
  }, [product, category]);

  if (!product || !category) {
    return (
      <section className="section" aria-labelledby="product-name">
        <Container>
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted">
              <li><Link to="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/collection" className="hover:text-text-secondary transition-colors">Collection</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-primary">Product Not Found</li>
            </ol>
          </nav>
          <div className="bg-surface border border-border rounded-xl p-12 text-center">
            <h1 id="product-name" className="font-heading text-display-md text-text-primary mb-4">
              Product Not Found
            </h1>
            <p className="font-body text-body text-text-secondary">
              The product "{productSlug}" does not exist or is not published.
            </p>
            <Button variant="outline" asChild className="mt-6">
              <Link to="/collection">Browse All Products</Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="section" aria-labelledby="product-name">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted flex-wrap">
            <li>
              <Link to="/" className="hover:text-text-secondary transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/collection" className="hover:text-text-secondary transition-colors">Collection</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to={`/collection/${category.slug}`}
                className="hover:text-text-secondary transition-colors"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-primary">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-surface rounded-xl overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg
                    className="mx-auto w-24 h-24 text-text-muted mb-4"
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
                    {product.images[0]?.placeholder || '[PRODUCT_MAIN_IMAGE]'}
                  </p>
                  <p className="font-body text-caption text-text-muted mt-2">
                    Placeholder — replace with actual product photo
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3" aria-label="Product thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`relative aspect-square bg-surface rounded-lg border overflow-hidden transition-all duration-fast ${
                      index === 0 ? 'border-primary' : 'border-border hover:border-primary/50'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === 0 ? 'true' : 'false'}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-text-muted"
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
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="font-body text-caption text-primary tracking-widest uppercase">
                {category.name}
              </span>
              <h1 id="product-name" className="font-heading text-display-md text-text-primary mt-2 mb-4">
                {product.title}
              </h1>
            </div>

            <div className="prose prose-invert max-w-none font-body text-body text-text-secondary leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Verified Details */}
            {(product.materials || product.origin || product.dimensions || product.artist || product.careNotes) && (
              <div className="border-t border-border pt-6 space-y-4">
                <h2 className="font-heading text-heading-md text-text-primary">Verified Details</h2>
                <dl className="space-y-3 font-body text-body">
                  {product.materials && (
                    <div>
                      <dt className="text-text-muted text-body-sm">Materials</dt>
                      <dd className="text-text-secondary">{product.materials}</dd>
                    </div>
                  )}
                  {product.origin && (
                    <div>
                      <dt className="text-text-muted text-body-sm">Origin</dt>
                      <dd className="text-text-secondary">{product.origin}</dd>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <dt className="text-text-muted text-body-sm">Dimensions</dt>
                      <dd className="text-text-secondary">{product.dimensions}</dd>
                    </div>
                  )}
                  {product.artist && (
                    <div>
                      <dt className="text-text-muted text-body-sm">Artist</dt>
                      <dd className="text-text-secondary">{product.artist}</dd>
                    </div>
                  )}
                  {product.careNotes && (
                    <div>
                      <dt className="text-text-muted text-body-sm">Care Information</dt>
                      <dd className="text-text-secondary">{product.careNotes}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Inquiry Action */}
            <div className="border-t border-border pt-6 space-y-4">
              <p className="font-body text-body text-text-secondary">
                Interested in this piece? We&apos;d be happy to provide more information or arrange a viewing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to={`/contact?product=${product.slug}`}>Inquire About This Piece</Link>
                </Button>
                <a
                  href={`https://wa.me/[WHATSAPP_E164]?text=I'm%20interested%20in%20${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-body font-body font-medium text-primary border-2 border-primary rounded-md hover:bg-primary/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67m-13.472-12.019c0-7.418 6.022-13.438 13.438-13.438 7.418 0 13.438 6.02 13.438 13.438 0 5.572-3.483 10.336-8.32 12.154-.474.18-1.125.058-1.494-.226-.37-.285-.75-.742-1.141-1.282-.38-.524-1.055-2.203-1.296-2.485-.24-.273-.53-.377-.85-.377h-.086c-.516 0-1.826.202-2.746.83-.918.624-1.627 1.436-2.01 1.884-.383.448-.78.898-1.2.898-.148 0-.224-.064-.507-.347-.297-.283-.733-1.002-.922-1.233-.189-.232-.318-.32-.43-.354-.113-.034-.24-.034-.487.017-.248.05-.63.23-1.148.438-.518.208-1.075.42-1.522.42-.475 0-.977-.233-1.358-.57-.383-.337-.837-.807-1.13-1.015-.382-.268-.632-.416-.95-.512-.318-.096-.634-.135-.95-.135-.318 0-.724.086-1.024.248-.3.162-.612.39-.876.54-.264.15-.532.273-.94.273-.475 0-1.04-.223-1.494-.573-.453-.35-1.027-.973-1.027-2.088v-.07c0-.52.202-1.016.57-1.368.37-.35.922-.733 1.32-1.03.398-.297.796-.548 1.2-.798.403-.25.855-.375 1.3-.375.33 0 .69.113 1.024.318.33.202.586.47 1.058.798l.017.034c.475.317 1.076.83 1.342 1.148.266.318.475.669.612.94.149.273.198.573.198.94v.124c0 .574-.318 1.04-.94 1.04-.475 0-.978-.298-1.358-.824-.38-.525-.77-1.272-.92-1.63-.15-.354-.27-.732-.27-1.148 0-.448.134-.897.388-1.233.255-.336.607-.608 1.024-.83.418-.223.898-.375 1.3-.375.57 0 1.076.199 1.45.598.374.398.68 1.04.877 1.46.197.42.296.897.296 1.46 0 .744-.272 1.323-.798 1.824-.524.502-1.204.772-1.954.94-.474.167-1.016.167-1.503.017zm-8.528 17.857c-2.485 0-4.536-1.504-5.25-3.59.654-2.07 3.178-3.75 5.25-3.75 2.084 0 4.607 1.68 5.25 3.75-.714 2.086-2.765 3.59-5.25 3.59z" />
                  </svg>
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Development Note */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-xl">
          <h2 className="font-heading text-heading-md text-text-primary mb-3">Development Note</h2>
          <p className="font-body text-body-sm text-text-secondary">
            This product page uses mock data from the data layer. Real product data, images, and verified details will be populated from Supabase
            once the admin dashboard and database are connected (Milestones 4–5).
          </p>
        </div>
      </Container>
    </section>
  );
}