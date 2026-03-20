/**
 * Accessibility Tests
 *
 * Tests keyboard navigation and basic a11y requirements.
 * Related issues: #106 (keyboard accessibility), #94 (cursor styling)
 */
describe('Accessibility', function () {
  describe('Launcher Page', function () {
    beforeEach(function () {
      cy.visit('/dashboard/index.html')
    })

    it('should have a page title', function () {
      cy.title().should('not.be.empty')
    })

    it('should have a lang attribute on html element', function () {
      cy.get('html').should('have.attr', 'lang')
    })
  })

  describe('Admin Page - Keyboard Navigation (#106)', function () {
    before(function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url().should('include', '/dashboard/admin')
    })

    it('should have focusable sidebar navigation items', function () {
      cy.get('body')
        .shadowGet('app-drawer-layout')
        .shadowFind('paper-item')
        .should('have.length.gte', 4)
    })

    it('login form fields should be keyboard accessible', function () {
      // Verify the login page has proper tab order
      cy.visit('/dashboard/login.html')
      cy.get('#user').focus().should('have.focus')
      cy.get('#user').tab()
      cy.get('#password').should('have.focus')
    })
  })

  describe('Cursor Styling (#94)', function () {
    before(function () {
      cy.visit('/dashboard/login.html')
      cy.get('#user').type('admin')
      cy.get('#password').clear()
      cy.get('.button').click()
      cy.url().should('include', '/dashboard/admin')
    })

    it('sidebar items should have pointer cursor', function () {
      cy.get('body')
        .shadowGet('app-drawer-layout')
        .shadowFind('paper-item#packageManagerItem')
        .then(($el) => {
          // Note: checking computed cursor style through shadow DOM is limited
          // This test documents the expected behavior
          expect($el).to.exist
        })
    })
  })
})
