/**
 * Settings Panel Tests
 */
describe('Settings', () => {
  beforeEach(() => {
    cy.loginAndNavigate('settings')
  })

  it('displays the settings component', () => {
    cy.get('existdb-settings', { timeout: 15000 }).should('exist')
  })

  it('shows version information', () => {
    cy.get('existdb-settings', { timeout: 15000 })
      .shadow()
      .find('.card', { timeout: 10000 })
      .first()
      .should('contain.text', 'Version')
  })

  it('shows the public repository URL section', () => {
    cy.get('existdb-settings', { timeout: 15000 })
      .shadow()
      .find('.card')
      .should('have.length.gte', 2)
  })
})
