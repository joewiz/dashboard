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
      cy.get('existdb-dashboard', { timeout: 10000 }).should('exist')
      cy.get('existdb-dashboard').shadow().find('nav.drawer').should('exist')
    })

    it('shows navigation items in the sidebar', () => {
      cy.get('existdb-dashboard').shadow().find('button[role="menuitem"]').should('have.length.gte', 4)
    })

    it('shows the dashboard component', () => {
      cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
    })
  })

  describe('Logout', () => {
    it('logs out and redirects to launcher', () => {
      cy.login()
      cy.get('existdb-dashboard').shadow().find('button#logout').click()
      cy.url({ timeout: 15000 }).should('include', 'dashboard/index.html?logout=true')
    })
  })
})
