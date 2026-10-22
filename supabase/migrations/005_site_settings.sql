-- Migration 005: Site Settings table
-- Creates the singleton site_settings table for public configuration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site settings table (singleton pattern with fixed ID)
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
    store_name TEXT NOT NULL DEFAULT 'Norbu Buddhist Handicraft',
    tagline TEXT NOT NULL DEFAULT 'Traditional Art. Timeless Elegance.',
    contact_email TEXT NOT NULL,
    phone TEXT,
    whatsapp_e164 TEXT,
    address TEXT NOT NULL,
    maps_url TEXT,
    opening_hours TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Constraint to ensure only one row exists
CREATE OR REPLACE FUNCTION enforce_single_site_settings()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT count(*) FROM site_settings) > 1 THEN
        RAISE EXCEPTION 'Only one site_settings row allowed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_site_settings_singleton
    BEFORE INSERT OR UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION enforce_single_site_settings();

-- Trigger to update updated_at
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default settings (will be replaced with real values)
INSERT INTO site_settings (id, contact_email, address) VALUES
    ('00000000-0000-0000-0000-000000000001', '[BUSINESS_EMAIL]', '[STORE_STREET_ADDRESS], [CITY_NEPAL]')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions - public read, admin write via service_role
GRANT SELECT ON site_settings TO anon;
GRANT SELECT ON site_settings TO authenticated;
GRANT ALL ON site_settings TO service_role;