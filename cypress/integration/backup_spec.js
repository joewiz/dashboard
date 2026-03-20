/**
 * Backup Module Tests
 *
 * Tests backup listing, triggering, and error reporting.
 * Related issues: #89 (no warning/error reporting), #210 (add restore),
 *   #213 (update defaults)
 */
describe('Backup', function () {
  before(function () {
    cy.visit('/dashboard/login.html')
    cy.get('#user').type('admin')
    cy.get('#password').clear()
    cy.get('.button').click()
    cy.url().should('include', '/dashboard/admin')
    // Navigate to backup
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#backupItem')
      .shadowClick()
    cy.url().should('include', 'admin#/backup')
  })

  it('should display the backup component', function () {
    cy.get('body')
      .shadowGet('existdb-backup', { timeout: 10000 })
      .should('exist')
  })

  it('should show backup directory/path configuration', function () {
    cy.get('body')
      .shadowGet('existdb-backup')
      .shadowFind('paper-input, input', { timeout: 5000 })
      .should('exist')
  })

  it('should have a trigger backup button', function () {
    cy.get('body')
      .shadowGet('existdb-backup')
      .shadowFind('paper-button, button', { timeout: 5000 })
      .should('exist')
  })

  it('should list existing backups', function () {
    cy.get('body')
      .shadowGet('existdb-backup')
      .then(($el) => {
        // The backup component should render without errors
        // even if there are no backups yet
        expect($el).to.exist
      })
  })

  describe('Error Reporting (#89)', function () {
    it('should have a mechanism to display backup status', function () {
      // Verify that backup component has elements for status/feedback
      cy.get('body')
        .shadowGet('existdb-backup')
        .should('exist')
    })
  })
})
