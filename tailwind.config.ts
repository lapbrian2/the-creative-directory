import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './plugins/**/*.ts',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#242430',
          500: '#2e2e3d',
        },
        cream: {
          50: '#fafaf5',
          100: '#f0efe6',
          200: '#e0dfd0',
          300: '#c8c7b4',
        },
        accent: {
          orange: '#ff6b35',
          'orange-hover': '#ff8555',
          blue: '#007aff',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(3rem, 8vw, 7rem)',
        section: 'clamp(2rem, 5vw, 4rem)',
        heading: 'clamp(1.5rem, 3vw, 2.5rem)',
      },
    },
  },
} satisfies Config
