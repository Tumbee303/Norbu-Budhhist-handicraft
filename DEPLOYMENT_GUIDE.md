# Norbu Buddhist Handicraft — Deployment & Handover Guide

**Version:** 1.0 (Milestone 8)
**Date:** 18 October 2026
**Status:** Ready for deployment

---

## 📋 Deployment Checklist

### Pre-Deployment Verification

- [x] Production build succeeds (`npm run build`)
- [x] All tests pass (`npm run test`)
- [x] TypeScript compiles without errors (`npm run typecheck`)
- [x] Linting passes (`npm run lint`)
- [x] Sitemap.xml generated in `public/`
- [x] Robots.txt generated in `public/`
- [x] All milestones 1-7 complete

---

## 🌐 Cloudflare Pages Deployment

### 1. Create GitHub Repository

```bash
# From project root
git init
git add .
git commit -m "feat: Milestone 8 - Deploy ready"
# Create private repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/norbu-buddhist-handicraft.git
git push -u origin main
```

### 2. Configure Cloudflare Pages

1. Go to **Cloudflare Dashboard > Pages**
2. Click **Create a project** > **Connect to Git**
3. Select your GitHub repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| **Project name** | `norbu-buddhist-handicraft` |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (or `norbu` if repo root) |

### 3. Environment Variables (Cloudflare Pages Dashboard)

Go to **Settings > Environment variables** and add:

#### Public Variables (safe in browser)

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon key |
| `VITE_TURNSTILE_SITE_KEY` | `0x4...` | Turnstile site key |

#### Secret Variables (server-only, never in browser)

| Variable | Value | Description |
|----------|-------|-------------|
| `TURNSTILE_SECRET_KEY` | `0x4...` | Turnstile secret for verification |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase service role for admin ops |

### 4. Cloudflare Pages Functions

The `functions/api/contact.ts` file will be automatically deployed as `/api/contact`.

Verify in **Pages > Functions** that the route appears.

---

## 🗄️ Supabase Production Setup

### 1. Create Production Supabase Project

