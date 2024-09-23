import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      background: '#fff',
      backgroundContrast: '#d4d4d4',
      textBlack: '#1d1d1f',
      black: '#000',
      white: '#fff',
    },
    fontSize: {
      xs: '.75rem', //12px
      sm: '.875rem', //14px
      base: '1.0625rem', //17px
      lg: ['1.1875rem', '1.21'], //19px
      xl: '1.3125rem', //21px
      '2xl': '1.5rem', //24px
      '3xl': '1.75rem', //28px
      '4xl': ['2.5rem', '1.1'], //40px
      '5xl': ['4.5rem', '1.05'], //72px
    },
    keyframes: {
    },
    animation: {
    },
    fontFamily: {
      headers: ['Cormorant', 'Kauhan Script', 'sans-serif'],
      sans: ['SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
