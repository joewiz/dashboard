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
    cy.get('existdb-login', { timeout: 10000 }).should('exist')
  })

  it('login link opens a dialog when clicked', () => {
    cy.get('existdb-login', { timeout: 10000 })
      .shadow()
      .find('a#login')
      .click({ force: true })
    // Dialog should open inside the login component
    cy.get('existdb-login')
      .shadow()
      .find('.dialog-overlay[open]', { timeout: 5000 })
      .should('exist')
  })
})
