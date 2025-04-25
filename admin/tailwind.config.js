/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#121212',
        charcoal: '#2A2A2A',
        gold: '#D4AF37',
        navy: '#1A2238',
        cream: '#F6F5F0',
    },
    },
  },
  plugins: [],
}