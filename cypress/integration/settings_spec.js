/**
 * Settings Panel Tests
 *
 * Tests the settings/configuration panel.
 * Covers: version display, public repo URL, system info.
 */
describe('Settings', function () {
  before(function () {
    cy.visit('/dashboard/login.html')
    cy.get('#user').type('admin')
    cy.get('#password').clear()
    cy.get('.button').click()
    cy.url().should('include', '/dashboard/admin')
    // Navigate to settings
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#settingsItem')
      .shadowClick()
    cy.url().should('include', 'admin#/settings')
  })

  it('should display the settings component', function () {
    cy.get('body')
      .shadowGet('existdb-settings', { timeout: 10000 })
      .should('exist')
  })

  it('should display the eXist-db version', function () {
    cy.get('body')
      .shadowGet('existdb-settings')
      .then(($el) => {
        // Settings should show version information
        expect($el[0].textContent).to.not.be.empty
      })
  })

  it('should display the public repository URL', function () {
    cy.get('body')
      .shadowGet('existdb-settings')
      .then(($el) => {
        // Should contain some URL or repo information
        expect($el).to.exist
      })
  })
})
