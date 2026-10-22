import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Container, Button } from '../ui';

interface ProductFormData {
  title: string;
  slug: string;
  category_id: string;
  description: string;
  materials: string;
  origin: string;
  dimensions: string;
  artist: string;
  care_notes: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  display_order: number;
}

interface Category {
  id: string;
  name: string;
}

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    slug: '',
    category_id: '',
    description: '',
    materials: '',
    origin: '',
    dimensions: '',
    artist: '',
    care_notes: '',
    status: 'draft',
    is_featured: false,
    display_order: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('is_visible', true)
      .order('display_order');
    if (data) setCategories(data);
  }, []);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          category_id: data.category_id,
          description: data.description,
          materials: data.materials || '',
          origin: data.origin || '',
          dimensions: data.dimensions || '',
          artist: data.artist || '',
          care_notes: data.care_notes || '',
          status: data.status,
          is_featured: data.is_featured,
          display_order: data.display_order,
        });
      }
    } catch (error) {
      console.error('Fetch product error:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchProduct();
    }
  }, [fetchCategories, fetchProduct, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (error) setError('');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, title: value }));
    if (!formData.slug || prevTitle === prevSlug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const prevTitle = formData.title;
  const prevSlug = formData.slug;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`${file.name}: Only JPEG, PNG, and WebP images are allowed.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: File size must be less than 5MB.`);
        return false;
      }
      return true;
    });
    if (images.length + validFiles.length > 10) {
      alert('Maximum 10 images allowed.');
      return;
    }
    const newImages = [...images, ...validFiles];
    setImages(newImages);
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return newImages;
    });
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      const [removed] = newPreviews.splice(fromIndex, 1);
      newPreviews.splice(toIndex, 0, removed);
      return newPreviews;
    });
  };

  const uploadImages = async (productId: string): Promise<void> => {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const ext = file.name.split('.').pop() || 'jpg';
      const fileName = `${productId}/${Date.now()}-${i}.${ext}`;
      const bucket = formData.status === 'published' ? 'product-images-public' : 'product-images-private';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from('product_images').insert({
        product_id: productId,
        storage_path: fileName,
        display_order: i,
        is_cover: i === 0,
        alt_text: `${formData.title} - Image ${i + 1}`,
      });

      if (dbError) throw dbError;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.slug.trim()) throw new Error('Slug is required');
      if (!formData.category_id) throw new Error('Category is required');
      if (!formData.description.trim()) throw new Error('Description is required');

      let productId = id;

      if (isEditing) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            title: formData.title,
            slug: formData.slug,
            category_id: formData.category_id,
            description: formData.description,
            materials: formData.materials || null,
            origin: formData.origin || null,
            dimensions: formData.dimensions || null,
            artist: formData.artist || null,
            care_notes: formData.care_notes || null,
            status: formData.status,
            is_featured: formData.is_featured,
            display_order: formData.display_order,
          })
          .eq('id', id);
        if (error) throw error;
        productId = id;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert({
            title: formData.title,
            slug: formData.slug,
            category_id: formData.category_id,
            description: formData.description,
            materials: formData.materials || null,
            origin: formData.origin || null,
            dimensions: formData.dimensions || null,
            artist: formData.artist || null,
            care_notes: formData.care_notes || null,
            status: formData.status,
            is_featured: formData.is_featured,
            display_order: formData.display_order,
          })
          .select('id')
          .single();
        if (error) throw error;
        productId = data.id;
      }

      // Upload images if any
      if (images.length > 0 && productId) {
        await uploadImages(productId);
      }

      setSuccess(`${isEditing ? 'Updated' : 'Created'} product successfully!`);

      // Redirect after delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" aria-label="Loading" />
        </div>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-heading text-display-md text-text-primary">
            {isEditing ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="font-body text-body text-text-secondary mt-1">
            {isEditing ? 'Update product details, images, and publication settings' : 'Create a new product listing with details, images, and publication settings'}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/admin/products">Cancel</Link>
        </Button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 font-body text-body" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300 font-body text-body" role="alert">
            {success}
          </div>
        )}

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
                value={formData.title}
                onChange={handleTitleChange}
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
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                placeholder="gold-gilded-shakyamuni-buddha"
                required
              />
              <p className="font-body text-caption text-text-muted mt-1">Auto-generated from name if left blank</p>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="category_id" className="block font-body text-body-sm text-text-secondary mb-2">
                Category <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="description" className="block font-body text-body-sm text-text-secondary mb-2">
                Description <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
                value={formData.materials}
                onChange={handleChange}
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
                value={formData.origin}
                onChange={handleChange}
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
                value={formData.dimensions}
                onChange={handleChange}
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
                value={formData.artist}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-body text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                placeholder="e.g., Master Thangka painter Tenzin Norbu"
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="care_notes" className="block font-body text-body-sm text-text-secondary mb-2">Care Information</label>
              <textarea
                id="care_notes"
                name="care_notes"
                value={formData.care_notes}
                onChange={handleChange}
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
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />
            <label htmlFor="images" className="cursor-pointer">
              <svg className="mx-auto w-12 h-12 text-text-muted mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-body text-body text-text-secondary mb-2">Drop images here or click to browse</p>
              <p className="font-body text-caption text-text-muted">JPG, PNG, WebP • Max 5MB each • Max 10 images</p>
            </label>
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square bg-surface rounded-lg overflow-hidden border border-border">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500/90 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-1 left-1 right-1 flex justify-center">
                    <span className="px-2 py-0.5 bg-background/90 text-body-sm font-body font-medium rounded">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus w-48"
              >
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
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="sr-only">Featured product</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-body text-text-primary">Display Order</p>
                <p className="font-body text-body-sm text-text-muted">Lower numbers appear first</p>
              </div>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="0"
                className="w-24 px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
          </div>
        </fieldset>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-border pt-6">
          <Button variant="outline" asChild>
            <Link to="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" loading={saving}>
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Save as Draft'}
          </Button>
          <Button variant="secondary" type="submit" loading={saving}>
            {isEditing ? 'Save & Publish' : 'Save & Publish'}
          </Button>
        </div>
      </form>
    </Container>
  );
}