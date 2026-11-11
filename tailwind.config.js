/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '360px',
      'mob-lg': '480px',
      'sm': '640px',
      'md': '768px',
      'tablet-lg': '820px',
      'lg': '1024px',
      'xl': '1280px',
      'laptop-lg': '1366px',
      '2xl': '1440px',
      '3xl': '1600px',
      'fhd': '1920px',
      'uw': '2560px',
    },
    extend: {
      colors: {
        brand: {
          chocolate: '#320500', // Rich Belgian Couverture Espresso
          caramel: '#B25E00',   // Warm Artisan Caramel
          gold: '#D4B46A',      // Soft Champagne Gold
          peach: '#F5EAE0',     // Refined Warm Linen
          cream: '#FAF8F5',     // Pure Alabaster / Architectural Linen Background
        },
        surface: {
          light: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E8E2D9',
          muted: '#80736C',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['var(--font-heading)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cake-soft': '0 4px 20px -2px rgba(66, 6, 0, 0.08)',
        'cake-hover': '0 12px 28px -4px rgba(66, 6, 0, 0.16)',
        'cake-modal': '0 20px 40px -8px rgba(66, 6, 0, 0.24)',
      }
    },
  },
  plugins: [],
};

