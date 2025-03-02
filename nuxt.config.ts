// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ["vue"], // 添加 vue 到 transpile 列表
  },

  app: {
    head: {
      title: "爱莲说",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
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
