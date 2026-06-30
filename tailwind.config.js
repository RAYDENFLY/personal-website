/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#e28a95',
          light: '#f5c2ca',
          dark: '#c96b79',
          pale: '#fdf0f2',
          ultra: '#fef8f9',
        },
        gray: '#6b6b6b',
        dark: '#1a1a1a',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
