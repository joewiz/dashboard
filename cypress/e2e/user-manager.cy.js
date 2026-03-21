/**
 * User Manager Tests
 *
 * Related issues: #114/#93/#107 (admin password change), #92 (group creation 500),
 *   #76 (personal group), #77 (group managers missing), #91 (group view refresh),
 *   #275 (disable account)
 */
describe('User Manager', () => {
  beforeEach(() => {
    cy.loginAndNavigate('userManager')
  })

  describe('Component Loading', () => {
    it('displays the user manager wrapper', () => {
      cy.get('existdb-usermanager-app', { timeout: 15000 }).should('exist')
    })

    it('displays the user manager component', () => {
      cy.get('existdb-usermanager', { timeout: 15000 }).should('exist')
    })
  })

  describe('User Listing', () => {
    it('shows user list content', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .shadow()
        .find('li, .user-entry, [class*="user"]', { timeout: 10000 })
        .should('have.length.gte', 1)
    })

    it('contains admin in user list', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .shadow()
        .invoke('text')
        .should('contain', 'admin')
    })
  })

  describe('UI Elements', () => {
    it('has interactive buttons', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .shadow()
        .find('button')
        .should('have.length.gte', 1)
    })
  })
})
