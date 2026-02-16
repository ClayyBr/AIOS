import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-main': '#0A0A0F',
        'surface-card': '#1A1A22',
        'accent-primary': '#6C63FF',
        'text-light': '#E0E0E0',
        'text-muted': '#A0A0A0',
        'accent-hover': '#8B83FF',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        inter: ['var(--font-inter)'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(108, 99, 255, 0.1), 0 2px 4px -1px rgba(108, 99, 255, 0.06)',
        'xl-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;
