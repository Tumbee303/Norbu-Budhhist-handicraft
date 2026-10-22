-- Migration 004: Inquiries table
-- Creates the inquiries table for contact form submissions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Inquiries table
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_title_snapshot TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('new', 'read', 'replied', 'archived')) DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_product_id ON inquiries(product_id);

-- Trigger to update updated_at
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions - NO direct access for anon/authenticated
-- Only service_role (server) can insert, admin reads via service_role
GRANT SELECT ON inquiries TO service_role;
GRANT INSERT ON inquiries TO service_role;
GRANT UPDATE ON inquiries TO service_role;
GRANT DELETE ON inquiries TO service_role;

-- No grants to anon or authenticated - inquiries are private