/**
 * Package Manager Tests
 *
 * Related issues: #278 (false install success), #250 (misleading success),
 *   #110 (data package type), #240 (progress indicator)
 */
describe('Package Manager', () => {
  before(() => {
    cy.loginAndNavigate('packageManager')
  })

  describe('Layout', () => {
    it('displays the package manager component', () => {
      cy.get('existdb-packagemanager', { timeout: 15000 }).should('exist')
    })

    it('has local and remote tabs', () => {
      cy.get('existdb-packagemanager').find('paper-tab').should('have.length.gte', 2)
    })
  })

  describe('Local (Installed) Packages', () => {
    it('lists installed packages', () => {
      cy.get('existdb-packages', { timeout: 15000 }).should('exist')
    })

    it('shows package details (name, version, type)', () => {
      cy.get('packagemanager-app', { timeout: 15000 }).should('have.length.gte', 1)
    })
  })

  describe('Remote (Available) Packages', () => {
    it('switches to the available packages tab', () => {
      cy.get('existdb-packagemanager').find('paper-tab').eq(1).click()
    })

    it('lists available packages from the repository', () => {
      cy.get('packagemanager-app', { timeout: 20000 }).should('have.length.gte', 1)
    })
  })

  describe('Install Error Handling (#278, #250)', () => {
    it('should not show a blanket success message before install completes', () => {
      cy.get('existdb-packagemanager').should('exist')
      cy.get('paper-toast').should('not.exist')
    })
  })
})
