/**
 * Authentication Tests
 *
 * Related issues: #129 (side panel not visible when already logged in)
 */
describe('Authentication', () => {
  describe('Login Flow', () => {
    it('displays the login form', () => {
      cy.visit('/dashboard/login.html')
      cy.get('#user').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('.button').should('be.visible')
    })

    it('logs in with valid admin credentials', () => {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url({ timeout: 15000 }).should('include', '/dashboard/admin')
    })

    it('rejects invalid credentials', () => {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').type('wrongpassword')
      cy.get('.button').click()
      cy.url().should('not.include', '/dashboard/admin')
    })
  })

  describe('Authenticated Session (#129)', () => {
    beforeEach(() => {
      cy.login()
    })

    it('shows the admin sidebar when already logged in', () => {
      cy.get('app-drawer-layout', { timeout: 10000 }).should('exist')
      cy.get('app-drawer').should('exist')
    })

    it('shows navigation items in the sidebar', () => {
      cy.get('paper-item', { timeout: 15000 }).should('have.length.gte', 4)
    })

    it('shows toolbar', () => {
      cy.get('app-toolbar', { timeout: 15000 }).should('exist')
    })
  })

  describe('Logout', () => {
    it('logs out and redirects to launcher', () => {
      cy.login()
      cy.get('paper-item#logout', { timeout: 15000 }).click({ force: true })
      cy.url({ timeout: 15000 }).should('include', 'dashboard/index.html?logout=true')
    })
  })
})
