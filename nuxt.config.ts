// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  compatibilityDate: "2024-09-01",
  devServer: {
    host: "127.0.0.1",
  },
  modules: ["@nuxtjs/color-mode", "@nuxt/image", "@nuxt/eslint", "@nuxtjs/tailwindcss", "nuxt-time"],
  runtimeConfig: {
    apiUrl: "http://127.0.0.1:8080",
  },
  css: ["@/assets/styles/global.scss"],
  colorMode: {
    preference: "light",
  },
});
