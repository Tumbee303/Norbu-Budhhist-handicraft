-- Migration 001: Categories table
-- Creates the categories table for the 5 fixed product categories

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_display_order ON categories(display_order);
CREATE INDEX idx_categories_is_visible ON categories(is_visible);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed the 5 fixed categories
INSERT INTO categories (id, name, slug, description, display_order, is_visible) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Thangka Paintings', 'thangka-paintings', 'Traditional Buddhist scroll paintings on cotton or silk, depicting deities, mandalas, and sacred narratives.', 1, true),
    ('22222222-2222-2222-2222-222222222222', 'Buddha Statues', 'buddha-statues', 'Handcrafted statues in bronze, brass, wood, and stone — from desktop size to life-scale pieces.', 2, true),
    ('33333333-3333-3333-3333-333333333333', 'Singing Bowls', 'singing-bowls', 'Hand-hammered bronze bowls for meditation, sound healing, and ceremonial use.', 3, true),
    ('44444444-4444-4444-4444-444444444444', 'Prayer Wheels', 'prayer-wheels', 'Traditional mani wheels containing mantra rolls, for accumulating merit through rotation.', 4, true),
    ('55555555-5555-5555-5555-555555555555', 'Mandala Art', 'mandala-art', 'Sacred geometric designs — painted, carved, or sand — representing the universe in Buddhist cosmology.', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- Grant permissions
GRANT SELECT ON categories TO anon;
GRANT SELECT ON categories TO authenticated;
GRANT ALL ON categories TO service_role;