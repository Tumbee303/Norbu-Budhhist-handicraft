# Supabase Setup Guide — Norbu Buddhist Handicraft

Version: 1.0 (Milestone 4)
Date: 15 October 2026

---

## Overview

This guide documents the complete Supabase setup for Norbu Buddhist Handicraft, including database migrations, Row Level Security (RLS), Storage buckets, Authentication, and admin provisioning.

**Stack**: Supabase (PostgreSQL, Auth, Storage) + Cloudflare Pages Functions

---

## Prerequisites

- Supabase account (free tier for development, Pro recommended for production)
- Node.js 20+ and npm
- Supabase CLI (`npm install -g supabase`)

---

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users (e.g., Singapore for Nepal/Asia)
3. Set a strong database password (save it securely)
4. Wait for project to provision (~2 minutes)

### Project Settings to Note

| Setting | Value |
|---------|-------|
| Project URL | `https://YOUR-PROJECT.supabase.co` |
| Anon Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| Service Role Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

> **Security**: Never commit keys to git. Use `.env` for local, Cloudflare Pages secrets for production.

---

## 2. Run Migrations

### Option A: Supabase CLI (Recommended)

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

### Option B: Supabase Dashboard SQL Editor

Run each migration file in order (001 through 008):

1. Go to **SQL Editor** in Supabase Dashboard
2. Create new query
3. Copy/paste each migration file content
4. Run each one
5. Verify in **Table Editor**

### Migration Order

| # | File | Description |
|---|------|-------------|
| 1 | `001_categories.sql` | 5 fixed categories |
| 2 | `002_products.sql` | Products table |
| 3 | `003_product_images.sql` | Product gallery images |
| 4 | `004_inquiries.sql` | Contact form submissions |
| 5 | `005_site_settings.sql` | Singleton site config |
| 6 | `006_admin_users.sql` | Admin linking table |
| 7 | `007_rls_policies.sql` | Row Level Security |
| 8 | `008_storage_buckets.sql` | Storage buckets + policies |

---

## 3. Verify Database

### Check Tables Exist

In **Table Editor**, verify these tables:
- `categories` (5 rows seeded)
- `products` (empty initially)
- `product_images` (empty)
- `inquiries` (empty)
- `site_settings` (1 row seeded)
- `admin_users` (empty)

### Check Indexes

Run in SQL Editor:
```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### Check RLS Enabled

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
-- All should show rowsecurity = true
```

### Check Policies

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Expected policies per table:
- `categories`: 3 policies (anon, auth, service)
- `products`: 3 policies
- `product_images`: 3 policies
- `inquiries`: 1 policy (service only)
- `site_settings`: 3 policies
- `admin_users`: 1 policy (service only)

---

## 4. Configure Storage

### Verify Buckets Created

In **Storage**, verify two buckets:
- `product-images-public` (Public: Yes)
- `product-images-private` (Public: No)

### Check Storage Policies

In **Storage > Policies**, verify:
- `product-images-public`: SELECT for anon, auth; ALL for service_role
- `product-images-private`: ALL for service_role only

### Test Upload (Admin Dashboard Later)

For now, test via SQL:
```sql
-- This should work for service_role
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('product-images-public', 'test.txt', auth.uid(), '{"size": 100}')
ON CONFLICT DO NOTHING;
```

---

## 5. Configure Authentication

### Email Provider

1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Configure:
   - **Confirm email**: Yes
   - **Secure email change**: Yes
   - **Auto-confirm**: No (for production), Yes (for dev)

### MFA (Recommended)

1. Go to **Authentication > Settings**
2. Enable **Multi-Factor Authentication**
3. Configure TOTP (Time-based One-Time Password)

### Session Settings

| Setting | Value |
|---------|-------|
| JWT Expiry | 3600 (1 hour) |
| Refresh Token Rotation | Enabled |
| Refresh Token Reuse Interval | 10 seconds |

---

## 6. Provision Admin User

### Step 1: Create User in Auth

1. Go to **Authentication > Users**
2. Click **Add User** > **Create New User**
3. Enter admin email: `[ADMIN_AUTH_EMAIL]`
4. Set strong password
5. **Auto-confirm**: Yes (for initial setup)
6. Click **Create User**

### Step 2: Get User UUID

