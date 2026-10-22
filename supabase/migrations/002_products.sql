-- Migration 002: Products table
-- Creates the products table with all fields per spec

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    materials TEXT,
    origin TEXT,
    dimensions TEXT,
    artist TEXT,
    care_notes TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_category_status ON products(category_id, status);
CREATE INDEX idx_products_published_at ON products(published_at);

-- Trigger to update updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to set published_at when status changes to published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    ELSIF NEW.status != 'published' THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_published_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION set_published_at();

-- Grant permissions
GRANT SELECT ON products TO anon;
GRANT SELECT ON products TO authenticated;
GRANT ALL ON products TO service_role;