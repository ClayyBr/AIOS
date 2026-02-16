import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

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
          DEFAULT: '#1a1a1a', // Dark background for elite feel
          50: '#f0f0f0',
          100: '#e1e1e1',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0d0d0d',
          950: '#050505',
        },
        secondary: {
          DEFAULT: '#3f3f46', // Slate-700
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          DEFAULT: '#ef4444', // Red-500 (Vibrant for CrossFit)
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },
      fontFamily: {
        heading: ['var(--font-oswald)', ...fontFamily.sans],
        body: ['var(--font-inter)', ...fontFamily.sans],
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'soft-md': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'soft-lg': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'soft-xl': '0 12px 24px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
