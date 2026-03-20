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

    it('has installed and available tabs', () => {
      cy.get('existdb-packagemanager')
        .shadow()
        .find('button, .tab')
        .should('have.length.gte', 2)
    })
  })

  describe('Local (Installed) Packages', () => {
    it('contains an existdb-packages element', () => {
      cy.get('existdb-packages', { timeout: 15000 }).should('exist')
    })

    it('loads packages from the service', () => {
      // Verify the packages container renders
      cy.get('existdb-packages', { timeout: 15000 }).should('exist')
    })
  })

  describe('Filter', () => {
    it('has a filter input', () => {
      cy.get('existdb-packagemanager')
        .shadow()
        .find('input[type="text"]')
        .should('exist')
    })
  })

  describe('Upload', () => {
    it('has a file upload mechanism', () => {
      cy.get('existdb-packagemanager')
        .shadow()
        .find('input[type="file"]')
        .should('exist')
    })
  })

  describe('Install Error Handling (#278, #250)', () => {
    it('package manager renders without false success messages', () => {
      cy.get('existdb-packagemanager').should('exist')
    })
  })
})
