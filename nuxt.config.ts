import { defineNuxtConfig } from "nuxt3";

const serverMiddleware = [
  // auth
  { path: "/v1/auth/signin", handler: "~/server/api/v1/auth/signin.ts" },
  { path: "/v1/auth/signup", handler: "~/server/api/v1/auth/signup.ts" },

  // client
  {
    path: "/v1/client/profile/reset-password",
    handler: "~/server/api/v1/client/profile/reset-password.ts",
  },
  { path: "/v1/client/profile", handler: "~/server/api/v1/client/profile.ts" },
  { path: "/v1/client/devices", handler: "~/server/api/v1/client/devices.ts" },
  { path: "/v1/client/reports", handler: "~/server/api/v1/client/reports.ts" },
  { path: "/v1/client/rooms", handler: "~/server/api/v1/client/rooms.ts" },
  {
    path: "/v1/client/statistics",
    handler: "~/server/api/v1/client/statistics.ts",
  },

  // guard
  {
    path: "/v1/guard/profile/reset-password",
    handler: "~/server/api/v1/guard/profile/reset-password.ts",
  },
  { path: "/v1/guard/profile", handler: "~/server/api/v1/guard/profile.ts" },
  { path: "/v1/guard/reports", handler: "~/server/api/v1/guard/reports.ts" },
  { path: "/v1/guard/users", handler: "~/server/api/v1/guard/users.ts" },
  {
    path: "/v1/guard/statistics",
    handler: "~/server/api/v1/guard/statistics.ts",
  },

  // device
  { path: "/v1/device/report", handler: "~/server/api/v1/device/report.ts" },
  { path: "/v1/device/sync", handler: "~/server/api/v1/device/sync.ts" },
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
    DEVICE_KEY: process.env.DEVICE_KEY,
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
