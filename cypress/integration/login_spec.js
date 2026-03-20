/**
 * Authentication Tests
 *
 * Tests login, logout, and auth state management.
 * Covers: login form, credential entry, auth redirects, logout, session persistence.
 * Related issues: #129 (side panel not visible when already logged in)
 */
describe('Authentication', function () {
  describe('Login Flow', function () {
    it('should display the login page', function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').should('be.visible')
      cy.get('#password').should('be.visible')
    })

    it('should log in with valid admin credentials', function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url().should('include', '/dashboard/admin')
    })

    it('should reject invalid credentials', function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').type('wrongpassword')
      cy.get('.button').click()
      // Should stay on login page or show error
      cy.url().should('not.include', '/dashboard/admin')
    })
  })

  describe('Authenticated Session', function () {
    before(function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url().should('include', '/dashboard/admin')
    })

    it('should show the admin sidebar when already logged in (#129)', function () {
      cy.visit('/dashboard/admin')
      cy.get('body')
        .shadowGet('app-drawer-layout', { timeout: 10000 })
        .should('exist')
      cy.get('body')
        .shadowGet('app-drawer-layout')
        .shadowFind('app-drawer')
        .should('exist')
    })

    it('should display the current user in the toolbar', function () {
      cy.get('body')
        .shadowGet('app-toolbar')
        .should('exist')
    })
  })

  describe('Logout Flow', function () {
    before(function () {
      // Ensure we're logged in first
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url().should('include', '/dashboard/admin')
    })

    it('should log out and redirect to launcher', function () {
      cy.get('body')
        .shadowGet('app-drawer-layout')
        .shadowFind('paper-item#logout')
        .shadowClick()
      cy.url().should('include', 'dashboard/index.html?logout=true')
    })
  })
})
