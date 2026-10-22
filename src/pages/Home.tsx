import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '../ui';
import { generatePageSEO, injectSEO } from '../components/SEO';
import { VISIBLE_CATEGORIES, getFeaturedProducts } from '../data';

export function Home() {
  const featuredProducts = getFeaturedProducts(6);

  useEffect(() => {
    injectSEO(generatePageSEO('home'));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-background/60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in">
              <p className="font-body text-caption text-primary tracking-widest uppercase mb-4 animate-slide-up">
                Traditional Art. Timeless Elegance.
              </p>
              <h1
                id="hero-heading"
                className="font-heading text-display-xl sm:text-display-lg text-text-primary leading-tight mb-6 animate-slide-up"
                style={{ animationDelay: '100ms' }}
              >
                Discover Buddhist Art & Handicrafts from Nepal
              </h1>
              <p className="font-body text-body-lg text-text-secondary max-w-xl mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                Thangka paintings, Buddha statues, singing bowls, prayer wheels, and Mandala art — handcrafted pieces that bring meaning to every space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <Button size="lg" asChild>
                  <Link to="/collection">Explore Our Collection</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/our-story">Our Story</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative aspect-[4/5] lg:aspect-square bg-surface rounded-xl overflow-hidden border border-border animate-fade-in" style={{ animationDelay: '400ms' }}>
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
                    [HERO_BUDDHA_STATUE_PHOTO]
                  </p>
                  <p className="font-body text-caption text-text-muted mt-2">
                    Placeholder — replace with actual inventory photo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="section bg-surface" aria-labelledby="categories-heading">
        <Container>
          <header className="text-center mb-12 lg:mb-16">
            <h2 id="categories-heading" className="font-heading text-display-md text-text-primary mb-4">
              Our Collections
            </h2>
            <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
              Five distinct categories of Buddhist art and handicrafts, each with its own tradition and purpose.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                    <h3 className="font-heading text-heading-lg text-text-primary mb-2 group-hover:text-primary transition-colors duration-fast">
                      {category.name}
                    </h3>
                    <p className="font-body text-body-sm text-text-secondary">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/collection">View All Collections</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section" aria-labelledby="featured-heading">
          <Container>
            <header className="text-center mb-12 lg:mb-16">
              <h2 id="featured-heading" className="font-heading text-display-md text-text-primary mb-4">
                Featured Pieces
              </h2>
              <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
                A selection of highlighted pieces from our collections.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span className="font-body text-caption text-primary tracking-widest uppercase mb-2 block">
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

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/collection">View All Collections</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Founder Story Preview */}
      <section className="section" aria-labelledby="story-heading">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-body text-caption text-primary tracking-widest uppercase mb-3">Our Story</p>
              <h2 id="story-heading" className="font-heading text-display-md text-text-primary mb-6">
                Founded on a Simple Belief
              </h2>
              <div className="space-y-4 text-text-secondary font-body text-body">
                <p>
                  Norbu Buddhist Handicraft is a Nepal-based store founded by Lobsang Norbu with a vision to share the beauty of Buddhist art and traditional handicrafts with people around the world.
                </p>
                <p>
                  Our journey began with a simple belief: even the smallest piece of art can transform a room, bringing beauty, character, and a sense of meaning to the space around it.
                </p>
              </div>
              <Button variant="outline" asChild className="mt-6">
                <Link to="/our-story">Read Our Full Story</Link>
              </Button>
            </div>
            <div className="relative aspect-[4/5] bg-surface rounded-xl overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg
                    className="mx-auto w-20 h-20 text-text-muted mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="font-body text-body-sm text-text-muted">[FOUNDER_PHOTO]</p>
                  <p className="font-body text-caption text-text-muted mt-2">Placeholder — optional founder portrait</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section bg-surface" aria-labelledby="values-heading">
        <Container>
          <header className="text-center mb-12 lg:mb-16">
            <h2 id="values-heading" className="font-heading text-display-md text-text-primary mb-4">
              What Guides Us
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentic Transparency',
                description: 'We provide clear, verified information about materials and origins for each piece — never blanket claims.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
              {
                title: 'Curated Variety',
                description: 'Five distinct collections spanning paintings, statues, sound, and sacred geometry — something for every seeker.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a.003.003 0 01-.003.003"
                  />
                ),
              },
              {
                title: 'Art That Transforms',
                description: 'Even the smallest piece can become the focal point of a room, bringing beauty and meaning to your space.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                ),
              },
            ].map((value, index) => (
              <article
                key={value.title}
                className="text-center p-6 bg-background border border-border rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="font-heading text-heading-lg text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-body text-text-secondary">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit / Contact CTA */}
      <section className="section" aria-labelledby="visit-heading">
        <Container size="lg">
          <div className="bg-surface border border-border rounded-2xl p-8 lg:p-12 text-center">
            <h2 id="visit-heading" className="font-heading text-display-md text-text-primary mb-4">
              Visit Our Store in Nepal
            </h2>
            <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Experience the art in person. Our shop welcomes visitors seeking authentic Buddhist handicrafts in a peaceful setting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Get Directions & Hours</Link>
              </Button>
              <a
                href="https://wa.me/[WHATSAPP_E164]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-body font-body font-medium text-primary border-2 border-primary rounded-md hover:bg-primary/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67m-13.472-12.019c0-7.418 6.022-13.438 13.438-13.438 7.418 0 13.438 6.02 13.438 13.438 0 5.572-3.483 10.336-8.32 12.154-.474.18-1.125.058-1.494-.226-.37-.285-.75-.742-1.141-1.282-.38-.524-1.055-2.203-1.296-2.485-.24-.273-.53-.377-.85-.377h-.086c-.516 0-1.826.202-2.746.83-.918.624-1.627 1.436-2.01 1.884-.383.448-.78.898-1.2.898-.148 0-.224-.064-.507-.347-.297-.283-.733-1.002-.922-1.233-.189-.232-.318-.32-.43-.354-.113-.034-.24-.034-.487.017-.248.05-.63.23-1.148.438-.518.208-1.075.42-1.522.42-.475 0-.977-.233-1.358-.57-.383-.337-.837-.807-1.13-1.015-.382-.268-.632-.416-.95-.512-.318-.096-.634-.135-.95-.135-.318 0-.724.086-1.024.248-.3.162-.612.39-.876.54-.264.15-.532.273-.94.273-.475 0-1.04-.223-1.494-.573-.453-.35-1.027-.973-1.027-2.088v-.07c0-.52.202-1.016.57-1.368.37-.35.922-.733 1.32-1.03.398-.297.796-.548 1.2-.798.403-.25.855-.375 1.3-.375.33 0 .69.113 1.024.318.33.202.586.47 1.058.798l.017.034c.475.317 1.076.83 1.342 1.148.266.318.475.669.612.94.149.273.198.573.198.94v.124c0 .574-.318 1.04-.94 1.04-.475 0-.978-.298-1.358-.824-.38-.525-.77-1.272-.92-1.63-.15-.354-.27-.732-.27-1.148 0-.448.134-.897.388-1.233.255-.336.607-.608 1.024-.83.418-.223.898-.375 1.3-.375.57 0 1.076.199 1.45.598.374.398.68 1.04.877 1.46.197.42.296.897.296 1.46 0 .744-.272 1.323-.798 1.824-.524.502-1.204.772-1.954.94-.474.167-1.016.167-1.503.017zm-8.528 17.857c-2.485 0-4.536-1.504-5.25-3.59.654-2.07 3.178-3.75 5.25-3.75 2.084 0 4.607 1.68 5.25 3.75-.714 2.086-2.765 3.59-5.25 3.59z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}