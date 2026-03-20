const { defineConfig } = require('cypress')

module.exports = defineConfig({
  hosts: {
    'localhost': '::1',
  },
  e2e: {
    baseUrl: 'http://localhost:8080/exist/apps',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    responseTimeout: 30000,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    video: false,
    screenshotOnRunFailure: true,
    includeShadowDom: true,
  },
  projectId: 'oa1f7q',
})
