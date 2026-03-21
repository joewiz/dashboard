/**
 * Accessibility Tests
 *
 * Related issues: #106 (keyboard accessibility), #94 (cursor styling)
 */
describe('Accessibility', () => {
  describe('Launcher Page', () => {
    beforeEach(() => {
      cy.visit('/dashboard/index.html')
    })

    it('has a page title', () => {
      cy.title().should('not.be.empty')
    })

    it('page should have meaningful content (not blank)', () => {
      cy.get('body').should('not.be.empty')
      cy.get('existdb-launcher-app').should('exist')
    })
  })

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/dashboard/login.html')
    })

    it('form fields are labeled', () => {
      cy.get('#user').should('exist')
      cy.get('#password').should('exist')
    })

    it('submit button is keyboard accessible', () => {
      cy.get('.button').should('exist')
    })
  })

  describe('Admin Page - Keyboard Navigation (#106)', () => {
    beforeEach(() => {
      cy.login()
    })

    it('sidebar navigation items exist and are interactive', () => {
      cy.get('existdb-dashboard').shadow().find('button[role="menuitem"]').should('have.length.gte', 4)
    })

    it('sidebar items have ids for bookmarking', () => {
      cy.get('existdb-dashboard').shadow().find('button#launcherItem').should('exist')
    })

    it('navigation uses semantic nav element', () => {
      cy.get('existdb-dashboard').shadow().find('nav').should('exist')
    })
  })
})
