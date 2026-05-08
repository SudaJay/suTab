/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        ink: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        accent2: 'rgb(var(--accent2-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
      },
      boxShadow: {
        air: '0 1px 2px rgba(0,0,0,.04), 0 18px 48px -24px rgba(37,39,60,.28)',
        lift: '0 10px 30px -18px rgba(25,27,45,.35)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(.22,.61,.36,1)',
      },
    },
  },
  plugins: [],
}

