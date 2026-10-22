// Sitemap generation for Norbu Buddhist Handicraft
// Note: This is used at runtime for reference. Actual sitemap.xml is generated at build time via scripts/generate-sitemap.ts

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = import.meta.env.PROD ? 'https://norbu.example.com' : 'http://localhost:5173';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const staticRoutes: SitemapEntry[] = [
  { url: BASE_URL, changefreq: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/our-story`, changefreq: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/collection`, changefreq: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: 0.3 },
];

// Categories for reference - actual generation uses build-time script
const CATEGORY_SLUGS = [
  'thangka-paintings',
  'buddha-statues',
  'singing-bowls',
  'prayer-wheels',
  'mandala-art',
];

export function generateSitemap(): string {
  // Note: This is a runtime reference. The actual sitemap.xml is generated at build time
  // via scripts/generate-sitemap.ts and placed in public/sitemap.xml
  const categoryRoutes = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/collection/${slug}`,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticRoutes, ...categoryRoutes]
  .map((route) => {
    let entry = `  <url>\n    <loc>${route.url}</loc>`;
    if (route.changefreq) entry += `\n    <changefreq>${route.changefreq}</changefreq>`;
    if (route.priority !== undefined) entry += `\n    <priority>${route.priority.toFixed(1)}</priority>`;
    entry += `\n  </url>`;
    return entry;
  })
  .join('\n')}

</urlset>`;

  return sitemap;
}

export function generateRobotsTxt(): string {
  return `# Norbu Buddhist Handicraft - Robots.txt
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 10
`;
}