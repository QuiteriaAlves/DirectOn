const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: false,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://youk-test.web.app'
  },
});