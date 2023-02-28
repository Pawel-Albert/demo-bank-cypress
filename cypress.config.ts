import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demo-bank.vercel.app/",
  },
  // viewportWidth: 1920,
  // viewportHeight: 1080,
});
