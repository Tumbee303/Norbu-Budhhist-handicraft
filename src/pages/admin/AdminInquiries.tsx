import { Container, Button } from '../../ui';

const inquiries = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1 555-0123', product: 'Gold-Gilded Shakyamuni', status: 'new', message: 'Interested in purchasing this piece. Can you provide more details about the gold leaf process?', date: '2026-10-14 10:30' },
  { id: '2', name: 'Maria Garcia', email: 'maria@example.com', phone: '', product: '', status: 'read', message: 'Do you ship internationally? I am in Spain and would like to know shipping costs.', date: '2026-10-13 15:45' },
];

export function AdminInquiries() {
  return (
    <section className="section" aria-labelledby="inquiries-heading">
      <Container>
        <header className="mb-10">
          <h1 id="inquiries-heading" className="font-heading text-display-md text-text-primary mb-2">
            Inquiries
          </h1>
          <p className="font-body text-body text-text-secondary">
            Manage and respond to customer inquiries
          </p>
        </header>

        {/* Filters */}
        <div className="bg-surface border border-border rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="inquiry-search" className="sr-only">Search inquiries</label>
              <input
                type="search"
                id="inquiry-search"
                placeholder="Search inquiries..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <select className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-48">
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table */}
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
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 font-body text-body text-text-muted">
                    No inquiries yet. They will appear here when visitors submit the contact form.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border/50 last:border-0 hover:bg-background/50">
                    <td className="p-4 font-body text-body text-text-primary">{inquiry.name}</td>
                    <td className="p-4 font-body text-body text-text-secondary">{inquiry.email}</td>
                    <td className="p-4 font-body text-body text-text-secondary">{inquiry.product || '—'}</td>
                    <td className="p-4">
                      <select
                        className={`px-2.5 py-1 rounded-full font-body text-caption font-medium border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                          inquiry.status === 'new' ? 'bg-primary/10 text-primary' :
                          inquiry.status === 'read' ? 'bg-blue-500/10 text-blue-400' :
                          inquiry.status === 'replied' ? 'bg-green-500/10 text-green-400' :
                          'bg-text-muted/10 text-text-muted'
                        }`}
                        aria-label={`Change status for inquiry from ${inquiry.name}`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4 font-body text-body-sm text-text-muted">{inquiry.date}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}