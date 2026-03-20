// Support file for Cypress 15+
// With includeShadowDom: true in cypress.config.js,
// all cy.get/cy.find commands automatically pierce shadow DOM.

/**
 * Login via the API and navigate to admin dashboard.
 */
Cypress.Commands.add('login', (user = 'admin', pass = '') => {
  cy.request({
    method: 'POST',
    url: '/dashboard/login',
    form: true,
    body: { user, password: pass },
  })
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
  cy.request({
    method: 'POST',
    url: '/dashboard/login',
    form: true,
    body: { user: 'admin', password: '' },
  })
  cy.visit(`/dashboard/admin#/${hash}`)
  cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
  // Wait for shadow DOM to fully render - the dashboard's shadow root
  // may not be populated immediately after the element exists
  cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
  cy.wait(500)  // Allow Lit first render to complete
})