1. Click the created user
2. Copy the **User UUID** (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 3: Run Provisioning Script

Edit `supabase/provision_admin.sql`:
```sql
DECLARE
    admin_user_id UUID := 'PASTE_UUID_HERE'; -- Replace with actual UUID
```

Run in **SQL Editor** or via CLI:
```bash
supabase db execute --file supabase/provision_admin.sql
```

### Step 4: Verify

```sql
SELECT au.user_id, u.email, au.is_active, au.created_at
FROM admin_users au
JOIN auth.users u ON u.id = au.user_id
WHERE au.is_active = true;
```

Should return 1 row with the admin email.

### Step 5: Enable MFA for Admin

1. Go to **Authentication > Users**
2. Find admin user
3. Click **...** > **Enable MFA**
4. Scan QR code with authenticator app

---

## 7. Environment Variables

### Local Development (`.env`)

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

### Cloudflare Pages (Production Secrets)

Set in **Cloudflare Pages > Settings > Environment Variables**:

| Variable | Value | Type |
|----------|-------|------|
| `VITE_SUPABASE_URL` | `https://YOUR-PROJECT.supabase.co` | Secret |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` | Secret |
| `VITE_TURNSTILE_SITE_KEY` | `your-turnstile-site-key` | Secret |
| `TURNSTILE_SECRET_KEY` | `your-turnstile-secret-key` | Secret |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` | Secret |

> **Critical**: Never expose `SERVICE_ROLE_KEY` or `TURNSTILE_SECRET_KEY` in client bundle.

---

## 8. Connect Frontend

### Install Supabase Client

```bash
cd norbu
npm install @supabase/supabase-js
```

### Create Client (`src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

### Type Generation (Optional)

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/supabase.ts
```

---

## 9. Test Checklist

### Public Read Access (No Auth)

```sql
-- Should work as anon
SELECT * FROM categories WHERE is_visible = true;
SELECT * FROM products WHERE status = 'published';
SELECT * FROM site_settings;
```

### Public Write Access (Blocked)

```sql
-- Should FAIL for anon
INSERT INTO products (category_id, title, slug, description, status)
VALUES ('11111111-1111-1111-1111-111111111111', 'Test', 'test', 'Test', 'published');
-- ERROR: permission denied

INSERT INTO inquiries (name, email, message)
VALUES ('Test', 'test@test.com', 'Test message');
-- ERROR: permission denied
```

### Admin Access (Service Role)

```sql
-- Should work with service_role key
SELECT * FROM products; -- All statuses
SELECT * FROM inquiries; -- All inquiries
UPDATE products SET status = 'published' WHERE id = '...';
```

### Storage Access

```sql
-- Public bucket: anon can read
SELECT * FROM storage.objects WHERE bucket_id = 'product-images-public';

-- Private bucket: anon cannot read
SELECT * FROM storage.objects WHERE bucket_id = 'product-images-private';
-- ERROR or empty result
```

---

## 10. Backup Strategy

### Automated Backups (Supabase Pro)

- Daily automated backups included
- Point-in-time recovery (7 days on Pro, 30 days on Enterprise)

### Manual Export (Free Tier)

```bash
# Export schema + data
supabase db dump --data-only > backup_data.sql
supabase db dump --schema-only > backup_schema.sql

# Or use pg_dump directly
pg_dump -h YOUR-PROJECT.supabase.co -U postgres -d postgres > full_backup.sql
```

### Scheduled Exports (GitHub Actions)

```yaml
# .github/workflows/backup.yml
name: Weekly Supabase Backup
on:
  schedule:
    - cron: '0 2 * * 0' # Weekly Sunday 2 AM
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Export database
        run: |
          pg_dump ${{ secrets.SUPABASE_DB_URL }} > backup_$(date +%Y%m%d).sql
      - name: Upload to artifact
        uses: actions/upload-artifact@v4
        with:
          name: supabase-backup
          path: backup_*.sql
```

---

## 11. Free Tier Limitations

| Resource | Free Tier Limit | Notes |
|----------|-----------------|-------|
| Database size | 500 MB | Sufficient for product catalog |
| Bandwidth | 2 GB/month | Monitor with images |
| Storage | 1 GB | Product images only |
| API requests | Unlimited | |
| Auth users | Unlimited | |
| Project pausing | After 1 week inactivity | See below |

### Project Pausing

**Free projects pause after ~1 week of inactivity.**

Solutions:
1. **Upgrade to Pro** ($25/month) — No pausing, larger limits
2. **Cron ping** — GitHub Action to hit API weekly
3. **Accept for dev** — Pause is fine for development

**Recommended**: Upgrade to Pro before commercial launch.

---

## 12. Security Checklist

- [ ] RLS enabled on all tables
- [ ] No anon/authenticated write access to products/inquiries
- [ ] Inquiries only writable by service_role
- [ ] Admin users table not readable by anon/auth
- [ ] Private storage bucket not publicly accessible
- [ ] Service role key only in Cloudflare secrets
- [ ] MFA enabled for admin
- [ ] Strong passwords for all accounts
- [ ] Email confirmation enabled
- [ ] HTTPS only (enforced by Cloudflare)

---

## 13. Troubleshooting

### Migration Fails

```bash
# Check migration status
supabase migration list

# Repair if needed
supabase migration repair --status reverted 20261015001
```

### RLS Blocking Expected Queries

```sql
-- Debug: check which policy is blocking
SET ROLE anon;
SELECT * FROM products WHERE status = 'published';
-- If empty, check policy: SELECT * FROM pg_policies WHERE tablename = 'products';
RESET ROLE;
```

### Storage Upload Fails

- Check bucket exists and is public/private as expected
- Check file size < 5MB
- Check MIME type in allowed list
- Verify service_role key used for uploads

### Auth Issues

- Verify email provider enabled
- Check redirect URLs in Auth settings
- For MFA: ensure time sync on device

---

## 14. Production Checklist

Before launching:

- [ ] All migrations applied
- [ ] RLS policies verified
- [ ] Storage buckets created with correct policies
- [ ] Admin user provisioned with MFA
- [ ] Environment variables set in Cloudflare Pages
- [ ] Service role key NOT in client bundle
- [ ] Turnstile configured (M6)
- [ ] Backup strategy documented
- [ ] Supabase Pro plan activated (or cron ping)
- [ ] Custom domain connected
- [ ] SSL/HTTPS verified

---

## 15. Rollback Plan

If migration breaks production:

1. **Supabase**: Use Point-in-Time Recovery (Pro only)
2. **Manual**: Restore from `pg_dump` backup
3. **Schema only**: Re-run migrations on fresh DB

```bash
# Restore from backup
psql -h YOUR-PROJECT.supabase.co -U postgres -d postgres < backup_full.sql
```

---

## Appendix: Migration Files Reference

All migrations in `supabase/migrations/`:
- `001_categories.sql`
- `002_products.sql`
- `003_product_images.sql`
- `004_inquiries.sql`
- `005_site_settings.sql`
- `006_admin_users.sql`
- `007_rls_policies.sql`
- `008_storage_buckets.sql`

Admin provisioning:
- `supabase/provision_admin.sql`

---

*This document is part of Milestone 4 deliverables. Update when schema changes.*