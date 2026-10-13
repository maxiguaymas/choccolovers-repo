/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          950: '#120A07',
          900: '#1A0F0B',
          850: '#22130E',
          800: '#2A1610',
          700: '#3E2723',
          600: '#5D4037',
          500: '#795548',
          200: '#D7CCC8',
          100: '#EFEBE9',
          50: '#FAF7F5',
        },
        gold: {
          light: '#F8E8B4',
          DEFAULT: '#D4AF37',
          dark: '#B38A22',
          foil: '#BF953F',
          shimmer: '#FCF6BA',
        },
        cream: {
          50: '#FFFEFC',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EAE1D2',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 15, 11, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
        'luxury-hover': '0 30px 60px -15px rgba(26, 15, 11, 0.15), 0 0 1px 1px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      },
      animation: {
        'slow-zoom': 'zoom 25s alternate infinite ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shine': 'shine 1.4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
    },
  },
  plugins: [],
}