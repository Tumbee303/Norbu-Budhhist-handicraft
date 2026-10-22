# Norbu Buddhist Handicraft — Website

Informational/showcase website for Norbu Buddhist Handicraft, a Nepal-based store founded by Lobsang Norbu.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS 3 (Dark Premium design system)
- **Routing**: React Router DOM v7
- **Fonts**: Cormorant Garamond (headings) + Inter (body) via @fontsource
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Hosting**: Cloudflare Pages + Pages Functions
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 (flat config) + Prettier

## Project Structure

```
src/
├── components/       # Shared layout components (Header, Footer, Layout)
├── ui/               # Primitive UI components (Button, Container, VisuallyHidden)
├── hooks/            # Custom React hooks (useMobileMenu)
├── pages/            # Page components
│   ├── admin/        # Admin dashboard pages
│   └── *.tsx         # Public pages
├── test/             # Test setup
├── App.tsx           # Routing configuration
├── main.tsx          # Entry point
└── index.css         # Global styles + Tailwind
```

## Milestone 1 — Foundation (Current)

✅ **Completed**:
- React + Vite + TypeScript project initialized
- Tailwind CSS configured with Norbu design system (colors, typography, spacing)
- React Router DOM v7 configured with all public + admin routes
- ESLint 9 (flat config) with TypeScript, React Hooks, JSX-a11y
- Prettier configured
- Vitest + React Testing Library + jsdom setup
- Component library: Button, Container, VisuallyHidden, Header, Footer, Layout
- Placeholder pages for all routes (Home, Our Story, Collection, Category, Product, Contact, Privacy, 404, Admin)
- `.env.example` with fake placeholders
- Comprehensive `.gitignore`

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
cd norbu
npm install
```

### Development

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173`

### Build

```bash
npm run build
```

Production build outputs to `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint        # Check for errors
npm run lint -- --fix  # Auto-fix where possible
```

### Type Checking

```bash
npm run typecheck
```

### Testing

```bash
npm run test        # Run tests once
npm run test:watch  # Watch mode
```

### Formatting

```bash
npm run format
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (M4+) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes (M4+) |
| `VITE_TURNSTILE_SITE_KEY` | Turnstile site key | Yes (M6+) |

**Server-only secrets (set in Cloudflare Pages dashboard, NOT in .env):**
- `TURNSTILE_SECRET_KEY` — Turnstile secret for server verification
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role for admin operations

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Obsidian | `#141311` | Main backgrounds |
| Deep Charcoal | `#24211E` | Cards, sections |
| Antique Gold | `#C5A36A` | Accents, primary CTA |
| Warm Ivory | `#F2EBDD` | Headings, primary copy |
| Soft Stone | `#B8B0A5` | Secondary copy |
| Muted Bronze | `#8D7150` | Subtle details |

### Typography

- **Headings**: Cormorant Garamond (400, 600, 700)
- **Body/UI**: Inter (400, 500, 600)

### Spacing Scale

Base unit: 4px (`space-1` = 0.25rem)

## Routes

### Public

| Route | Component |
|-------|-----------|
| `/` | Home |
| `/our-story` | OurStory |
| `/collection` | CollectionIndex |
| `/collection/:categorySlug` | CategoryPage |
| `/products/:productSlug` | ProductDetailPage |
| `/contact` | Contact |
| `/privacy` | Privacy |
| `*` | NotFound |

### Admin (Protected — M5+)

| Route | Component |
|-------|-----------|
| `/admin/login` | AdminLogin |
| `/admin` | AdminDashboard |
| `/admin/products` | AdminProducts |
| `/admin/products/new` | AdminProductForm |
| `/admin/products/:id/edit` | AdminProductForm |
| `/admin/inquiries` | AdminInquiries |
| `/admin/settings` | AdminSettings |

## Placeholders (Do Not Publish)

The following placeholders are used throughout the codebase and **must be replaced with verified information before launch**:

| Placeholder | Description |
|-------------|-------------|
| `[STORE_STREET_ADDRESS]` | Verified store address |
| `[CITY_NEPAL]` | City in Nepal |
| `[GOOGLE_MAPS_URL]` | Business Google Maps link |
| `[BUSINESS_PHONE]` | Business phone number |
| `[WHATSAPP_E164]` | WhatsApp number in E.164 format |
| `[BUSINESS_EMAIL]` | Contact email |
| `[OPENING_HOURS]` | Store hours |
| `[INSTAGRAM_URL]` | Instagram profile URL |
| `[FACEBOOK_URL]` | Facebook profile URL |
| `[FOUNDING_YEAR]` | Establishment year (if confirmed) |
| `[ADMIN_AUTH_EMAIL]` | Admin email for Supabase Auth |
| `[HERO_BUDDHA_STATUE_PHOTO]` | Hero image — real Buddha statue from inventory |
| `[CATEGORY_PHOTOS]` | One real image per category |
| `[SHOP_EXTERIOR]` | Store exterior photo |
| `[SHOP_INTERIOR]` | Store interior photo |
| `[FOUNDER_PHOTO]` | Lobsang Norbu portrait (optional) |
| `[PRODUCT_INVENTORY_AND_DESCRIPTIONS]` | Actual product data |
| `[DOMAIN]` | Custom domain |
| `[CONTACT_RETENTION_PERIOD]` | Data retention policy |
| `[ADMIN_NOTIFICATION_METHOD]` | How admin gets notified |
| `[TURNSTILE_WIDGET]` | Turnstile widget placeholder |

## Next Milestones

- **M2**: Design system polish, accessibility verification
- **M3**: Public site content, product data abstraction
- **M4**: Supabase setup (migrations, RLS, Auth, Storage)
- **M5**: Admin dashboard (auth, product CRUD, image upload)
- **M6**: Inquiry system (Pages Function, Turnstile, Supabase insert)
- **M7**: Quality (SEO, a11y, performance, legal review)
- **M8**: Deploy to Cloudflare Pages, domain, handover

## Scripts Summary

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint check |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Run tests |
| `npm run format` | Format with Prettier |

## Deployment

### Cloudflare Pages

1. Connect GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output: `dist`
4. Add environment variables in Pages settings
5. Configure Pages Functions for `/api/*` routes
6. Set up SPA fallback: `/* /index.html 200`

### Supabase

1. Create project
2. Run migrations (M4)
3. Configure Auth (email provider, MFA)
4. Set up Storage buckets with policies
5. Enable Row Level Security

## License

Private — All rights reserved. Norbu Buddhist Handicraft.