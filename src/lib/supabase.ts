import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Type helpers for our database
export type Tables = {
  categories: {
    Row: {
      id: string;
      name: string;
      slug: string;
      description: string | null;
      display_order: number;
      is_visible: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables['categories']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Tables['categories']['Insert']>;
  };
  products: {
    Row: {
      id: string;
      category_id: string;
      title: string;
      slug: string;
      description: string;
      materials: string | null;
      origin: string | null;
      dimensions: string | null;
      artist: string | null;
      care_notes: string | null;
      status: 'draft' | 'published' | 'archived';
      is_featured: boolean;
      display_order: number;
      created_at: string;
      updated_at: string;
      published_at: string | null;
    };
    Insert: Omit<Tables['products']['Row'], 'id' | 'created_at' | 'updated_at' | 'published_at'>;
    Update: Partial<Tables['products']['Insert']>;
  };
  product_images: {
    Row: {
      id: string;
      product_id: string;
      storage_path: string;
      alt_text: string | null;
      display_order: number;
      is_cover: boolean;
      created_at: string;
    };
    Insert: Omit<Tables['product_images']['Row'], 'id' | 'created_at'>;
    Update: Partial<Tables['product_images']['Insert']>;
  };
  inquiries: {
    Row: {
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
    };
    Insert: Omit<Tables['inquiries']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Tables['inquiries']['Insert']>;
  };
  site_settings: {
    Row: {
      id: string;
      store_name: string;
      tagline: string;
      contact_email: string;
      phone: string | null;
      whatsapp_e164: string | null;
      address: string;
      maps_url: string | null;
      opening_hours: string | null;
      instagram_url: string | null;
      facebook_url: string | null;
      updated_at: string;
    };
    Insert: Omit<Tables['site_settings']['Row'], 'id' | 'updated_at'>;
    Update: Partial<Tables['site_settings']['Insert']>;
  };
  admin_users: {
    Row: {
      user_id: string;
      is_active: boolean;
      created_at: string;
    };
    Insert: Omit<Tables['admin_users']['Row'], 'created_at'>;
    Update: Partial<Tables['admin_users']['Insert']>;
  };
};

export type SiteSettings = Tables['site_settings']['Row'];
export type AdminUser = Tables['admin_users']['Row'];
export type Category = Tables['categories']['Row'];
export type Product = Tables['products']['Row'];
export type ProductImage = Tables['product_images']['Row'];
export type Inquiry = Tables['inquiries']['Row'];