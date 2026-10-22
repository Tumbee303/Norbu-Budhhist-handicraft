import type { Product, Category } from '../data';

interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

const SITE_NAME = 'Norbu Buddhist Handicraft';
const DEFAULT_DESCRIPTION = 'Discover Thangka paintings, Buddha statues, singing bowls, prayer wheels, and Mandala art at Norbu Buddhist Handicraft — Traditional Art. Timeless Elegance. Nepal-based store founded by Lobsang Norbu.';
const BASE_URL = import.meta.env.PROD ? 'https://norbu.example.com' : 'http://localhost:5173';

export function generateProductSEO(product: Product, _category: Category): SEOMeta {
  const url = `${BASE_URL}/products/${product.slug}`;
  const image = product.images[0]?.placeholder || undefined;

  return {
    title: `${product.title} | ${SITE_NAME}`,
    description: product.description.slice(0, 160),
    canonical: url,
    ogImage: image ? `${BASE_URL}${image}` : undefined,
    ogType: 'product',
  };
}

export function generateCategorySEO(category: Category): SEOMeta {
  const url = `${BASE_URL}/collection/${category.slug}`;

  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: category.description.slice(0, 160),
    canonical: url,
    ogType: 'website',
  };
}

export function generatePageSEO(
  page: 'home' | 'our-story' | 'collection' | 'contact' | 'privacy',
  customTitle?: string,
  customDescription?: string
): SEOMeta {
  const pageData: Record<string, { title: string; description: string; path: string }> = {
    home: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      path: '/',
    },
    'our-story': {
      title: 'Our Story | Norbu Buddhist Handicraft',
      description: 'Learn about Lobsang Norbu\'s vision to share Buddhist art and handicrafts with the world. Founded on the belief that even the smallest piece of art can transform a space.',
      path: '/our-story',
    },
    collection: {
      title: 'Our Collections | Norbu Buddhist Handicraft',
      description: 'Explore five distinct collections: Thangka paintings, Buddha statues, singing bowls, prayer wheels, and Mandala art. Each piece selected for quality and authenticity.',
      path: '/collection',
    },
    contact: {
      title: 'Contact Us | Norbu Buddhist Handicraft',
      description: 'Visit our store in Nepal, send an inquiry, or reach us via WhatsApp. We\'re here to help you find the perfect piece.',
      path: '/contact',
    },
    privacy: {
      title: 'Privacy Policy | Norbu Buddhist Handicraft',
      description: 'Our privacy policy covering contact form data, inquiry storage, third-party services, and your rights.',
      path: '/privacy',
    },
  };

  const data = pageData[page];
  return {
    title: customTitle || data.title,
    description: customDescription || data.description,
    canonical: `${BASE_URL}${data.path}`,
    ogType: 'website',
  };
}

export function injectSEO(meta: SEOMeta): void {
  // Update document title
  document.title = meta.title;

  // Update or create meta tags
  const updateMeta = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let tag = document.querySelector<HTMLMetaElement>(selector);
    if (!tag) {
      tag = document.createElement('meta');
      if (property) tag.setAttribute('property', name);
      else tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  updateMeta('description', meta.description);
  updateMeta('og:title', meta.title, true);
  updateMeta('og:description', meta.description, true);
  updateMeta('og:type', meta.ogType || 'website', true);
  updateMeta('og:url', meta.canonical || window.location.href, true);
  updateMeta('og:site_name', SITE_NAME, true);
  if (meta.ogImage) updateMeta('og:image', meta.ogImage, true);
  updateMeta('twitter:card', 'summary_large_image');
  updateMeta('twitter:title', meta.title);
  updateMeta('twitter:description', meta.description);
  if (meta.ogImage) updateMeta('twitter:image', meta.ogImage);

  // Canonical link
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', meta.canonical || window.location.href);

  // Robots
  if (meta.noIndex) {
    updateMeta('robots', 'noindex, nofollow');
  } else {
    updateMeta('robots', 'index, follow');
  }
}

// Structured data generators
export function generateProductStructuredData(product: Product, category: Category): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0]?.placeholder ? `https://norbu.example.com${product.images[0].placeholder}` : undefined,
    brand: {
      '@type': 'Brand',
      name: 'Norbu Buddhist Handicraft',
    },
    category: category.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStoreOnly',
      priceCurrency: 'NPR',
      // No price displayed per spec
      seller: {
        '@type': 'Store',
        name: 'Norbu Buddhist Handicraft',
      },
    },
  };
}

export function generateOrganizationStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Norbu Buddhist Handicraft',
    description: 'Nepal-based store offering Buddhist art and handicrafts including Thangka paintings, Buddha statues, singing bowls, prayer wheels, and Mandala art.',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[STORE_STREET_ADDRESS]',
      addressLocality: '[CITY_NEPAL]',
      addressCountry: 'NP',
    },
    telephone: '[BUSINESS_PHONE]',
    email: '[BUSINESS_EMAIL]',
    sameAs: [
      '[INSTAGRAM_URL]',
      '[FACEBOOK_URL]',
    ],
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): object {
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