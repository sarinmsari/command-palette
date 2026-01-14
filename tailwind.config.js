/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          '-apple-system',
          'system-ui',
          '"Segoe UI"',
          '"Helvetica"',
          'Arial',
          'sans-serif',
          'Ubuntu',
          'Cantarell',
        ],
      },
      colors: {
        background: '#0f1011',
        highlight: '#191a1b',
        secondary: '#22c55e',
        danger: '#ef4444',
        muted: '#6b7280',
      },
    },
  },
  plugins: [],
}

