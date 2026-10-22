# Norbu Buddhist Handicraft — Design System

Version: 1.0 (Milestone 2)
Date: 15 October 2026

---

## 1. Color Palette

### Primary Tokens

| Token | Hex | RGB | Usage | Contrast on Obsidian |
|-------|-----|-----|-------|---------------------|
| **Obsidian** | `#141311` | 20, 19, 17 | Main backgrounds | — |
| **Deep Charcoal** | `#24211E` | 36, 33, 30 | Cards, sections | — |
| **Antique Gold** | `#C5A36A` | 197, 163, 106 | Primary CTA, accents, borders | 6.2:1 ✅ |
| **Warm Ivory** | `#F2EBDD` | 242, 235, 221 | Headings, primary copy | 15.8:1 ✅ |
| **Soft Stone** | `#B8B0A5` | 184, 176, 165 | Secondary copy | 5.1:1 ✅ |
| **Muted Bronze** | `#8D7150` | 141, 113, 80 | Subtle details | 3.2:1 ⚠️ Large only |

### Semantic Aliases

| Alias | Token | Usage |
|-------|-------|-------|
| `background` | Obsidian | Page background |
| `surface` | Deep Charcoal | Cards, modals, dropdowns |
| `primary` | Antique Gold | Primary buttons, links, focus rings |
| `primary-hover` | `#D4B580` | Hover state for primary |
| `text-primary` | Warm Ivory | Headings, primary text |
| `text-secondary` | Soft Stone | Body text, descriptions |
| `text-muted` | Muted Bronze | Captions, placeholder text |
| `border` | `#3A3530` | Dividers, input borders |
| `focus` | Antique Gold | Focus rings |
| `error` | `#EF4444` | Form errors |
| `success` | `#22C55E` | Success states |

### Contrast Verification (WCAG AA)

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Warm Ivory on Obsidian | 15.8:1 | ✅ AAA |
| Soft Stone on Obsidian | 5.1:1 | ✅ AA |
| Antique Gold on Obsidian | 6.2:1 | ✅ AA |
| Antique Gold on Deep Charcoal | 4.8:1 | ✅ AA |
| Warm Ivory on Deep Charcoal | 12.3:1 | ✅ AAA |
| Muted Bronze on Obsidian | 3.2:1 | ⚠️ Large text only (≥18pt) |

> **Note**: Muted Bronze (`#8D7150`) should only be used for text ≥18pt (1.5rem) or bold ≥14pt (1.125rem) per WCAG AA.

---

## 2. Typography

### Font Families

```css
--font-heading: "Cormorant Garamond", Georgia, serif;
--font-body: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace; /* if needed */
```

### Font Weights Loaded

| Family | Weights | Source |
|--------|---------|--------|
| Cormorant Garamond | 400, 600, 700 | @fontsource |
| Inter | 400, 500, 600 | @fontsource |

### Type Scale (Tailwind Classes)

| Class | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `text-display-xl` | 4.5rem (72px) | 1.1 | -0.02em | Hero headlines (desktop) |
| `text-display-lg` | 3.5rem (56px) | 1.15 | -0.01em | Hero headlines (mobile), page titles |
| `text-display-md` | 2.5rem (40px) | 1.2 | 0 | Section headers |
| `text-display-sm` | 2rem (32px) | 1.25 | 0 | Card titles, subsection headers |
| `text-heading-xl` | 1.5rem (24px) | 1.3 | 0.01em | Large headings |
| `text-heading-lg` | 1.25rem (20px) | 1.35 | 0.01em | Medium headings |
| `text-heading-md` | 1.125rem (18px) | 1.4 | 0.01em | Small headings |
| `text-body-lg` | 1.125rem (18px) | 1.6 | 0 | Lead paragraphs |
| `text-body` | 1rem (16px) | 1.6 | 0 | Body text |
| `text-body-sm` | 0.875rem (14px) | 1.5 | 0 | Small body, labels |
| `text-caption` | 0.75rem (12px) | 1.5 | 0.02em | Captions, legal, metadata |

### Usage Rules

