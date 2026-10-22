-- Admin Provisioning Script
-- Run this AFTER all migrations are applied
-- Creates the single authorized admin user

-- ============================================================
-- INSTRUCTIONS
-- ============================================================
-- 1. Create the admin user in Supabase Auth Dashboard:
--    - Go to Authentication > Users
--    - Click "Invite User" or "Create User"
--    - Email: [ADMIN_AUTH_EMAIL] (replace with actual email)
--    - Password: Set a strong password
--    - Auto-confirm: Yes
--
-- 2. Copy the user's UUID from the Auth dashboard
--
-- 3. Run this script with the UUID:
--    psql -h your-project.supabase.co -U postgres -d postgres -f provision_admin.sql
--    Or run in Supabase SQL Editor with the UUID substituted
--
-- 3. Enable MFA for the admin user (recommended):
--    - In Supabase Dashboard > Authentication > Users
--    - Find the admin user
--    - Enable MFA (TOTP)

-- ============================================================
-- PROVISION ADMIN (replace UUID_HERE with actual auth.users.id)
-- ============================================================

DO $$
DECLARE
    admin_user_id UUID := 'UUID_HERE'; -- REPLACE THIS
BEGIN
    -- Verify the user exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = admin_user_id) THEN
        RAISE EXCEPTION 'User with ID % not found in auth.users. Create the user first in Supabase Auth.', admin_user_id;
    END IF;

    -- Insert into admin_users
    INSERT INTO admin_users (user_id, is_active)
    VALUES (admin_user_id, true)
    ON CONFLICT (user_id) DO UPDATE SET
        is_active = true,
        created_at = EXCLUDED.created_at;

    RAISE NOTICE 'Admin user % provisioned successfully', admin_user_id;
END $$;

-- ============================================================
-- VERIFY
-- ============================================================
SELECT au.user_id, u.email, au.is_active, au.created_at
FROM admin_users au
JOIN auth.users u ON u.id = au.user_id
WHERE au.is_active = true;