// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ["vue"], // 添加 vue 到 transpile 列表
  },

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

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  compatibilityDate: "2025-02-24",
});
