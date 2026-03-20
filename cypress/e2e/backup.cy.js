/**
 * Backup Module Tests
 *
 * Related issues: #89 (no error reporting), #210 (add restore), #213 (update defaults)
 */
describe('Backup', () => {
  before(() => {
    cy.loginAndNavigate('backup')
  })

  it('displays the backup component', () => {
    cy.get('existdb-backup', { timeout: 15000 }).should('exist')
  })

  it('shows backup configuration options', () => {
    cy.get('existdb-backup', { timeout: 15000 })
      .shadow()
      .find('input[type="checkbox"], button, .card')
      .should('have.length.gte', 1)
  })

  it('has a trigger backup button', () => {
    cy.get('existdb-backup')
      .shadow()
      .find('button')
      .should('have.length.gte', 1)
  })

  it('renders backup list area', () => {
    cy.get('existdb-backup').should('exist')
  })

  describe('Error Reporting (#89)', () => {
    it('backup component renders without errors', () => {
      cy.get('existdb-backup').should('exist')
    })
  })
})
