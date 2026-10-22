// Structured Data (JSON-LD) Generation for Norbu Buddhist Handicraft

// Types defined inline to avoid import issues
interface Product {
  title: string;
  slug: string;
  description: string;
  materials?: string | null;
  origin?: string | null;
  dimensions?: string | null;
  artist?: string | null;
  careNotes?: string | null;
  images?: Array<{ storagePath: string }>;
}

interface SiteSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  whatsappE164: string;
  address: string;
  mapsUrl: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl: string;
}

const BASE_URL = import.meta.env.PROD ? 'https://norbu.example.com' : 'http://localhost:5173';

// Default site settings for structured data (fallback)
const DEFAULT_SITE_SETTINGS: {
  storeName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
} = {
  storeName: 'Norbu Buddhist Handicraft',
  tagline: 'Traditional Art. Timeless Elegance.',
  contactEmail: '[BUSINESS_EMAIL]',
  phone: '[BUSINESS_PHONE]',
  address: '[STORE_STREET_ADDRESS], [CITY_NEPAL]',
  instagramUrl: '[INSTAGRAM_URL]',
  facebookUrl: '[FACEBOOK_URL]',
};

export function generateOrganizationSchema(settings?: Partial<typeof DEFAULT_SITE_SETTINGS>): object {
  const s = { ...DEFAULT_SITE_SETTINGS, ...settings };
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: s.storeName,
    description: s.tagline,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    telephone: s.phone,
    email: s.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.split(',')[0]?.trim() || '[STORE_STREET_ADDRESS]',
      addressLocality: s.address.split(',').slice(1).join(',').trim() || '[CITY_NEPAL]',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.7172,
      longitude: 85.3240,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      s.instagramUrl || 'https://instagram.com/norbubuddhist',
      s.facebookUrl || 'https://facebook.com/norbubuddhist',
    ],
    priceRange: '$$',
    currenciesAccepted: 'NPR, USD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  };
}

export function generateProductSchema(product: {
  title: string;
  slug: string;
  description: string;
  materials?: string | null;
  origin?: string | null;
  dimensions?: string | null;
  artist?: string | null;
  careNotes?: string | null;
  images?: Array<{ storagePath: string }>;
}, category: { name: string; slug: string }): object {
  const productUrl = `https://norbu.example.com/products/${product.slug}`;
  const imageUrl = product.images?.[0]?.storagePath
    ? `https://norbu.example.com/storage/v1/object/public/${product.images[0].storagePath}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: imageUrl ? [imageUrl] : undefined,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: 'Norbu Buddhist Handicraft',
    },
    category: category.name,
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      availability: 'https://schema.org/InStoreOnly',
      priceCurrency: 'NPR',
      seller: {
        '@type': 'Store',
        name: 'Norbu Buddhist Handicraft',
      },
      description: 'Price available upon inquiry. Contact store for current pricing.',
    },
    ...(product.materials && { material: product.materials }),
    ...(product.origin && { manufacturer: { '@type': 'Organization', name: product.origin } }),
    ...(product.artist && { creator: { '@type': 'Person', name: product.artist } }),
    ...(product.dimensions && { depth: product.dimensions }),
    ...(product.careNotes && { additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Care Instructions',
        value: product.careNotes,
      },
    ]}),
  };
}

export function generateCategorySchema(category: { name: string; slug: string; description: string }): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://norbu.example.com/collection/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: category.name,
      description: category.description,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Norbu Buddhist Handicraft',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/collection?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}