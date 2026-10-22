-- Migration 007: Row Level Security Policies
-- Implements the privilege matrix from the spec

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CATEGORIES
-- ============================================================

-- Anonymous: read visible categories only
CREATE POLICY categories_anon_read ON categories
    FOR SELECT TO anon
    USING (is_visible = true);

-- Authenticated (non-admin): read visible categories only
CREATE POLICY categories_auth_read ON categories
    FOR SELECT TO authenticated
    USING (is_visible = true);

-- Service role (admin operations): full access
CREATE POLICY categories_service_all ON categories
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Anonymous: read published products only
CREATE POLICY products_anon_read ON products
    FOR SELECT TO anon
    USING (status = 'published');

-- Authenticated (non-admin): read published products only
CREATE POLICY products_auth_read ON products
    FOR SELECT TO authenticated
    USING (status = 'published');

-- Service role (admin): full access
CREATE POLICY products_service_all ON products
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================

-- Anonymous: read images of published products only
CREATE POLICY product_images_anon_read ON product_images
    FOR SELECT TO anon
    USING (
        EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_images.product_id
            AND p.status = 'published'
        )
    );

-- Authenticated (non-admin): read images of published products only
CREATE POLICY product_images_auth_read ON product_images
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_images.product_id
            AND p.status = 'published'
        )
    );

-- Service role (admin): full access
CREATE POLICY product_images_service_all ON product_images
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- INQUIRIES
-- ============================================================

-- NO direct access for anon or authenticated
-- All access via service_role (Cloudflare Pages Functions)

-- Service role (server): insert, read, update, delete
CREATE POLICY inquiries_service_all ON inquiries
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- SITE SETTINGS
-- ============================================================

-- Anonymous: read settings
CREATE POLICY site_settings_anon_read ON site_settings
    FOR SELECT TO anon
    USING (true);

-- Authenticated: read settings
CREATE POLICY site_settings_auth_read ON site_settings
    FOR SELECT TO authenticated
    USING (true);

-- Service role: full access
CREATE POLICY site_settings_service_all ON site_settings
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- ADMIN USERS
-- ============================================================

-- NO direct access for anon or authenticated
-- Admin membership is private

-- Service role: full access (for provisioning)
CREATE POLICY admin_users_service_all ON admin_users
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- STORAGE POLICIES
-- ============================================================
-- Note: Storage bucket policies are created in migration 008
-- This migration only covers database tables