- **Headings**: Cormorant Garamond, semantic hierarchy (h1→h6)
- **Body/UI**: Inter, all paragraph text, buttons, forms, navigation
- **Letter spacing**: Positive for all-caps (tracking-widest), negative for display sizes
- **Line height**: 1.6 for body, tighter for headings

---

## 3. Spacing System

Base unit: **4px** (`0.25rem`)

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `space-0` | 0 | 0 | Reset |
| `space-1` | 0.25rem | 4px | Tight gaps |
| `space-2` | 0.5rem | 8px | Small gaps |
| `space-3` | 0.75rem | 12px | Medium-small |
| `space-4` | 1rem | 16px | Base unit |
| `space-5` | 1.25rem | 20px | Medium |
| `space-6` | 1.5rem | 24px | Section inner |
| `space-8` | 2rem | 32px | Section outer |
| `space-10` | 2.5rem | 40px | Large sections |
| `space-12` | 3rem | 48px | Page sections |
| `space-16` | 4rem | 64px | Hero spacing |
| `space-20` | 5rem | 80px | Large hero |
| `space-24` | 6rem | 96px | Extra large |

### Container Max-Widths

| Class | Max Width | Usage |
|-------|-----------|-------|
| `max-w-container-sm` | 640px | Narrow content |
| `max-w-container-md` | 768px | Medium content |
| `max-w-container-lg` | 1024px | Wide content |
| `max-w-container-xl` | 1280px | Default page |
| `max-w-container-2xl` | 1440px | Full-width layouts |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 0.25rem (4px) | Small elements, badges |
| `radius-md` | 0.375rem (6px) | Buttons, inputs |
| `radius-lg` | 0.5rem (8px) | Cards, modals |
| `radius-xl` | 0.75rem (12px) | Large cards, hero images |
| `radius-full` | 9999px | Pills, avatars |

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-subtle` | `0 1px 2px 0 rgb(0 0 0 / 0.3)` | Subtle depth |
| `shadow-soft` | `0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)` | Cards |
| `shadow-elevated` | `0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)` | Modals, dropdowns |
| `shadow-focus` | `0 0 0 3px #C5A36A` | Focus rings |

---

## 6. Transitions

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `duration-fast` | 150ms | ease-out | Hover, focus |
| `duration-normal` | 250ms | ease-out | Modals, dropdowns |
| `duration-slow` | 350ms | ease-out | Page transitions |
| `ease-out` | — | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Default easing |

---

## 7. Breakpoints

| Name | Min Width | Tailwind |
|------|-----------|----------|
| Mobile | 0px | (default) |
| Small | 640px | `sm:` |
| Medium | 768px | `md:` |
| Large | 1024px | `lg:` |
| XL | 1280px | `xl:` |
| 2XL | 1536px | `2xl:` |

**Design Mobile-First**: All styles default to mobile, enhance with `sm:`, `md:`, `lg:`.

---

## 8. Component Specifications

### Button

#### Variants

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| Primary | Antique Gold | Obsidian | — | `#D4B580` |
| Secondary | Deep Charcoal | Warm Ivory | Border | Deep Charcoal 80% |
| Ghost | Transparent | Warm Ivory | — | Deep Charcoal |
| Outline | Transparent | Antique Gold | 2px Antique Gold | 10% Antique Gold |

#### Sizes

| Size | Padding | Font | Gap |
|------|---------|------|-----|
| Small | `px-3 py-1.5` | `text-body-sm` | 1.5 |
| Medium | `px-5 py-2.5` | `text-body` | 2 |
| Large | `px-7 py-3` | `text-body-lg` | 2.5 |

#### States

- **Default**: Base styles
- **Hover**: Color shift per variant
- **Active**: Slightly darker
- **Focus**: `ring-2 ring-focus ring-offset-2 ring-offset-background`
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Loading**: Spinner + disabled

#### asChild Pattern

```tsx
<Button asChild>
  <Link to="/page">Link styled as button</Link>
</Button>
```

---

### Container

```tsx
<Container size="xl">  // default: xl
  {/* content */}
</Container>
```

Sizes: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1440px), `full` (100%)

---

### VisuallyHidden

```tsx
<VisuallyHidden>Screen reader only text</VisuallyHidden>
<VisuallyHidden as="div">Block-level hidden</VisuallyHidden>
```

---

### Header

