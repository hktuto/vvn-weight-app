// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@sidebase/nuxt-auth', '@nuxt/ui', '@nuxtjs/color-mode'],
  auth : {
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
    globalAppMiddleware: true
  },
  
})
