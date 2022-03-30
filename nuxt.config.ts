import { defineNuxtConfig } from "nuxt3";
import { v1 as v1Api } from "./server/api";

export default defineNuxtConfig({
  optimizeCSS: true,
  serverMiddleware: [...v1Api],
  typescript: {
    strict: true,
  },
});
