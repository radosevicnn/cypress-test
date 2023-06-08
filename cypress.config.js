const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://cypress.vivifyscrum-stage.com',
    env: {
      API_URL: 'https://cypress-api.vivifyscrum-stage.com/api/v2',
      EMAIL: 'sovasova@gmail.com',
      PASSWORD: 'sova12345678'
    }
  },
});
