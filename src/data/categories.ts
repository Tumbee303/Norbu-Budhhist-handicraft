/**
 * Norbu Buddhist Handicraft — Categories Data
 * Fixed initial categories per spec (5 named types)
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'thangka-paintings',
    name: 'Thangka Paintings',
    description: 'Traditional Buddhist scroll paintings on cotton or silk, depicting deities, mandalas, and sacred narratives.',
    displayOrder: 1,
    isVisible: true,
    imagePlaceholder: '[THANGKA_PAINTINGS_PHOTO]',
  },
  {
    id: 'cat-2',
    slug: 'buddha-statues',
    name: 'Buddha Statues',
    description: 'Handcrafted statues in bronze, brass, wood, and stone — from desktop size to life-scale pieces.',
    displayOrder: 2,
    isVisible: true,
    imagePlaceholder: '[BUDDHA_STATUES_PHOTO]',
  },
  {
    id: 'cat-3',
    slug: 'singing-bowls',
    name: 'Singing Bowls',
    description: 'Hand-hammered bronze bowls for meditation, sound healing, and ceremonial use.',
    displayOrder: 3,
    isVisible: true,
    imagePlaceholder: '[SINGING_BOWLS_PHOTO]',
  },
  {
    id: 'cat-4',
    slug: 'prayer-wheels',
    name: 'Prayer Wheels',
    description: 'Traditional mani wheels containing mantra rolls, for accumulating merit through rotation.',
    displayOrder: 4,
    isVisible: true,
    imagePlaceholder: '[PRAYER_WHEELS_PHOTO]',
  },
  {
    id: 'cat-5',
    slug: 'mandala-art',
    name: 'Mandala Art',
    description: 'Sacred geometric designs — painted, carved, or sand — representing the universe in Buddhist cosmology.',
    displayOrder: 5,
    isVisible: true,
    imagePlaceholder: '[MANDALA_ART_PHOTO]',
  },
];

// Lookup helpers
export const CATEGORIES_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.slug, cat])
);

export const CATEGORIES_BY_ID: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.id, cat])
);

export const VISIBLE_CATEGORIES = CATEGORIES.filter((c) => c.isVisible);

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES_BY_SLUG[slug];
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES_BY_ID[id];
}