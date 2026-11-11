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
          chocolate: '#420600', // Dark Chocolate - Primary brand colour
          caramel: '#BA6300',   // Caramel Orange - Secondary brand colour
          gold: '#D9C477',      // Soft Gold - Decorative accents, badges
          peach: '#F5D9B5',     // Warm Peach - Promotional backgrounds
          cream: '#E6E7D4',     // Sage Cream - Main background
        },
        surface: {
          light: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E8E2D8',
          muted: '#7A6E65',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        sans: ['var(--font-body)', 'DM Sans', 'sans-serif'],
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

