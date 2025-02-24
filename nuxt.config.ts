// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    cdnURL: "./",
    head: {
      title: "Music Play",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-17",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});