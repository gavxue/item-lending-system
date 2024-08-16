import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http:localhost:5713',
    setupNodeEvents(on, config) {

    }
  },
});
