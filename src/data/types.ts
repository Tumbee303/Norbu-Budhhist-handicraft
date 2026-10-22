/**
 * Norbu Buddhist Handicraft — Data Types
 * TypeScript interfaces for product catalog
 */

export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
  isVisible: boolean;
  imagePlaceholder: string; // Placeholder identifier for development
}

export interface ProductImage {
  id: string;
  productId: string;
  storagePath: string;
  altText: string;
  displayOrder: number;
  isCover: boolean;
  placeholder?: string; // For development
}

export interface Product {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  description: string;
  materials?: string | null;
  origin?: string | null;
  dimensions?: string | null;
  artist?: string | null;
  careNotes?: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  publishedAt?: string | null; // ISO 8601
  images: ProductImage[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface SiteSettings {
  id: string;
  storeName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  whatsappE164: string;
  address: string;
  mapsUrl: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  productId?: string | null;
  productTitleSnapshot?: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// For public API responses (excludes draft/archived)
export interface PublicProduct extends Omit<Product, 'status'> {
  status: 'published';
}

// For admin list views
export interface AdminProductListItem {
  id: string;
  title: string;
  slug: string;
  categoryName: string;
  status: ProductStatus;
  isFeatured: boolean;
  displayOrder: number;
  updatedAt: string;
  coverImage?: ProductImage;
}

// Form data types
export interface ProductFormData {
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  materials?: string;
  origin?: string;
  dimensions?: string;
  artist?: string;
  careNotes?: string;
  status: ProductStatus;
  isFeatured: boolean;
  displayOrder: number;
  images: File[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  product?: string;
  message: string;
  turnstileToken?: string;
}

// Placeholder identifiers (development only)
export const PLACEHOLDERS = {
  HERO_BUDDHA: '[HERO_BUDDHA_STATUE_PHOTO]',
  CATEGORY_THANGKA: '[THANGKA_PAINTINGS_PHOTO]',
  CATEGORY_STATUES: '[BUDDHA_STATUES_PHOTO]',
  CATEGORY_BOWLS: '[SINGING_BOWLS_PHOTO]',
  CATEGORY_WHEELS: '[PRAYER_WHEELS_PHOTO]',
  CATEGORY_MANDALA: '[MANDALA_ART_PHOTO]',
  SHOP_EXTERIOR: '[SHOP_EXTERIOR]',
  SHOP_INTERIOR: '[SHOP_INTERIOR]',
  FOUNDER: '[FOUNDER_PHOTO]',
  PRODUCT_MAIN: '[PRODUCT_MAIN_IMAGE]',
  PRODUCT_GALLERY: '[PRODUCT_GALLERY_IMAGE]',
} as const;