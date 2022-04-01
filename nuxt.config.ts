import { defineNuxtConfig } from "nuxt3";

const serverMiddleware = [
  // v1 API
  { path: "/v1/auth/signin", handler: "~/server/api/v1/auth/signin.ts" },
  { path: "/v1/auth/signup", handler: "~/server/api/v1/auth/signup.ts" },
  { path: "/v1/devices", handler: "~/server/api/v1/devices.ts" },
  { path: "/v1/profile", handler: "~/server/api/v1/profile.ts" },
  { path: "/v1/reports", handler: "~/server/api/v1/reports.ts" },
  { path: "/v1/users", handler: "~/server/api/v1/users.ts" },
];

export default defineNuxtConfig({
  modules: ["@nuxtjs/color-mode"],
  buildModules: [
    "~/modules/google-fonts",
    "nuxt-typed-router",
    "@nuxtjs/tailwindcss",
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
  typescript: {
    strict: true,
  },
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  },
  privateRuntimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  compilerOptions: {
    types: [
      "@nuxt/types",
      "@types/aos",
      "@types/bcrypt",
      "@types/jsonwebtoken",
    ],
  },
  build: {
    transpile: ["@heroicons/vue"],
  },
  serverMiddleware,
});
