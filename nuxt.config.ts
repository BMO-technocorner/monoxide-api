import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  alias: {
    "@": "/<rootDir>",
    assets: "/<rootDir>/assets",
    public: "/<rootDir>/public",
  },
});
