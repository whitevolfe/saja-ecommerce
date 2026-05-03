import { Config } from 'tailwindcss';
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
          DEFAULT: '#1F3D2B',
          LIGHT: '#4F7D4A',
        },
        secondary: {
          DEFAULT: '#2E5E3F',
        },
        accent: {
          DEFAULT: '#D4AF37',
          TURMERIC: '#C58A2B',
          BROWN: '#8B5A2B',
        },
        background: {
          DEFAULT: '#F5F1E8',
          MAIN: '#F5F1E8',
          SECTION: '#E6D3B3',
          DARK: '#0F2A1C',
        },
        text: {
          PRIMARY: '#1A1A1A',
          SECONDARY: '#5A5A5A',
          LIGHT: '#FFFFFF',
          MUTED: '#A3A3A3',
        },
        glass: {
          WHITE: 'rgba(255, 255, 255, 0.25)',
          BORDER: 'rgba(255, 255, 255, 0.4)',
          SHADOW: 'rgba(0, 0, 0, 0.15)',
          SHINE: 'rgba(255, 255, 255, 0.6)',
        },
        gradients: {
          GREEN: 'from-[#1F3D2B] to-[#2E5E3F]',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
        },
        foreground: '#1A1A1A',
      },
      gradientColor: {
        GREEN: 'from-[#1F3D2B] to-[#2E5E3F]',
      },
      glassBadge: {
        PILL: 'rounded-full',
        GLASS: 'bg-opacity-25 backdrop-filter-blur-sm shadow-sm',
      },
      buttonVariants: {
        PRIMARY: 'bg-[#1F3D2B] hover:bg-[#4F7D4A]',
        SECONDARY: 'bg-[#D4AF37] hover:bg-[#C58A2B]',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar-background))',
        foreground: 'hsl(var(--sidebar-foreground))',
        primary: 'hsl(var(--sidebar-primary))',
        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        accent: 'hsl(var(--sidebar-accent))',
        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        border: 'hsl(var(--sidebar-border))',
        ring: 'hsl(var(--sidebar-ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
