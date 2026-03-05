export default defineNuxtConfig({
  compatibilityDate: '2025-03-05',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'The Creative Directory — AI Artists, Designers & Builders',
      meta: [
        { name: 'description', content: 'Discover top AI artists, graphic designers, and builders shaping the future of creative work.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'The Creative Directory' },
        { property: 'og:description', content: 'Discover top AI artists, graphic designers, and builders shaping the future of creative work.' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  build: {
    transpile: ['gsap'],
  },

  vite: {
    optimizeDeps: {
      include: ['gsap'],
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    tursoDbUrl: process.env.TURSO_DATABASE_URL || 'file:local.db',
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN || '',
  },

  routeRules: {
    '/api/creatives/**': { cors: true },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
  },
})
