/**
 * Launcher / Public Page Tests
 *
 * Related issues: #276 (blank page), #277 (invalid module import), #122 (Safari)
 */
describe('Launcher (Public Page)', () => {
  beforeEach(() => {
    cy.visit('/dashboard/index.html')
  })

  it('loads without a blank page (#276)', () => {
    cy.get('body').should('not.be.empty')
    cy.get('existdb-launcher-app').should('exist')
  })

  it('displays the eXist-db branding', () => {
    cy.get('existdb-branding', { timeout: 10000 }).should('exist')
  })

  it('displays the eXist-db version string', () => {
    cy.get('existdb-version', { timeout: 10000 }).should('exist')
  })

  it('lists installed applications', () => {
    cy.get('existdb-launcher', { timeout: 10000 }).should('exist')
  })

  it('has a login link in the toolbar', () => {
    cy.get('a#login').should('exist')
  })

  it('navigates to login page when login is clicked', () => {
    cy.get('a#login').click()
    cy.url().should('include', '/dashboard/login.html')
  })
})
