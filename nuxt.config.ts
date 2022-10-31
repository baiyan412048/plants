// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    jwtSignSecret: 'baiyan_plants',
    public: {
      googleClientId:
        '362209664715-2cf8fvfkjrjbidvj2hb7a92a5qt2rp68.apps.googleusercontent.com'
    }
  },
  css: ['@/assets/base/_reset.sass', '@/assets/base/_base.sass']
})
