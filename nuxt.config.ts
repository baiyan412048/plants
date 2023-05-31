// https://nuxt.com/docs/api/configuration/nuxt-config
// http://localhost:3000
// https://api.baiyan777.com
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-icon', '@vueuse/nuxt', '@nuxt/image-edge'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.baiyan777.com',
      apiKey: 'baiyan_plants'
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
      ],
      meta: [{ name: 'theme-color', content: '#34BD32' }]
    }
  }
})
