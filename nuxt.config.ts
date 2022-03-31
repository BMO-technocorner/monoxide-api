import { defineNuxtConfig } from "nuxt3";
import { v1 as v1Api } from "./server/api";

export default defineNuxtConfig({
  serverMiddleware: [...v1Api],
  modules: ["@nuxtjs/color-mode"],
  buildModules: [
    "~/modules/google-fonts",
    "nuxt-typed-router",
    "@nuxtjs/tailwindcss",
    "@nuxt-modules/compression",
  ],
  colorMode: {
    classSuffix: "",
  },
  tailwindcss: {
    cssPath: "~/assets/styles/base.scss",
    configPath: "~/tailwind.config.ts",
  },
  googleFonts: {
    download: true,
    families: {
      Montserrat: {
        wght: [300, 400, 600, 700, 800],
        ital: [300, 400, 600, 700, 800],
      },
    },
  },
  compression: {
    algorithm: "brotliCompress",
  },
  typescript: {
    strict: true,
  },
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  },
  privateRuntimeConfig: {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
  },
  compilerOptions: {
    types: ["@nuxt/types", "@types/aos"],
  },
});
