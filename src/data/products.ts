/**
 * Norbu Buddhist Handicraft — Mock Products Data
 * Development placeholder data — clearly marked as [PLACEHOLDER]
 * Real product data will come from Supabase in Milestone 4+
 */

import type { Product, ProductImage } from './types';

// Helper to create product images
const createImages = (productId: string, placeholders: string[]): ProductImage[] =>
  placeholders.map((placeholder, index) => ({
    id: `img-${productId}-${index + 1}`,
    productId,
    storagePath: `products/${productId}/${index + 1}.jpg`,
    altText: placeholder,
    displayOrder: index,
    isCover: index === 0,
    placeholder,
  }));

// Mock published products (one per category for testing)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    categoryId: 'cat-1',
    slug: 'gold-gilded-shakyamuni-thangka',
    title: 'Gold-Gilded Shakyamuni Buddha Thangka',
    description: 'A masterfully painted Thangka depicting Shakyamuni Buddha in the earth-touching mudra, seated on a lotus throne. The painting uses traditional mineral pigments on cotton canvas with extensive 24k gold leaf application on the Buddha\'s body and ornamental details. The background features a detailed landscape with offering goddesses and auspicious symbols. This piece follows the Karma Gardri style tradition.',
    materials: 'Cotton canvas, mineral pigments, 24k gold leaf',
    origin: 'Kathmandu Valley, Nepal — traditional Newar workshop',
    dimensions: '75 × 55 cm (painting), 95 × 72 cm (with silk brocade mount)',
    artist: 'Master Thangka painter Tenzin Norbu (lineage holder)',
    careNotes: 'Keep away from direct sunlight and humidity. Dust gently with a soft, dry brush. Do not use water or cleaning chemicals. Store rolled in acid-free paper when not displayed.',
    status: 'published',
    isFeatured: true,
    displayOrder: 1,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
    publishedAt: '2026-01-20T14:30:00Z',
    images: createImages('prod-1', ['[PRODUCT_1_MAIN]', '[PRODUCT_1_DETAIL_1]', '[PRODUCT_1_DETAIL_2]']),
  },
  {
    id: 'prod-2',
    categoryId: 'cat-2',
    slug: 'bronze-medicine-buddha-statue',
    title: 'Bronze Medicine Buddha Statue',
    description: 'A finely cast bronze statue of Bhaisajyaguru (Medicine Buddha) holding a myrobalan plant in his right hand and a medicine bowl in his left. The statue features a rich patina developed through traditional lost-wax casting. The Buddha sits in vajra posture on a double lotus base with intricate petal detailing. Suitable for personal shrine or meditation space.',
    materials: 'Bronze (copper-tin alloy) with natural patina',
    origin: 'Patan, Lalitpur, Nepal — Shakya clan workshop',
    dimensions: '25 × 18 × 12 cm (H×W×D), weight: ~2.3 kg',
    artist: 'Bronze caster Dharma Raj Shakya (4th generation)',
    careNotes: 'Handle with clean, dry hands. Dust with soft brush. Avoid moisture and extreme temperatures. The natural patina will deepen over time — do not polish.',
    status: 'published',
    isFeatured: true,
    displayOrder: 1,
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-02-05T11:00:00Z',
    publishedAt: '2026-02-05T11:00:00Z',
    images: createImages('prod-2', ['[PRODUCT_2_MAIN]', '[PRODUCT_2_DETAIL_1]']),
  },
  {
    id: 'prod-3',
    categoryId: 'cat-3',
    slug: 'seven-metal-hammered-singing-bowl',
    title: 'Seven-Metal Hand-Hammered Singing Bowl',
    description: 'Traditional Himalayan singing bowl hand-hammered from seven metals (gold, silver, copper, iron, tin, lead, mercury) corresponding to the seven planets. Produces rich, sustained fundamental tone with clear overtones. Includes wooden striker and silk cushion. Each bowl is unique — slight variations in shape and tone are characteristic of the handmade process.',
    materials: 'Seven-metal alloy (traditional composition)',
    origin: 'Kathmandu Valley, Nepal — traditional bowl makers',
    dimensions: 'Diameter: 22 cm, Height: 10 cm, Weight: ~1.1 kg',
    artist: 'Bowl maker family (name withheld per tradition)',
    careNotes: 'Store on included silk cushion. Clean with dry cloth only. Do not use water or abrasives. Play with gentle, consistent pressure for best tone.',
    status: 'published',
    isFeatured: false,
    displayOrder: 1,
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-02-18T10:00:00Z',
    publishedAt: '2026-02-18T10:00:00Z',
    images: createImages('prod-3', ['[PRODUCT_3_MAIN]', '[PRODUCT_3_DETAIL_1]']),
  },
  {
    id: 'prod-4',
    categoryId: 'cat-4',
    slug: 'copper-mani-prayer-wheel',
    title: 'Copper Mani Prayer Wheel with Mantra Roll',
    description: 'Traditional Tibetan mani wheel (khor lo) crafted from copper with brass fittings. Contains a tightly rolled mantra scroll with millions of "Om Mani Padme Hum" recitations. The wheel turns smoothly on a central spindle with a weighted chain for momentum. Spinning the wheel clockwise accumulates merit and spreads blessings. Decorated with eight auspicious symbols.',
    materials: 'Copper body, brass spindle and fittings, paper mantra roll',
    origin: 'Boudha, Kathmandu, Nepal — monastic workshop',
    dimensions: 'Wheel diameter: 15 cm, Total height: 32 cm, Weight: ~0.8 kg',
    artist: 'Monastic workshop (collective production)',
    careNotes: 'Keep in clean, dry place. Spin gently clockwise. Do not force the mechanism. The mantra roll is sealed — do not attempt to open.',
    status: 'published',
    isFeatured: false,
    displayOrder: 1,
    createdAt: '2026-03-01T11:00:00Z',
    updatedAt: '2026-03-03T09:00:00Z',
    publishedAt: '2026-03-03T09:00:00Z',
    images: createImages('prod-4', ['[PRODUCT_4_MAIN]']),
  },
  {
    id: 'prod-5',
    categoryId: 'cat-5',
    slug: 'sand-mandala-chenrezig',
    title: 'Chenrezig (Avalokiteshvara) Sand Mandala',
    description: 'Exquisite sand mandala depicting Chenrezig, the bodhisattva of compassion, in his four-armed form. Created grain by grain using traditional colored sand (crushed marble) following precise geometric proportions from the tantric texts. The mandala represents the pure land of the deity and is used as a meditation support. Comes in a sealed acrylic display case for preservation.',
    materials: 'Colored marble sand, acrylic display case, wooden base',
    origin: 'Monastic artists, Kopan Monastery, Kathmandu',
    dimensions: '40 × 40 cm (mandala), 45 × 45 × 5 cm (framed)',
    artist: 'Ven. Lama Tenzin Rinpoche and assistants',
    careNotes: 'Display case is sealed — do not open. Keep away from vibration and direct sunlight. The sand is fixed but may shift slightly over years.',
    status: 'published',
    isFeatured: true,
    displayOrder: 1,
    createdAt: '2026-03-10T16:00:00Z',
    updatedAt: '2026-03-12T12:00:00Z',
    publishedAt: '2026-03-12T12:00:00Z',
    images: createImages('prod-5', ['[PRODUCT_5_MAIN]', '[PRODUCT_5_DETAIL_1]', '[PRODUCT_5_DETAIL_2]']),
  },
  // Additional draft products for testing
  {
    id: 'prod-6',
    categoryId: 'cat-1',
    slug: 'green-tara-thangka',
    title: 'Green Tara Thangka',
    description: '[PLACEHOLDER] Beautiful Green Tara Thangka painting. Details pending verification.',
    materials: 'Cotton canvas, mineral pigments',
    origin: 'Kathmandu Valley, Nepal',
    dimensions: '60 × 45 cm',
    status: 'draft',
    isFeatured: false,
    displayOrder: 2,
    createdAt: '2026-04-01T10:00:00Z',
    updatedAt: '2026-04-01T10:00:00Z',
    publishedAt: null,
    images: createImages('prod-6', ['[PRODUCT_6_MAIN]']),
  },
  {
    id: 'prod-7',
    categoryId: 'cat-2',
    slug: 'wood-carved-amitabha',
    title: 'Wood-Carved Amitabha Buddha',
    description: '[PLACEHOLDER] Hand-carved sandalwood Amitabha statue. Details pending verification.',
    materials: 'Sandalwood',
    origin: 'Nepal',
    dimensions: '30 × 20 × 15 cm',
    status: 'draft',
    isFeatured: false,
    displayOrder: 2,
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-04-05T10:00:00Z',
    publishedAt: null,
    images: createImages('prod-7', ['[PRODUCT_7_MAIN]']),
  },
  {
    id: 'prod-8',
    categoryId: 'cat-1',
    slug: 'wheel-of-life-thangka',
    title: 'Wheel of Life (Bhavacakra) Thangka',
    description: '[PLACEHOLDER] Traditional Wheel of Life Thangka. Details pending verification.',
    status: 'archived',
    isFeatured: false,
    displayOrder: 3,
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
    publishedAt: null,
    images: createImages('prod-8', ['[PRODUCT_8_MAIN]']),
  },
];

// Helper functions
export function getPublishedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.status === 'published');
}

export function getProductsByCategory(categoryId: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId && p.status === 'published');
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug && p.status === 'published');
}

export function getFeaturedProducts(limit = 6): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.status === 'published' && p.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, limit);
}

export function getAllProductsForAdmin(): Product[] {
  return [...MOCK_PRODUCTS].sort((a, b) => {
    // Sort: published first, then draft, then archived
    const statusOrder = { published: 0, draft: 1, archived: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    // Then by updatedAt descending
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getProductsByCategoryForAdmin(categoryId: string): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.categoryId === categoryId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}