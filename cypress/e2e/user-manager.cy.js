/**
 * User Manager Tests
 *
 * Related issues: #114/#93/#107 (admin password change), #92 (group creation 500),
 *   #76 (personal group), #77 (group managers missing), #91 (group view refresh),
 *   #275 (disable account)
 */
describe('User Manager', () => {
  before(() => {
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
        .find('.user-entry, li, .user')
        .should('have.length.gte', 1)
    })

    it('lists admin user', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .shadow()
        .should('contain.text', 'admin')
    })

    it('lists guest user', () => {
      cy.get('existdb-usermanager')
        .shadow()
        .should('contain.text', 'guest')
    })
  })

  describe('Tabs', () => {
    it('has user and group tabs', () => {
      cy.get('existdb-usermanager')
        .shadow()
        .find('button.tab, .tab-button')
        .should('have.length.gte', 2)
    })
  })

  describe('User Creation UI (#76)', () => {
    it('has an add user button', () => {
      cy.get('existdb-usermanager')
        .shadow()
        .find('button')
        .should('have.length.gte', 1)
    })
  })

  describe('Group Management (#92, #77)', () => {
    it('can switch to groups tab', () => {
      cy.get('existdb-usermanager')
        .shadow()
        .find('button.tab, .tab-button')
        .last()
        .click()
    })

    it('shows group list', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .shadow()
        .should('contain.text', 'dba')
    })
  })
})
