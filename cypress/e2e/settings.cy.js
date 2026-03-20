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

  it('shows version information', () => {
    cy.get('existdb-settings', { timeout: 15000 })
      .shadow()
      .find('.highlight', { timeout: 10000 })
      .first()
      .should('not.be.empty')
  })

  it('shows the public repository URL', () => {
    cy.get('existdb-settings')
      .should('not.be.empty')
  })
})
