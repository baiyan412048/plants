// https://nuxt.com/docs/api/configuration/nuxt-config
// http://localhost:3000/api/image/
// https://api.baiyan777.com/api/image
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-icon', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      baseUrl: 'https://192.168.100.28:3001',
      apiBaseUrl: 'http://localhost:3000'
    }
  },
  css: ['@/assets/base/_reset.sass', '@/assets/base/_base.sass'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700&display=swap'
        }
      ]
    }
  },
  generate: {
    routes: ['/privacy']
  }
})
