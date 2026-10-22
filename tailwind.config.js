/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Norbu Design System - Dark Premium
        obsidian: '#141311',
        'deep-charcoal': '#24211E',
        'antique-gold': '#C5A36A',
        'warm-ivory': '#F2EBDD',
        'soft-stone': '#B8B0A5',
        'muted-bronze': '#8D7150',
        // Semantic aliases
        background: '#141311',
        surface: '#24211E',
        primary: '#C5A36A',
        'primary-hover': '#D4B580',
        'text-primary': '#F2EBDD',
        'text-secondary': '#B8B0A5',
        'text-muted': '#8D7150',
        border: '#3A3530',
        focus: '#C5A36A',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.35', letterSpacing: '0.01em' }],
        'heading-md': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      spacing: {
        'space-0': '0',
        'space-1': '0.25rem',  // 4px
        'space-2': '0.5rem',   // 8px
        'space-3': '0.75rem',  // 12px
        'space-4': '1rem',     // 16px
        'space-5': '1.25rem',  // 20px
        'space-6': '1.5rem',   // 24px
        'space-8': '2rem',     // 32px
        'space-10': '2.5rem',  // 40px
        'space-12': '3rem',    // 48px
        'space-16': '4rem',    // 64px
        'space-20': '5rem',    // 80px
        'space-24': '6rem',    // 96px
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1440px',
      },
      borderRadius: {
        'radius-sm': '0.25rem',
        'radius-md': '0.375rem',
        'radius-lg': '0.5rem',
        'radius-xl': '0.75rem',
        'radius-full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        'elevated': '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        'focus': '0 0 0 3px #C5A36A',
      },
    },
  },
  plugins: [],
}