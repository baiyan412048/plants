// https://nuxt.com/docs/api/configuration/nuxt-config
// http://localhost:3000
// https://api.baiyan777.com
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.baiyan777.com',
      apiKey: 'baiyan_plants'
    }
  },
  css: ['@/assets/base/_reset.sass', '@/assets/base/_base.sass'],
  app: {
    head: {
      meta: [{ name: 'theme-color', content: '#34BD32' }]
    }
  },
  googleFonts: {
    families: {
      'Noto+Sans+JP': [400, 500, 700],
      'Noto+Serif+JP': [400, 500, 700]
    }
  }
})
