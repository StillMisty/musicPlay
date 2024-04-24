// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    cdnURL: "https://stillmisty.github.io/musicPlay",
    head: {
      title: "Music Play",
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: "#b3c0d3",
          },
        },
      },
    },
  },
});
