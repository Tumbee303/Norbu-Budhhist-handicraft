import { useEffect } from 'react';
import { Container } from '../ui';
import { generatePageSEO, injectSEO } from '../components/SEO';

export function OurStory() {
  useEffect(() => {
    injectSEO(generatePageSEO('our-story'));
  }, []);

  return (
    <section className="section" aria-labelledby="story-heading">
      <Container size="lg">
        <header className="text-center mb-12 lg:mb-16">
          <h1 id="story-heading" className="font-heading text-display-lg text-text-primary mb-6">
            Our Story
          </h1>
          <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
            The journey of Norbu Buddhist Handicraft, from a simple vision to a curated collection.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Founder Content */}
          <article className="space-y-8">
            <div className="space-y-6 font-body text-body text-text-secondary leading-relaxed">
              <p>
                <strong>Norbu Buddhist Handicraft</strong> is a Nepal-based store founded by <strong>Lobsang Norbu</strong> with a vision to share the beauty of Buddhist art and traditional handicrafts with people around the world.
              </p>
              <p>
                Our journey began with a simple belief: even the smallest piece of art can transform a room, bringing beauty, character, and a sense of meaning to the space around it.
              </p>
              <p>
                At Norbu, we offer a diverse collection of Buddhist art and handicrafts, including traditional Thangka paintings, Buddha statues, singing bowls, prayer wheels, and Mandala art. Our collection brings together a variety of artistic styles and objects for people who appreciate traditional craftsmanship and elegant design.
              </p>
              <p>
                <strong>Authenticity matters to us.</strong> We believe customers should be able to understand the pieces they choose, which is why we aim to provide clear information about the materials and origins of individual products.
              </p>
              <p>
                Our approach combines a varied collection with an appreciation for traditional art and a refined presentation. Whether someone is discovering Buddhist art for the first time or looking for a distinctive piece for their space, our goal is to help them explore our collection with confidence.
              </p>
              <p>
                At Norbu Buddhist Handicraft, we believe that great art is not defined by its size. Sometimes, the smallest details leave the greatest impression.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="font-heading text-heading-lg text-text-primary mb-4">Our Commitment</h2>
              <ul className="space-y-3 font-body text-body text-text-secondary">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verified information on materials and origins for each piece
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No blanket claims — transparency over certification
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Curated variety across five distinct collections
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Respectful presentation of sacred traditions
                </li>
              </ul>
            </div>
          </article>

          {/* Founder Image Placeholder */}
          <aside>
            <div className="relative aspect-[3/4] bg-surface rounded-xl overflow-hidden border border-border sticky top-24">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="font-body text-body-sm text-text-muted">[FOUNDER_PHOTO]</p>
                  <p className="font-body text-caption text-text-muted mt-2">Lobsang Norbu — Founder</p>
                  <p className="font-body text-caption text-text-muted mt-1">Placeholder — optional with founder permission</p>
                </div>
              </div>
            </div>

            {/* Shop Images Placeholder */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="aspect-square bg-surface rounded-xl border border-border flex items-center justify-center">
                <p className="font-body text-body-sm text-text-muted">[SHOP_EXTERIOR]</p>
              </div>
              <div className="aspect-square bg-surface rounded-xl border border-border flex items-center justify-center">
                <p className="font-body text-body-sm text-text-muted">[SHOP_INTERIOR]</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Editorial Note */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-xl">
          <h2 className="font-heading text-heading-md text-text-primary mb-3">Editorial Note</h2>
          <p className="font-body text-body-sm text-text-secondary">
            This copy is approved for development. Before launch, confirm with Lobsang that the wording accurately represents the store,
            and replace 'traditional craftsmanship' references if they could be read as unverified manufacturing claims for any particular item.
          </p>
        </div>
      </Container>
    </section>
  );
}