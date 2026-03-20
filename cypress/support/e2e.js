// Support file for Cypress 15+
// With includeShadowDom: true in cypress.config.js,
// all cy.get/cy.find commands automatically pierce shadow DOM.

/**
 * Login and navigate to the admin dashboard.
 * Uses cy.session to cache the login across tests within a spec.
 */
Cypress.Commands.add('login', (user = 'admin', pass = '') => {
  cy.session([user, pass], () => {
    cy.visit('/dashboard/login.html')
    cy.get('#user').should('be.visible').type(user)
    if (pass) {
      cy.get('#password').type(pass)
    } else {
      cy.get('#password').clear()
    }
    cy.get('.button').click()
    cy.url({ timeout: 15000 }).should('include', '/dashboard/admin')
  })
  // Always navigate to admin after session restore
  cy.visit('/dashboard/admin#/launcher')
  cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
})

// Map logical section names to URL hash values
const sectionMap = {
  launcher: 'launcher',
  packageManager: 'packagemanager',
  userManager: 'usermanager',
  backup: 'backup',
  settings: 'settings',
}

/**
 * Login and navigate directly to a specific admin section.
 */
Cypress.Commands.add('loginAndNavigate', (section = 'launcher') => {
  const hash = sectionMap[section] || section
  cy.session(['admin', ''], () => {
    cy.visit('/dashboard/login.html')
    cy.get('#user').should('be.visible').type('admin')
    cy.get('#password').clear()
    cy.get('.button').click()
    cy.url({ timeout: 15000 }).should('include', '/dashboard/admin')
  })
  cy.visit(`/dashboard/admin#/${hash}`)
  cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
  // Wait for the shadow DOM to be fully populated
  cy.get('existdb-dashboard').shadow().find('nav.drawer', { timeout: 15000 }).should('exist')
})
