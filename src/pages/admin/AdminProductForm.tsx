import { Container, Button } from '../../ui';

export function AdminProductForm() {
  return (
    <section className="section" aria-labelledby="form-heading">
      <Container size="xl">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 id="form-heading" className="font-heading text-display-md text-text-primary">
              Add Product
            </h1>
            <p className="font-body text-body text-text-secondary mt-1">
              Create a new product listing with details, images, and publication settings
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/admin/products">Cancel</a>
          </Button>
        </header>

        <form className="space-y-8" noValidate>
          {/* Basic Information */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Basic Information</legend>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block font-body text-body-sm text-text-secondary mb-2">
                  Product Name <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="e.g., Gold-Gilded Shakyamuni Buddha"
                  required
                />
              </div>
              <div>
                <label htmlFor="slug" className="block font-body text-body-sm text-text-secondary mb-2">
                  Slug <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="gold-gilded-shakyamuni-buddha"
                  required
                />
                <p className="font-body text-caption text-text-muted mt-1">Auto-generated from name if left blank</p>
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="category" className="block font-body text-body-sm text-text-secondary mb-2">
                  Category <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="thangka-paintings">Thangka Paintings</option>
                  <option value="buddha-statues">Buddha Statues</option>
                  <option value="singing-bowls">Singing Bowls</option>
                  <option value="prayer-wheels">Prayer Wheels</option>
                  <option value="mandala-art">Mandala Art</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="description" className="block font-body text-body-sm text-text-secondary mb-2">
                  Description <span className="text-primary" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y min-h-[120px]"
                  placeholder="Describe the piece — its significance, style, craftsmanship, and what makes it special..."
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Verified Details */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Verified Details (Optional — leave blank if unconfirmed)</legend>
            <p className="font-body text-body-sm text-text-muted mb-6">
              Only fill in fields you can verify for this specific piece. Blank fields are omitted from the public page.
              Never guess — accuracy builds trust.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="materials" className="block font-body text-body-sm text-text-secondary mb-2">Materials</label>
                <input
                  type="text"
                  id="materials"
                  name="materials"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="e.g., Cotton canvas, mineral pigments, 24k gold leaf"
                />
              </div>
              <div>
                <label htmlFor="origin" className="block font-body text-body-sm text-text-secondary mb-2">Origin / Source</label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="e.g., Kathmandu Valley, Nepal — traditional Newar workshop"
                />
              </div>
              <div>
                <label htmlFor="dimensions" className="block font-body text-body-sm text-text-secondary mb-2">Dimensions</label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="e.g., 60 × 45 cm (painting), 30 × 22 × 15 cm (statue)"
                />
              </div>
              <div>
                <label htmlFor="artist" className="block font-body text-body-sm text-text-secondary mb-2">Artist / Workshop</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  placeholder="e.g., Master Thangka painter Tenzin Norbu"
                />
              </div>
              <div className="lg:col-span-2">
                <label htmlFor="careNotes" className="block font-body text-body-sm text-text-secondary mb-2">Care Information</label>
                <textarea
                  id="careNotes"
                  name="careNotes"
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-y"
                  placeholder="e.g., Keep away from direct sunlight. Dust gently with soft brush. Do not use water or chemicals."
                />
              </div>
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Product Images</legend>
            <p className="font-body text-body-sm text-text-muted mb-6">
              Upload multiple photos. First image becomes the cover. Drag to reorder. Maximum 10 images, 5MB each.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <svg className="mx-auto w-12 h-12 text-text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-body text-body text-text-secondary mb-2">Drop images here or click to browse</p>
              <p className="font-body text-caption text-text-muted">JPG, PNG, WebP • Max 5MB each • Max 10 images</p>
              <input type="file" id="images" name="images" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" />
              <Button variant="outline" className="mt-4" type="button">Choose Files</Button>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 min-h-[100px]" aria-label="Uploaded images">
              {/* Image previews will appear here */}
            </div>
          </fieldset>

          {/* Publication Settings */}
          <fieldset className="bg-surface border border-border rounded-xl p-6">
            <legend className="font-heading text-heading-lg text-text-primary mb-6">Publication Settings</legend>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-body text-text-primary">Status</p>
                  <p className="font-body text-body-sm text-text-muted">Draft products are only visible in admin</p>
                </div>
                <select className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-48">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-body text-text-primary">Featured</p>
                  <p className="font-body text-body-sm text-text-muted">Show on homepage featured section</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" aria-label="Featured product">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-border peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="sr-only">Featured product</span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-border pt-6">
            <Button variant="outline" asChild>
              <a href="/admin/products">Cancel</a>
            </Button>
            <Button type="submit">Save as Draft</Button>
            <Button variant="secondary" type="button">Save & Publish</Button>
          </div>
        </form>
      </Container>
    </section>
  );
}