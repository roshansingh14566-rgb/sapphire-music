/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['DM Sans', 'ui-sans-serif', 'system-ui'] },
      colors: { ink: '#090b10', panel: '#11151d', muted: '#9299a8', accent: '#7c5cff' },
    },
  },
  plugins: [],
}
