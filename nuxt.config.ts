// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ["vue"], // 添加 vue 到 transpile 列表
  },

  modules: ["@pinia/nuxt"],
  compatibilityDate: "2025-02-24",

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

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

  nitro: {
    routeRules: {
      // 为所有 public 中的资源设置缓存规则
      "/favicon.ico": { cache: { maxAge: 60 * 60 * 24 * 30 } }, // 30天缓存
      "/music/**": { cache: { maxAge: 60 * 60 * 24 * 7 } }, // 7天缓存音频文件
      "/videos/**": { cache: { maxAge: 60 * 60 * 24 * 7 } }, // 7天缓存视频文件
    },
  },
});
