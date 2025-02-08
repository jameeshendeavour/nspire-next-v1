import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Your Next.js app URL
    supportFile: 'cypress/support/e2e.ts', // Path to support file
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Pattern for test files
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: false,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
  },
});
