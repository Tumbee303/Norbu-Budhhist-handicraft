import { Container, Button, VisuallyHidden } from '../ui';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function DesignSystem() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main id="main-content" className="flex-grow pt-16 sm:pt-20 pb-16">
        <section className="section" aria-labelledby="ds-heading">
          <Container>
            <header className="mb-12 lg:mb-16">
              <h1 id="ds-heading" className="font-heading text-display-lg text-text-primary mb-4">
                Design System Showcase
              </h1>
              <p className="font-body text-body-lg text-text-secondary max-w-2xl">
                Visual reference for all design tokens, components, and states. For development verification only.
              </p>
              <p className="font-body text-body-sm text-text-muted mt-2">
                This page is not linked in production navigation.
              </p>
            </header>

            {/* Colors */}
            <section aria-labelledby="colors-heading" className="mb-16">
              <h2 id="colors-heading" className="font-heading text-display-md text-text-primary mb-8">
                Color Palette
              </h2>
              <div className="space-y-8">
                {[
                  { name: 'Obsidian', token: 'obsidian', hex: '#141311', usage: 'Main backgrounds', contrast: '—' },
                  { name: 'Deep Charcoal', token: 'deep-charcoal', hex: '#24211E', usage: 'Cards, sections', contrast: '—' },
                  { name: 'Antique Gold', token: 'antique-gold', hex: '#C5A36A', usage: 'Primary CTA, accents, focus', contrast: '6.2:1 on Obsidian ✅' },
                  { name: 'Warm Ivory', token: 'warm-ivory', hex: '#F2EBDD', usage: 'Headings, primary copy', contrast: '15.8:1 on Obsidian ✅' },
                  { name: 'Soft Stone', token: 'soft-stone', hex: '#B8B0A5', usage: 'Secondary copy', contrast: '5.1:1 on Obsidian ✅' },
                  { name: 'Muted Bronze', token: 'muted-bronze', hex: '#8D7150', usage: 'Subtle details (large text only)', contrast: '3.2:1 on Obsidian ⚠️' },
                ].map((color) => (
                  <div key={color.token} className="bg-surface border border-border rounded-xl p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                      <div className="relative aspect-square bg-[var(--tw-bg-opacity)] rounded-lg border border-border overflow-hidden" style={{ backgroundColor: color.hex }}>
                        <VisuallyHidden>{color.name} color swatch</VisuallyHidden>
                      </div>
                      <div className="lg:col-span-3 space-y-2">
                        <div className="flex flex-wrap items-center gap-4">
                          <h3 className="font-heading text-heading-lg text-text-primary">{color.name}</h3>
                          <code className="font-mono text-body-sm bg-background px-2 py-1 rounded">{color.hex}</code>
                          <code className="font-mono text-body-sm bg-background px-2 py-1 rounded">text-{color.token}</code>
                          <code className="font-mono text-body-sm bg-background px-2 py-1 rounded">bg-{color.token}</code>
                          <code className="font-mono text-body-sm bg-background px-2 py-1 rounded">border-{color.token}</code>
                        </div>
                        <p className="font-body text-body text-text-secondary">{color.usage}</p>
                        <p className="font-body text-body-sm text-text-muted">Contrast: {color.contrast}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section aria-labelledby="typography-heading" className="mb-16">
              <h2 id="typography-heading" className="font-heading text-display-md text-text-primary mb-8">
                Typography
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
                {[
                  { class: 'text-display-xl', label: 'Display XL — 4.5rem', family: 'heading' },
                  { class: 'text-display-lg', label: 'Display LG — 3.5rem', family: 'heading' },
                  { class: 'text-display-md', label: 'Display MD — 2.5rem', family: 'heading' },
                  { class: 'text-display-sm', label: 'Display SM — 2rem', family: 'heading' },
                  { class: 'text-heading-xl', label: 'Heading XL — 1.5rem', family: 'heading' },
                  { class: 'text-heading-lg', label: 'Heading LG — 1.25rem', family: 'heading' },
                  { class: 'text-heading-md', label: 'Heading MD — 1.125rem', family: 'heading' },
                  { class: 'text-body-lg', label: 'Body LG — 1.125rem', family: 'body' },
                  { class: 'text-body', label: 'Body — 1rem', family: 'body' },
                  { class: 'text-body-sm', label: 'Body SM — 0.875rem', family: 'body' },
                  { class: 'text-caption', label: 'Caption — 0.75rem', family: 'body' },
                ].map((item) => (
                  <div key={item.class} className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`font-${item.family} ${item.class} text-text-primary min-w-[200px]`}>
                      The quick brown fox jumps over the lazy dog.
                    </div>
                    <code className="font-mono text-body-sm bg-background px-3 py-1 rounded text-text-secondary">{item.class}</code>
                    <span className="font-body text-body-sm text-text-muted">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Spacing */}
            <section aria-labelledby="spacing-heading" className="mb-16">
              <h2 id="spacing-heading" className="font-heading text-display-md text-text-primary mb-8">
                Spacing Scale
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                {[
                  'space-0', 'space-1', 'space-2', 'space-3', 'space-4',
                  'space-5', 'space-6', 'space-8', 'space-10', 'space-12',
                  'space-16', 'space-20', 'space-24',
                ].map((space) => (
                  <div key={space} className="flex items-center gap-4">
                    <code className="font-mono text-body-sm bg-background px-3 py-1 rounded text-text-secondary min-w-[80px]">{space}</code>
                    <div className="flex-1 h-2 bg-primary/20 rounded-full" />
                  </div>
                ))}
              </div>
            </section>

            {/* Buttons */}
            <section aria-labelledby="buttons-heading" className="mb-16">
              <h2 id="buttons-heading" className="font-heading text-display-md text-text-primary mb-8">
                Buttons
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-8">
                {/* Variants */}
                <div>
                  <h3 className="font-heading text-heading-lg text-text-primary mb-4">Variants (Medium)</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="md">Primary</Button>
                    <Button variant="secondary" size="md">Secondary</Button>
                    <Button variant="ghost" size="md">Ghost</Button>
                    <Button variant="outline" size="md">Outline</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-heading text-heading-lg text-text-primary mb-4">Sizes (Primary)</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h3 className="font-heading text-heading-lg text-text-primary mb-4">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="md">Default</Button>
                    <Button variant="primary" size="md" disabled>Disabled</Button>
                    <Button variant="primary" size="md" loading>Loading</Button>
                  </div>
                </div>

                {/* asChild */}
                <div>
                  <h3 className="font-heading text-heading-lg text-text-primary mb-4">asChild Pattern</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="md" asChild>
                      <a href="#link" className="text-body">Link as Button</a>
                    </Button>
                    <Button variant="ghost" size="md" asChild>
                      <a href="#link" className="text-body">Ghost Link</a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Form Elements */}
            <section aria-labelledby="forms-heading" className="mb-16">
              <h2 id="forms-heading" className="font-heading text-display-md text-text-primary mb-8">
                Form Elements
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-6 max-w-md">
                <div>
                  <label htmlFor="ds-input" className="block font-body text-body-sm text-text-secondary mb-2">Text Input</label>
                  <input
                    id="ds-input"
                    type="text"
                    placeholder="Enter text..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  />
                </div>
                <div>
                  <label htmlFor="ds-email" className="block font-body text-body-sm text-text-secondary mb-2">Email Input</label>
                  <input
                    id="ds-email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  />
                </div>
                <div>
                  <label htmlFor="ds-textarea" className="block font-body text-body-sm text-text-secondary mb-2">Textarea</label>
                  <textarea
                    id="ds-textarea"
                    rows={4}
                    placeholder="Enter message..."
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
                  />
                </div>
                <div>
                  <label htmlFor="ds-select" className="block font-body text-body-sm text-text-secondary mb-2">Select</label>
                  <select
                    id="ds-select"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
                <fieldset>
                  <legend className="font-body text-body-sm text-text-secondary mb-2">Radio Group</legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 font-body text-body text-text-primary cursor-pointer">
                      <input type="radio" name="ds-radio" className="w-4 h-4 accent-primary" />
                      Option A
                    </label>
                    <label className="inline-flex items-center gap-2 font-body text-body text-text-primary cursor-pointer">
                      <input type="radio" name="ds-radio" className="w-4 h-4 accent-primary" />
                      Option B
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="font-body text-body-sm text-text-secondary mb-2">Checkbox</legend>
                  <label className="inline-flex items-center gap-2 font-body text-body text-text-primary cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary rounded border-border" />
                    I agree to the terms
                  </label>
                </fieldset>
                <div>
                  <label htmlFor="ds-error-input" className="block font-body text-body-sm text-text-secondary mb-2">Error State</label>
                  <input
                    id="ds-error-input"
                    type="text"
                    placeholder="This field has an error"
                    className="w-full px-4 py-3 bg-background border border-red-500 rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-invalid="true"
                    aria-describedby="ds-error"
                  />
                  <p id="ds-error" className="mt-1 font-body text-body-sm text-red-400" role="alert">Error message here</p>
                </div>
              </div>
            </section>

            {/* Cards */}
            <section aria-labelledby="cards-heading" className="mb-16">
              <h2 id="cards-heading" className="font-heading text-display-md text-text-primary mb-8">
                Cards
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <article className="bg-background border border-border rounded-xl overflow-hidden transition-all duration-normal hover:border-primary/50 hover:shadow-elevated">
                  <div className="aspect-[3/4] bg-surface flex items-center justify-center">
                    <VisuallyHidden>Card image placeholder</VisuallyHidden>
                    <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <span className="font-body text-caption text-primary tracking-widest uppercase">Category</span>
                    <h3 className="font-heading text-heading-lg text-text-primary mt-2 mb-2">Card Title</h3>
                    <p className="font-body text-body text-text-secondary">Card description goes here. It can span multiple lines.</p>
                  </div>
                </article>

                <article className="bg-background border border-border rounded-xl p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-heading-lg text-text-primary mb-2">Feature Card</h3>
                  <p className="font-body text-body text-text-secondary">Feature cards use icon + title + description pattern.</p>
                </article>

                <article className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-heading text-heading-lg text-text-primary mb-2">Surface Card</h3>
                  <p className="font-body text-body text-text-secondary mb-4">Elevated surface for highlighted content.</p>
                  <Button variant="outline" size="sm">Action</Button>
                </article>
              </div>
            </section>

            {/* Alerts & Notifications */}
            <section aria-labelledby="alerts-heading" className="mb-16">
              <h2 id="alerts-heading" className="font-heading text-display-md text-text-primary mb-8">
                Alerts & Notifications
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-text-primary font-body text-body" role="alert">
                  Success: Your changes have been saved.
                </div>
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 font-body text-body" role="alert">
                  Error: Something went wrong. Please try again.
                </div>
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-yellow-300 font-body text-body" role="alert">
                  Warning: This action cannot be undone.
                </div>
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-300 font-body text-body" role="alert">
                  Info: New features are available.
                </div>
              </div>
            </section>

            {/* Badges */}
            <section aria-labelledby="badges-heading" className="mb-16">
              <h2 id="badges-heading" className="font-heading text-display-md text-text-primary mb-8">
                Badges / Status
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium bg-primary/10 text-primary">Published</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium bg-blue-500/10 text-blue-400">Draft</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium bg-green-500/10 text-green-400">Featured</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium bg-text-muted/10 text-text-muted">Archived</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium bg-red-500/10 text-red-400">New</span>
                </div>
              </div>
            </section>

            {/* Focus States */}
            <section aria-labelledby="focus-heading" className="mb-16">
              <h2 id="focus-heading" className="font-heading text-display-md text-text-primary mb-8">
                Focus States (Tab to see)
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <p className="font-body text-body text-text-secondary">Press <kbd className="px-2 py-0.5 bg-background rounded font-mono text-body-sm">Tab</kbd> to navigate through these elements:</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <button type="button" className="inline-flex items-center justify-center px-5 py-2.5 text-body font-body font-medium text-primary border-2 border-primary rounded-md hover:bg-primary/10 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background">Link Button</button>
                  <input type="text" placeholder="Focusable input" className="px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-64" />
                  <select className="px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
                    <option>Select option</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Reduced Motion Test */}
            <section aria-labelledby="motion-heading" className="mb-16">
              <h2 id="motion-heading" className="font-heading text-display-md text-text-primary mb-8">
                Reduced Motion Test
              </h2>
              <div className="bg-surface border border-border rounded-xl p-6">
                <p className="font-body text-body text-text-secondary mb-4">
                  Enable "Reduce Motion" in your OS settings, then refresh. Animations below should be disabled.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-16 h-16 bg-primary animate-pulse rounded-lg" aria-hidden="true" />
                  <div className="w-16 h-16 bg-primary/50 animate-bounce rounded-lg" aria-hidden="true" />
                  <div className="w-16 h-16 bg-primary/20 animate-spin rounded-lg" aria-hidden="true" />
                  <div className="w-16 h-16 bg-primary animate-fade-in rounded-lg" aria-hidden="true" />
                  <div className="w-16 h-16 bg-primary animate-slide-up rounded-lg" aria-hidden="true" />
                </div>
                <p className="font-body text-caption text-text-muted mt-4">
                  CSS: <code className="font-mono bg-background px-1.5 py-0.5 rounded">@media (prefers-reduced-motion: reduce)</code> sets animation/transition duration to 0.01ms
                </p>
              </div>
            </section>

            {/* Container Sizes */}
            <section aria-labelledby="containers-heading" className="mb-16">
              <h2 id="containers-heading" className="font-heading text-display-md text-text-primary mb-8">
                Container Sizes
              </h2>
              <div className="space-y-4">
                {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                  <Container key={size} size={size} className="bg-surface border border-border p-4">
                    <code className="font-mono text-body-sm text-text-secondary">Container size="{size}"</code>
                    <p className="font-body text-body-sm text-text-muted mt-1">Max-width: {{
                      sm: '640px',
                      md: '768px',
                      lg: '1024px',
                      xl: '1280px',
                      '2xl': '1440px',
                    }[size]}</p>
                  </Container>
                ))}
              </div>
            </section>

            {/* Breadcrumb Example */}
            <section aria-labelledby="breadcrumb-heading" className="mb-16">
              <h2 id="breadcrumb-heading" className="font-heading text-display-md text-text-primary mb-8">
                Breadcrumb
              </h2>
              <nav className="bg-surface border border-border rounded-xl p-6" aria-label="Breadcrumb example">
                <ol className="flex items-center gap-2 font-body text-body-sm text-text-muted flex-wrap">
                  <li><a href="/" className="hover:text-text-secondary transition-colors">Home</a></li>
                  <li aria-hidden="true">/</li>
                  <li><a href="/collection" className="hover:text-text-secondary transition-colors">Collection</a></li>
                  <li aria-hidden="true">/</li>
                  <li><a href="/collection/buddha-statues" className="hover:text-text-secondary transition-colors">Buddha Statues</a></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-text-primary">Gold Shakyamuni</li>
                </ol>
              </nav>
            </section>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}