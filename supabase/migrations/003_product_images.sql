-- Migration 003: Product Images table
-- Creates the product_images table for managing product galleries

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Product images table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_display_order ON product_images(product_id, display_order);
CREATE INDEX idx_product_images_is_cover ON product_images(product_id, is_cover);

-- Constraint: only one cover image per product
CREATE UNIQUE INDEX idx_product_images_one_cover_per_product
    ON product_images(product_id)
    WHERE is_cover = true;

-- Trigger to update product updated_at when images change
CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products SET updated_at = NOW() WHERE id = COALESCE(NEW.product_id, OLD.product_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_on_image_change
    AFTER INSERT OR UPDATE OR DELETE ON product_images
    FOR EACH ROW
    EXECUTE FUNCTION update_product_timestamp();

-- Grant permissions
GRANT SELECT ON product_images TO anon;
GRANT SELECT ON product_images TO authenticated;
GRANT ALL ON product_images TO service_role;