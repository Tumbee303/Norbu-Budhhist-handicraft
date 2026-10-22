-- Migration 008: Supabase Storage Buckets
-- Creates storage buckets with access policies per spec
-- Separate public (published) and private (draft) buckets

-- Create buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    -- Public bucket for published product images
    ('product-images-public', 'product-images-public', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    -- Private bucket for draft/archived product images (not publicly accessible)
    ('product-images-private', 'product-images-private', false, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- PUBLIC BUCKET POLICIES (product-images-public)
-- ============================================================

-- Anonymous: read public images
CREATE POLICY "public_read_product_images_public" ON storage.objects
    FOR SELECT TO anon
    USING (bucket_id = 'product-images-public');

-- Authenticated: read public images
CREATE POLICY "auth_read_product_images_public" ON storage.objects
    FOR SELECT TO authenticated
    USING (bucket_id = 'product-images-public');

-- Service role: full access to public bucket
CREATE POLICY "service_all_product_images_public" ON storage.objects
    FOR ALL TO service_role
    USING (bucket_id = 'product-images-public')
    WITH CHECK (bucket_id = 'product-images-public');

-- ============================================================
-- PRIVATE BUCKET POLICIES (product-images-private)
-- ============================================================

-- NO direct access for anon or authenticated
-- Only service_role (admin operations) can access

-- Service role: full access to private bucket
CREATE POLICY "service_all_product_images_private" ON storage.objects
    FOR ALL TO service_role
    USING (bucket_id = 'product-images-private')
    WITH CHECK (bucket_id = 'product-images-private');

-- ============================================================
-- NOTES
-- ============================================================
-- Bucket structure:
-- product-images-public/
--   {product_id}/
--     {image_id}.jpg
--     {image_id}_thumb.jpg
--
-- product-images-private/
--   {product_id}/
--     {image_id}.jpg
--     {image_id}_thumb.jpg
--
-- Promotion workflow (handled by admin dashboard):
-- 1. Upload draft images to product-images-private
-- 2. On publish: copy/move images to product-images-public
-- 3. On archive: move images from public to private
-- 4. On delete: remove from both buckets