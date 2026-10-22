-- Migration 006: Admin Users table
-- Creates the admin_users table linking to Supabase Auth
-- Only ONE authorized admin in v1 - provisioned manually

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin users table (references auth.users)
CREATE TABLE admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- Grant permissions
GRANT SELECT ON admin_users TO service_role;
GRANT INSERT ON admin_users TO service_role;
GRANT UPDATE ON admin_users TO service_role;
GRANT DELETE ON admin_users TO service_role;

-- No grants to anon or authenticated - admin membership is private