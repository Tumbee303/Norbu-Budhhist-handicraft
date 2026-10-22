import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Container, Button } from '../ui';

interface DashboardStats {
  publishedProducts: number;
  draftProducts: number;
  totalInquiries: number;
  newInquiries: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  product_id: string | null;
  product_title_snapshot: string | null;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    publishedProducts: 0,
    draftProducts: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [
        { count: publishedProducts, error: pubErr },
        { count: draftProducts, error: draftErr },
        { count: totalInquiries, error: totalErr },
        { count: newInquiries, error: newErr },
        { data: inquiries, error: inqErr },
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase
          .from('inquiries')
          .select('id, name, email, product_id, product_title_snapshot, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      if (pubErr) throw pubErr;
      if (draftErr) throw draftErr;
      if (totalErr) throw totalErr;
      if (newErr) throw newErr;
      if (inqErr) throw inqErr;

      setStats({
        publishedProducts: publishedProducts ?? 0,
        draftProducts: draftProducts ?? 0,
        totalInquiries: totalInquiries ?? 0,
        newInquiries: newInquiries ?? 0,
      });
      setRecentInquiries(inquiries ?? []);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: RecentInquiry['status']) => {
    const styles = {
      new: 'bg-primary/10 text-primary',
      read: 'bg-blue-500/10 text-blue-400',
      replied: 'bg-green-500/10 text-green-400',
      archived: 'bg-text-muted/10 text-text-muted',
    };
    return styles[status] || styles.archived;
  };

  return (
    <Container>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" aria-label="Loading" />
        </div>
      ) : (
        <>
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-heading text-display-md text-text-primary">Dashboard</h1>
              <p className="font-body text-body text-text-secondary mt-1">
                Overview of your store content and inquiries
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/admin/products/new">Add Product</Link>
              </Button>
              <Button asChild>
                <Link to="/admin/products">Manage Products</Link>
              </Button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10" role="list" aria-label="Dashboard statistics">
            <article className="bg-surface border border-border rounded-xl p-6" role="listitem">
              <p className="font-body text-caption text-text-muted tracking-wide uppercase mb-1">Published Products</p>
              <p className="font-heading text-display-sm text-text-primary">{stats.publishedProducts}</p>
            </article>
            <article className="bg-surface border border-border rounded-xl p-6" role="listitem">
              <p className="font-body text-caption text-text-muted tracking-wide uppercase mb-1">Draft Products</p>
              <p className="font-heading text-display-sm text-text-primary">{stats.draftProducts}</p>
            </article>
            <article className="bg-surface border border-border rounded-xl p-6" role="listitem">
              <p className="font-body text-caption text-text-muted tracking-wide uppercase mb-1">Total Inquiries</p>
              <p className="font-heading text-display-sm text-text-primary">{stats.totalInquiries}</p>
            </article>
            <article className="bg-surface border border-border rounded-xl p-6" role="listitem">
              <p className="font-body text-caption text-text-muted tracking-wide uppercase mb-1">New Inquiries</p>
              <p className="font-heading text-display-sm text-text-primary">{stats.newInquiries}</p>
            </article>
          </div>

          {/* Recent Inquiries */}
          <section aria-labelledby="inquiries-heading" className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 id="inquiries-heading" className="font-heading text-heading-lg text-text-primary">
                Recent Inquiries
              </h2>
              <Button variant="outline" asChild size="sm">
                <Link to="/admin/inquiries">View All</Link>
              </Button>
            </div>

            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {recentInquiries.length === 0 ? (
                <div className="text-center py-12 font-body text-body text-text-muted">
                  No inquiries yet. They will appear here when visitors submit the contact form.
                </div>
              ) : (
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
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-border/50 last:border-0">
                        <td className="p-4 font-body text-body text-text-primary">{inquiry.name}</td>
                        <td className="p-4 font-body text-body text-text-secondary">{inquiry.email}</td>
                        <td className="p-4 font-body text-body text-text-secondary">{inquiry.product_title_snapshot || inquiry.product_id || '—'}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium ${getStatusBadge(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="p-4 font-body text-body-sm text-text-muted">{formatDate(inquiry.created_at)}</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/admin/inquiries/${inquiry.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="font-heading text-heading-lg text-text-primary mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
                <Link to="/admin/products/new">
                  <PackageIcon className="w-6 h-6" />
                  <span className="font-body text-body-sm">Add Product</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
                <Link to="/admin/products">
                  <PackageIcon className="w-6 h-6" />
                  <span className="font-body text-body-sm">Manage Products</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
                <Link to="/admin/inquiries">
                  <MailIcon className="w-6 h-6" />
                  <span className="font-body text-body-sm">View Inquiries</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-20 flex flex-col items-center justify-center gap-2">
                <Link to="/admin/settings">
                  <SettingsIcon className="w-6 h-6" />
                  <span className="font-body text-body-sm">Settings</span>
                </Link>
              </Button>
            </div>
          </section>
        </>
      )}
    </Container>
  );
}

function getStatusBadge(status: RecentInquiry['status']) {
  const styles = {
    new: 'bg-primary/10 text-primary',
    read: 'bg-blue-500/10 text-blue-400',
    replied: 'bg-green-500/10 text-green-400',
    archived: 'bg-text-muted/10 text-text-muted',
  };
  return styles[status] || styles.archived;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}