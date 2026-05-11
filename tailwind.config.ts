import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3A2E',
          LIGHT: '#2E5A46',
          DARK: '#0F1F18',
        },

        secondary: {
          DEFAULT: '#2E5A46',
        },

        accent: {
          DEFAULT: '#C8A24A',
          LIGHT: '#D6B25E',
          DARK: '#A8842F',
        },

        background: {
          DEFAULT: '#046e3f',
          MAIN: '#046e3f',
          SECTION: '#0F1F18',
          CARD: '#046e3f',
          SOFT: '#046e3f',
        },

        foreground: '#F3F4F2',

        // =========================
        // ONLY CHANGE IS HERE 👇
        // =========================
        card: {
          DEFAULT: '#ffffff',
          FOREGROUND: '#0B1410',
        },

        productCard: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          HOVER: 'rgba(255,255,255,0.10)',
        },

        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          LIGHT: 'rgba(255,255,255,0.12)',
        },

        glass: {
          BASE: 'rgba(255, 255, 255, 0.06)',
          SOFT: 'rgba(255, 255, 255, 0.08)',
          ELEVATED: 'rgba(255, 255, 255, 0.12)',
          GREEN_TINT: 'rgba(31, 58, 46, 0.35)',
          BORDER_LIGHT: 'rgba(255, 255, 255, 0.14)',
          BORDER_DARK: 'rgba(0, 0, 0, 0.25)',
          SHINE: 'rgba(255, 255, 255, 0.18)',
        },
      },

      backgroundImage: {
        HERO: 'linear-gradient(135deg, #0B1410 0%, #13241C 50%, #1F3A2E 100%)',
        GOLD: 'linear-gradient(135deg, #C8A24A 0%, #D6B25E 100%)',
      },

      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.35)',
        hover: '0 12px 40px rgba(0,0,0,0.5)',
        gold: '0 4px 20px rgba(200,162,74,0.25)',
      },

      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [animate],
} satisfies Config;
