import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          900: '#0F172A', 
          800: '#1E293B', 
          700: '#334155',
        },
        secondary: '#1E293B',
        textPrimary: '#E2E8F0',
        textSecondary: '#94A3B8',
        accent: {
          DEFAULT: '#8B5CF6',
          500: '#8B5CF6',
          900: '#5B21B6', // A darker violet for subtle shadow effects
        },
        border: '#334155',
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-inter)'], // Using Inter for headings as per SPEC
      },
      boxShadow: {
        'custom-violet': '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)', // Subtle violet shadow
      }
    },
  },
  plugins: [],
};

export default config;
