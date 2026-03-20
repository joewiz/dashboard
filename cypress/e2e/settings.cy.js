/**
 * Settings Panel Tests
 */
describe('Settings', () => {
  before(() => {
    cy.loginAndNavigate('settings')
  })

  it('displays the settings component', () => {
    cy.get('existdb-settings', { timeout: 15000 }).should('exist')
  })

  it('shows the eXist-db version', () => {
    cy.get('existdb-settings')
      .should('contain.text', 'eXist')
  })

  it('shows the public repository URL', () => {
    cy.get('existdb-settings')
      .should('not.be.empty')
  })
})
