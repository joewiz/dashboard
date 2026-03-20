/**
 * Launcher / Public Page Tests
 *
 * Tests the public-facing launcher page that lists installed applications.
 * Covers: page load, app listing, login link, branding, version display.
 * Related issues: #276 (blank page), #277 (invalid module import), #122 (Safari compat)
 */
describe('Launcher (Public Page)', function () {
  beforeEach(function () {
    cy.visit('/dashboard/index.html')
  })

  it('should load without a blank page (#276)', function () {
    cy.get('body').should('not.be.empty')
    cy.get('existdb-launcher-app').should('exist')
  })

  it('should display the eXist-db branding', function () {
    cy.get('existdb-launcher-app')
      .shadowGet('existdb-branding')
      .should('have.length.gte', 1)
  })

  it('should display the eXist-db version', function () {
    cy.get('existdb-launcher-app')
      .shadowGet('existdb-version')
      .should('have.length.gte', 1)
  })

  it('should list installed applications', function () {
    cy.get('existdb-launcher-app')
      .shadowGet('existdb-launcher')
      .shadowGet('.launcher-app', { timeout: 10000 })
      .should('have.length.gte', 1)
  })

  it('should have a login link', function () {
    cy.get('existdb-launcher-app')
      .shadowGet('app-toolbar')
      .shadowFind('a#login')
      .should('exist')
  })

  it('should navigate to login page when login is clicked', function () {
    cy.get('existdb-launcher-app')
      .shadowGet('app-toolbar')
      .shadowFind('a#login')
      .shadowClick()
    cy.url().should('include', '/dashboard/login.html')
  })
})
