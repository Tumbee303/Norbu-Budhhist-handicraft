import { Container, Button } from '../../ui';

const stats = [
  { label: 'Published Products', value: '0', change: '—' },
  { label: 'Draft Products', value: '0', change: '—' },
  { label: 'Total Inquiries', value: '0', change: '—' },
  { label: 'New Inquiries', value: '0', change: '—' },
];

const recentInquiries = [
  { id: '1', name: '—', email: '—', product: '—', status: 'new', date: '—' },
];

export function AdminDashboard() {
  return (
    <section className="section" aria-labelledby="dashboard-heading">
      <Container>
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 id="dashboard-heading" className="font-heading text-display-md text-text-primary">
              Dashboard
            </h1>
            <p className="font-body text-body text-text-secondary mt-1">
              Overview of your store content and inquiries
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/admin/products/new">Add Product</a>
            </Button>
            <Button asChild>
              <a href="/admin/products">Manage Products</a>
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10" role="list" aria-label="Dashboard statistics">
          {stats.map((stat) => (
            <article key={stat.label} className="bg-surface border border-border rounded-xl p-6" role="listitem">
              <p className="font-body text-caption text-text-muted tracking-wide uppercase mb-1">{stat.label}</p>
              <p className="font-heading text-display-sm text-text-primary">{stat.value}</p>
              <p className="font-body text-caption text-text-muted mt-1">{stat.change}</p>
            </article>
          ))}
        </div>

        {/* Recent Inquiries */}
        <section aria-labelledby="inquiries-heading" className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 id="inquiries-heading" className="font-heading text-heading-lg text-text-primary">
              Recent Inquiries
            </h2>
            <Button variant="outline" asChild size="sm">
              <a href="/admin/inquiries">View All</a>
            </Button>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Name</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Email</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Product</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Status</th>
                  <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Date</th>
                  <th className="text-right p-4 font-body text-caption text-text-muted tracking-wide uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 font-body text-body text-text-muted">
                      No inquiries yet. They will appear here when visitors submit the contact form.
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-border/50 last:border-0">
                      <td className="p-4 font-body text-body text-text-primary">{inquiry.name}</td>
                      <td className="p-4 font-body text-body text-text-secondary">{inquiry.email}</td>
                      <td className="p-4 font-body text-body text-text-secondary">{inquiry.product}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium ${
                          inquiry.status === 'new' ? 'bg-primary/10 text-primary' :
                          inquiry.status === 'read' ? 'bg-blue-500/10 text-blue-400' :
                          inquiry.status === 'replied' ? 'bg-green-500/10 text-green-400' :
                          'bg-text-muted/10 text-text-muted'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="p-4 font-body text-body-sm text-text-muted">{inquiry.date}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="font-heading text-heading-lg text-text-primary mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
              <a href="/admin/products/new">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-body text-body-sm">Add Product</span>
              </a>
            </Button>
            <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
              <a href="/admin/products">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-body text-body-sm">Manage Products</span>
              </a>
            </Button>
            <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
              <a href="/admin/inquiries">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-body text-body-sm">View Inquiries</span>
              </a>
            </Button>
            <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
              <a href="/admin/settings">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-body-sm">Settings</span>
              </a>
            </Button>
          </div>
        </section>
      </Container>
    </section>
  );
}