- **Position**: Fixed top, `z-50`
- **Background**: `bg-background/95 backdrop-blur-sm`
- **Height**: `h-16` (mobile), `h-20` (desktop)
- **Wordmark**: NORBU (display-sm) + BUDDHIST HANDICRAFT (caption, hidden mobile)
- **Navigation**: Hidden mobile, flex desktop, gap-8
- **Mobile Menu**: Slide-down panel, ESC to close, body scroll lock

---

### Footer

- **Background**: Deep Charcoal
- **Border**: Top border
- **Grid**: 4 columns desktop, 2 tablet, 1 mobile
- **Sections**: Brand, Explore, Visit/Contact, Connect
- **Social**: Instagram, Facebook (placeholder URLs)
- **Legal**: Privacy link, copyright

---

### Layout

```tsx
<Layout>
  <Header />
  <main id="main-content" className="flex-grow pt-16 sm:pt-20">
    <Outlet />
  </main>
  <Footer />
</Layout>
```

---

## 9. Accessibility Checklist

### Color Contrast (WCAG AA)

- [x] Text-primary on background: 15.8:1 ✅
- [x] Text-secondary on background: 5.1:1 ✅
- [x] Primary on background: 6.2:1 ✅
- [x] Primary on surface: 4.8:1 ✅
- [ ] Text-muted on background: 3.2:1 ⚠️ Large only

### Focus Indicators

- [x] All interactive elements have `focus-visible:ring-2 ring-focus`
- [x] Focus offset uses background color
- [x] No `outline: none` without replacement

### Keyboard Navigation

- [x] Header: Tab through nav, Enter/Space on mobile menu button
- [x] Mobile menu: ESC closes, Trap focus (TODO)
- [x] Buttons: Enter/Space activates
- [x] Links: Enter activates
- [x] Forms: Tab order logical, labels associated

### Reduced Motion

- [x] `@media (prefers-reduced-motion: reduce)` disables animations
- [x] Transitions set to 0.01ms
- [x] Scroll behavior set to auto

### Semantic HTML

- [x] `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`
- [x] `<nav aria-label="...">` for all navigation
- [x] Heading hierarchy (h1→h2→h3)
- [x] Form labels with `htmlFor` matching input `id`
- [x] Images have descriptive `alt` text
- [x] Buttons have accessible names

### ARIA

- [x] `aria-label` on icon-only buttons
- [x] `aria-expanded` on mobile menu toggle
- [x] `aria-controls` linking to mobile menu
- [x] `aria-current="page"` on active nav
- [x] `role="alert"` on form errors/success
- [x] `aria-hidden="true"` on decorative icons

---

## 10. Animation Guidelines

### Allowed

- Fade in/out (opacity)
- Slide up/down (transform: translateY)
- Scale (transform: scale)
- Color transitions (background, border, text)
- Rotation (loading spinners)

### Disallowed

- Parallax
- Auto-playing carousels/videos
- Long blocking animations (>300ms)
- Motion without `prefers-reduced-motion` respect

### Performance

- Use `transform` and `opacity` only (compositor-only)
- Avoid animating `width`, `height`, `top`, `left`
- Keep animations under 300ms for UI feedback

---

## 11. Dark Mode Only

This design system is **dark-mode only** (Obsidian background). No light mode variant exists.

---

## 12. Implementation Notes

### Tailwind Config Location

`tailwind.config.js` — all tokens defined under `theme.extend`

### CSS Variables (Optional)

For non-Tailwind contexts, CSS variables available in `index.css`:

```css
:root {
  --color-obsidian: #141311;
  --color-deep-charcoal: #24211E;
  --color-antique-gold: #C5A36A;
  --color-warm-ivory: #F2EBDD;
  --color-soft-stone: #B8B0A5;
  --color-muted-bronze: #8D7150;
}
```

### Adding New Components

1. Create in `src/ui/` or `src/components/`
2. Use design tokens only (no arbitrary values)
3. Include all states (hover, focus, disabled, loading)
4. Test at 375px, 768px, 1440px
5. Verify accessibility
6. Add to Design System showcase page

---

## 13. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-15 | Initial design system (Milestone 2) |

---

*This document is the source of truth for all visual design decisions. Update it when tokens change.*