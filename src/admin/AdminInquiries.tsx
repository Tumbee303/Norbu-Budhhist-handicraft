import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Container, Button } from '../ui';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  product_id: string | null;
  product_title_snapshot: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`);
      }
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      setInquiries(data ?? []);
    } catch (error) {
      console.error('Inquiries fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const updateStatus = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId);
      if (error) throw error;

      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq))
      );
    } catch (error) {
      console.error('Update status error:', error);
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) return;

    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', inquiryId);
      if (error) throw error;
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    const styles = {
      new: 'bg-primary/10 text-primary',
      read: 'bg-blue-500/10 text-blue-400',
      replied: 'bg-green-500/10 text-green-400',
      archived: 'bg-text-muted/10 text-text-muted',
    };
    return styles[status] || styles.archived;
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter && inq.status !== statusFilter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        inq.name.toLowerCase().includes(searchLower) ||
        inq.email.toLowerCase().includes(searchLower) ||
        inq.message.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <Container>
      <header className="mb-10">
        <h1 className="font-heading text-display-md text-text-primary mb-2">Inquiries</h1>
        <p className="font-body text-body text-text-secondary">Manage and respond to customer inquiries</p>
      </header>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="inquiry-search" className="sr-only">Search inquiries</label>
            <input
              type="search"
              id="inquiry-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-48"
          >
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
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" aria-label="Loading" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-12 font-body text-body text-text-muted">
            No inquiries found. They will appear here when visitors submit the contact form.
          </div>
        ) : (
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Name</th>
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Email</th>
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Phone</th>
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Product</th>
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Status</th>
                <th className="text-left p-4 font-body text-caption text-text-muted tracking-wide uppercase">Date</th>
                <th className="text-right p-4 font-body text-caption text-text-muted tracking-wide uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-border/50 last:border-0 hover:bg-background/50">
                  <td className="p-4 font-body text-body text-text-primary">{inquiry.name}</td>
                  <td className="p-4 font-body text-body text-text-secondary">{inquiry.email}</td>
                  <td className="p-4 font-body text-body text-text-secondary">{inquiry.phone || '—'}</td>
                  <td className="p-4 font-body text-body text-text-secondary">{inquiry.product_title_snapshot || '—'}</td>
                  <td className="p-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry['status'])}
                      className={`px-2.5 py-1 rounded-full font-body text-caption font-medium border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${getStatusBadge(inquiry.status)}`}
                      aria-label={`Change status for inquiry from ${inquiry.name}`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="p-4 font-body text-body-sm text-text-muted">{formatDate(inquiry.created_at)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => viewInquiry(inquiry)}>View</Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => deleteInquiry(inquiry.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}

function getStatusBadge(status: Inquiry['status']) {
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

function viewInquiry(inquiry: Inquiry) {
  alert(
    `Inquiry Details:\n\n` +
    `Name: ${inquiry.name}\n` +
    `Email: ${inquiry.email}\n` +
    `Phone: ${inquiry.phone || '—'}\n` +
    `Product: ${inquiry.product_title_snapshot || '—'}\n` +
    `Status: ${inquiry.status}\n` +
    `Date: ${formatDate(inquiry.created_at)}\n\n` +
    `Message:\n${inquiry.message}`
  );
}