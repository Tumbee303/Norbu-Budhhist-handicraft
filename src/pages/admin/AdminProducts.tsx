import { Container, Button } from '../../ui';

export function AdminProducts() {
  return (
    <section className="section" aria-labelledby="products-heading">
      <Container>
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 id="products-heading" className="font-heading text-display-md text-text-primary">
              Products
            </h1>
            <p className="font-body text-body text-text-secondary mt-1">
              Manage your product catalog — create, edit, publish, and organize
            </p>
          </div>
          <Button asChild>
            <a href="/admin/products/new">Add Product</a>
          </Button>
        </header>

        {/* Filters */}
        <div className="bg-surface border border-border rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search products</label>
              <input
                type="search"
                id="search"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <select className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
              <option value="">All Categories</option>
              <option value="thangka-paintings">Thangka Paintings</option>
              <option value="buddha-statues">Buddha Statues</option>
              <option value="singing-bowls">Singing Bowls</option>
              <option value="prayer-wheels">Prayer Wheels</option>
              <option value="mandala-art">Mandala Art</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <svg className="mx-auto w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h2 className="font-heading text-heading-lg text-text-primary mb-2">No Products Yet</h2>
          <p className="font-body text-body text-text-secondary max-w-md mx-auto mb-6">
            Start building your catalog by adding your first product. You can create drafts, upload photos,
            and publish when ready.
          </p>
          <Button asChild>
            <a href="/admin/products/new">Add Your First Product</a>
          </Button>
        </div>

        {/* Table Placeholder */}
        <div className="hidden mt-6" aria-hidden="true">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Product</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Category</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Status</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Featured</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Updated</th>
                  <th className="text-right p-4 font-body text-caption text-text-muted tracking-wide uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Product rows will be rendered here */}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}