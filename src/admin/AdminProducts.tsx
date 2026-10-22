import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Container, Button } from '../ui';

interface Product {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  display_order: number;
  updated_at: string;
  categories: { name: string }[] | null;
  product_images: { storage_path: string; is_cover: boolean }[] | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('is_visible', true)
      .order('display_order');
    if (data) setCategories(data);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          title,
          slug,
          category_id,
          status,
          is_featured,
          display_order,
          updated_at,
          categories (name),
          product_images (storage_path, is_cover)
        `)
        .order('updated_at', { ascending: false });

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      if (categoryFilter) {
        query = query.eq('category_id', categoryFilter);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      setProducts(data ?? []);
    } catch (error) {
      console.error('Products fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts, search, statusFilter, categoryFilter]);

  const getStatusBadge = (status: Product['status']) => {
    const styles = {
      published: 'bg-green-500/10 text-green-400',
      draft: 'bg-blue-500/10 text-blue-400',
      archived: 'bg-text-muted/10 text-text-muted',
    };
    return styles[status];
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

  const getCoverImage = (images: Product['product_images']) => {
    if (!images || images.length === 0) return null;
    const cover = images.find((img) => img.is_cover) || images[0];
    return cover.storage_path;
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <Container>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-heading text-display-md text-text-primary">Products</h1>
          <p className="font-body text-body text-text-secondary mt-1">
            Manage your product catalog — create, edit, publish, and organize
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/products/new">Add Product</Link>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-48"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-52"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" aria-label="Loading" />
        </div>
      ) : products.length === 0 ? (
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
            <Link to="/admin/products/new">Add Your First Product</Link>
          </Button>
        </div>
      ) : (
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
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-background/50">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                        {getCoverImage(product.product_images) ? (
                          <img
                            src={`https://YOUR-PROJECT.supabase.co/storage/v1/object/public/${getCoverImage(product.product_images)}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-body text-body font-medium text-text-primary">{product.title}</p>
                        <p className="font-body text-caption text-text-muted">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-body text-body text-text-secondary">
                    {product.categories?.[0]?.name || 'Unknown'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium ${getStatusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-caption font-medium ${product.is_featured ? 'bg-primary/10 text-primary' : 'bg-text-muted/10 text-text-muted'}`}>
                      {product.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-4 font-body text-body-sm text-text-muted">{formatDate(product.updated_at)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => deleteProduct(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}

function getStatusBadge(status: Product['status']) {
  const styles = {
    published: 'bg-green-500/10 text-green-400',
    draft: 'bg-blue-500/10 text-blue-400',
    archived: 'bg-text-muted/10 text-text-muted',
  };
  return styles[status];
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

function getCoverImage(images: Product['product_images']) {
  if (!images || images.length === 0) return null;
  const cover = images.find((img) => img.is_cover) || images[0];
  return cover.storage_path;
}

async function deleteProduct(id: string) {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    window.location.reload();
  } catch (error) {
    console.error('Delete error:', error);
    alert('Failed to delete product');
  }
}