1. Go to [supabase.com](https://supabase.com) > **New Project**
2. Choose organization, name: `norbu-production`
3. Set strong database password (save in password manager)
4. Region: `ap-southeast-1` (Singapore) - closest to Nepal

### 2. Run Migrations

```bash
# Option A: Supabase CLI (recommended)
supabase link --project-ref YOUR_PROJECT_REF
supabase db push

# Option B: Dashboard SQL Editor
# Run each migration file in order:
# 001_categories.sql → 008_storage_buckets.sql
```

### 3. Configure Authentication

1. **Authentication > Providers** > Enable **Email**
2. **Settings** > Set:
   - **Confirm email**: `true`
   - **Secure email change**: `true`
   - **Auto-confirm**: `false` (production)
3. **Settings > MFA** > Enable TOTP

### 5. Configure Storage Buckets

In **Storage**, verify two buckets exist:
- `product-images-public` (Public: Yes)
- `product-images-private` (Public: No)

Verify policies match migration `008_storage_buckets.sql`.

### 6. Provision Admin User

1. **Authentication > Users** > **Add User**
   - Email: `admin@norbu.example.com` (your real email)
   - Password: Strong password
   - Auto-confirm: Yes

2. Get the user UUID, then run in SQL Editor:

```sql
INSERT INTO admin_users (user_id, is_active)
VALUES ('YOUR_USER_UUID_HERE', true)
ON CONFLICT (user_id) DO UPDATE SET is_active = true;
```

3. Enable MFA for admin user in **Authentication > Users**

---

## 🌍 Custom Domain & HTTPS

### 1. Add Domain in Cloudflare Pages

1. **Pages > Custom domains** > **Add domain**
2. Enter your domain (e.g., `norbuhandicraft.com`)
3. Cloudflare will provide DNS records

### 2. Configure DNS

Add these records in your DNS provider (or Cloudflare DNS):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `www` | `norbu-buddhist-handicraft.pages.dev` | Proxied |
| CNAME | `@` | `norbu-buddhist-handicraft.pages.dev` | Proxied |

### 3. SSL/TLS

- **SSL/TLS > Overview** > **Full (strict)**
- **Edge Certificates** > **Always Use HTTPS** > On
- **Edge Certificates** > **Automatic HTTPS Rewrites** > On

---

## 📧 Turnstile Configuration

### 1. Create Turnstile Site

1. Go to **Cloudflare > Turnstile**
2. **Add site**
3. Domain: `norbuhandicraft.com` (or your domain)
4. Widget mode: **Managed** (recommended)
5. Copy **Site Key** and **Secret Key**

### 2. Add Keys to Environments

- **VITE_TURNSTILE_SITE_KEY** → Cloudflare Pages env var (public)
- **TURNSTILE_SECRET_KEY** → Cloudflare Pages secret (secret)

---

## 🧪 Post-Deployment Smoke Tests

### Public Pages

| Page | Test |
|------|------|
| `/` | Home loads with hero, categories, founder preview |
| `/our-story` | Story page with founder content |
| `/collection` | All 5 categories displayed |
| `/collection/:slug` | Category page with product grid |
| `/products/:slug` | Product detail with images, details, inquiry buttons |
| `/contact` | Form submits, Turnstile works, inquiry stored in Supabase |
| `/privacy` | Privacy policy loads |
| `/404` | Friendly 404 page |

### Admin Dashboard

| Action | Test |
|--------|------|
| `/admin/login` | Email/password login works |
| `/admin` | Dashboard shows stats, recent inquiries |
| `/admin/products` | List, search, filter products |
| `/admin/products/new` | Create product with images, publish |
| `/admin/products/:id/edit` | Edit product, update images, change status |
| `/admin/inquiries` | List, filter, update status, view/delete |
| `/admin/settings` | Update contact info, social links, save |

### Functional Tests

- [ ] Contact form submits → inquiry appears in admin + Supabase
- [ ] Turnstile widget loads and verifies
- [ ] Product images upload to correct bucket (public/private)
- [ ] Published products appear on public site
- [ ] Draft/archived products hidden from public
- [ ] Featured products appear on home page
- [ ] WhatsApp links open with prefilled message
- [ ] Google Maps link opens correctly
- [ ] Sitemap.xml accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

---

## 📦 Backup & Monitoring Setup

### Supabase Backups

- **Pro plan**: Automatic daily backups + PITR (7 days)
- **Free tier**: Manual exports via CLI:
  ```bash
  supabase db dump --data-only > backup_$(date +%Y%m%d).sql
  ```
- Schedule weekly GitHub Action for exports (see `.github/workflows/backup.yml`)

### Monitoring

- **Cloudflare Analytics** > Pages > Enable
- **Supabase Dashboard** > Logs > Monitor errors
- **Cloudflare Turnstile** > Analytics > Monitor challenge rates

### Alerting (Optional)

- **Supabase** > Settings > Alerts > Configure webhook
- **Cloudflare** > Notifications > Pages deploy failures

---

## 📚 Owner Handover Documentation

### Daily Operations

#### Adding a Product
1. Go to `/admin` → Sign in
2. **Products** → **Add Product**
3. Fill required fields (name, category, description)
4. Upload images (max 10, 5MB each)
5. Fill verified details (materials, origin, dimensions, artist, care)
6. Set status: **Draft** → **Published** when ready
7. Toggle **Featured** for homepage highlight

#### Managing Inquiries
1. Go to **Inquiries** tab
2. New inquiries marked **New**
2. Open inquiry → **View** details
3. Update status: **New** → **Read** → **Replied**
4. **Delete** spam with confirmation

#### Updating Store Info
1. Go to **Settings** tab
2. Update contact info, hours, social links
3. **Save Settings** → Changes live immediately

### Monthly Maintenance

- [ ] Check WhatsApp link works
- [ ] Verify contact form submits
- [ ] Check Supabase storage usage
- [ ] Review inquiry response times
- [ ] Update dependencies: `npm update`
- [ ] Run `npm audit` for security

### Emergency Procedures

| Issue | Action |
|-------|--------|
| Site down | Check Cloudflare Pages status; check Supabase status |
| Form not working | Check Turnstile keys; check Cloudflare Functions logs |
| Images not loading | Check Supabase Storage bucket policies |
| Admin locked out | Use Supabase SQL to reset admin user |

---

## 📁 Project Structure Reference

```
norbu/
├── functions/
│   └── api/contact.ts          # Cloudflare Pages Function
├── public/
│   ├── sitemap.xml             # Auto-generated
│   └── robots.txt              # Auto-generated
├── scripts/
│   └── generate-sitemap.ts     # Build-time generation
├── src/
│   ├── admin/                  # Admin dashboard pages
│   ├── components/             # Shared components (Header, Footer, SEO, Layout)
│   ├── context/                # React context (Auth)
│   ├── data/                   # Mock data + types (dev only)
│   ├── hooks/                  # Custom hooks
│   ├── lib/
│   │   ├── seo/                # SEO utilities
│   │   └── supabase.ts         # Supabase client + types
│   ├── pages/                  # Public pages
│   ├── ui/                     # Primitive UI components
│   ├── App.tsx                 # Routing
│   └── main.tsx                # Entry point
├── supabase/
│   ├── migrations/             # 8 migration files
│   └── provision_admin.sql     # Admin provisioning
├── .env.example                # Template
├── wrangler.toml               # Cloudflare Pages config
├── DESIGN_SYSTEM.md            # Design documentation
├── SUPABASE_SETUP.md           # Supabase setup guide
└── README.md                   # Project overview
```

---

## 🔑 Credentials Summary (Fill In)

| Service | Credential | Location |
|---------|------------|----------|
| Supabase | Project URL | Cloudflare Pages env var |
| Supabase | Anon Key | Cloudflare Pages env var |
| Supabase | Service Role Key | Cloudflare Pages **secret** |
| Turnstile | Site Key | Cloudflare Pages env var |
| Turnstile | Secret Key | Cloudflare Pages **secret** |
| Supabase | Admin Email | Supabase Auth dashboard |
| Supabase | Admin Password | Password manager |
| Cloudflare | Account | cloudflare.com |
| GitHub | Repo | github.com/your/repo |

---

## 📞 Support Contacts

- **Cloudflare Support**: https://support.cloudflare.com
- **Supabase Support**: https://supabase.com/support
- **Turnstile Docs**: https://developers.cloudflare.com/turnstile

---

## ✅ Final Handover Confirmation

- [ ] All credentials documented and stored securely
- [ ] Owner can independently add/edit products
- [ ] Owner can manage inquiries
- [ ] Owner can update store settings
- [ ] Monthly maintenance checklist understood
- [ ] Emergency procedures documented
- [ ] Backup strategy implemented
- [ ] Monitoring configured

---

**Deployment complete! 🎉**

The Norbu Buddhist Handicraft website is ready for production use.