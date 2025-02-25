// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  compatibilityDate: "2025-02-22",
  devServer: {
    host: "127.0.0.1",
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-time",
    "dayjs-nuxt",
  ],

  app: {
    head: {
      title: "Infoclock",
      meta: [
        {name: "description", content: "Infocom Clock"},
        {name: "robots", content: "noindex, nofollow"},
      ],
      link: [
        {rel: "apple-touch-icon", sizes: "180x180", href: "/manifest/apple-touch-icon.png"},
        {rel: "icon", type: "image/png", sizes: "32x32", href: "/manifest/favicon-32x32.png"},
        {rel: "icon", type: "image/png", sizes: "16x16", href: "/manifest/favicon-16x16.png"},
      ],
    },
  },

  css: ["@/assets/styles/global.css"],
  colorMode: {
    preference: "light",
  },

  dayjs: {
    defaultLocale: "fr",
    locales: ["fr"],
    defaultTimezone: "Europe/Brussels",
    plugins: ["timezone", "isBetween", "customParseFormat", "isoWeek"],
  }
});
