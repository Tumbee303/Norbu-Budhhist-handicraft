// Build-time sitemap and robots.txt generation
// Run with: npx tsx scripts/generate-sitemap.ts

import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://norbu.example.com';

// Categories (matching src/data/categories.ts)
const CATEGORIES = [
  { id: 'cat-1', slug: 'thangka-paintings', name: 'Thangka Paintings', description: 'Traditional Buddhist scroll paintings on cotton or silk, depicting deities, mandalas, and sacred narratives.', displayOrder: 1, isVisible: true, imagePlaceholder: '[THANGKA_PAINTINGS_PHOTO]' },
  { id: 'cat-2', slug: 'buddha-statues', name: 'Buddha Statues', description: 'Handcrafted statues in bronze, brass, wood, and stone — from desktop size to life-scale pieces.', displayOrder: 2, isVisible: true, imagePlaceholder: '[BUDDHA_STATUES_PHOTO]' },
  { id: 'cat-3', slug: 'singing-bowls', name: 'Singing Bowls', description: 'Hand-hammered bronze bowls for meditation, sound healing, and ceremonial use.', displayOrder: 3, isVisible: true, imagePlaceholder: '[SINGING_BOWLS_PHOTO]' },
  { id: 'cat-4', slug: 'prayer-wheels', name: 'Prayer Wheels', description: 'Traditional mani wheels containing mantra rolls, for accumulating merit through rotation.', displayOrder: 4, isVisible: true, imagePlaceholder: '[PRAYER_WHEELS_PHOTO]' },
  { id: 'cat-5', slug: 'mandala-art', name: 'Mandala Art', description: 'Sacred geometric designs — painted, carved, or sand — representing the universe in Buddhist cosmology.', displayOrder: 5, isVisible: true, imagePlaceholder: '[MANDALA_ART_PHOTO]' },
];

// Mock products (matching src/data/products.ts)
const PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'gold-gilded-shakyamuni-thangka',
    updatedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'prod-2',
    slug: 'bronze-medicine-buddha-statue',
    updatedAt: '2026-02-05T11:00:00Z',
  },
  {
    id: 'prod-3',
    slug: 'seven-metal-hammered-singing-bowl',
    updatedAt: '2026-02-18T10:00:00Z',
  },
  {
    id: 'prod-4',
    slug: 'copper-mani-prayer-wheel',
    updatedAt: '2026-03-03T09:00:00Z',
  },
  {
    id: 'prod-5',
    slug: 'sand-mandala-chenrezig',
    updatedAt: '2026-03-12T12:00:00Z',
  },
];

function generate() {
  console.log('Generating sitemap.xml and robots.txt...');

  try {
    const staticRoutes = [
      { url: BASE_URL, changefreq: 'weekly', priority: 1.0 },
      { url: `${BASE_URL}/our-story`, changefreq: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/collection`, changefreq: 'weekly', priority: 0.9 },
      { url: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.7 },
      { url: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: 0.3 },
    ];

    const categoryRoutes = CATEGORIES
      .filter((cat) => cat.isVisible)
      .map((cat) => ({
        url: `${BASE_URL}/collection/${cat.slug}`,
        changefreq: 'weekly' as const,
        priority: 0.8,
      }));

    const productRoutes = PRODUCTS.map((product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastmod: product.updatedAt,
      changefreq: 'monthly' as const,
      priority: 0.6,
    }));

    const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes
  .map((route) => {
    let entry = `  <url>\n    <loc>${route.url}</loc>`;
    if (route.lastmod) entry += `\n    <lastmod>${route.lastmod}</lastmod>`;
    if (route.changefreq) entry += `\n    <changefreq>${route.changefreq}</changefreq>`;
    if (route.priority !== undefined) entry += `\n    <priority>${route.priority.toFixed(1)}</priority>`;
    entry += `\n  </url>`;
    return entry;
  })
  .join('\n')}

</urlset>`;

    const robots = `# Norbu Buddhist Handicraft - Robots.txt
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/

# Sitemap
Sitemap: https://norbu.example.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 10
`;

    // Write files to public folder
    const publicDir = resolve(__dirname, '../public');
    mkdirSync(publicDir, { recursive: true });
    writeFileSync(resolve(__dirname, '../public/sitemap.xml'), sitemap);
    writeFileSync(resolve(__dirname, '../public/robots.txt'), `# Norbu Buddhist Handicraft - Robots.txt
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/

# Sitemap
Sitemap: https://norbu.example.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 10
`);

    console.log('✅ sitemap.xml generated');
    console.log('✅ robots.txt generated');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generate();