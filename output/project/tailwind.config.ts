import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['var(--font-oswald)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        primary: {
          50: '#F0F5FA',
          100: '#E0E9F4',
          200: '#C1D3E8',
          300: '#9FBBDC',
          400: '#7FA3D1',
          500: '#5F8DC5',
          600: '#4A71A4',
          700: '#355583',
          800: '#203962',
          900: '#0B1D41', // Dark blue for strong contrast
        },
        accent: {
          50: '#FFF7F0',
          100: '#FFEED9',
          200: '#FFDBB3',
          300: '#FFC88D',
          400: '#FFB566',
          500: '#FFA240', // Bright orange/gold for CTAs
          600: '#CC8233',
          700: '#996126',
          800: '#66411A',
          900: '#33200D',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
