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

  describe('User Listing', () => {
    it('displays the user manager component', () => {
      cy.get('existdb-usermanager', { timeout: 15000 }).should('exist')
    })

    it('lists existing users including admin', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .should('contain.text', 'admin')
    })

    it('lists existing users including guest', () => {
      cy.get('existdb-usermanager').should('contain.text', 'guest')
    })
  })

  describe('Admin Password Change UI (#114, #93, #107)', () => {
    it('can select the admin user', () => {
      cy.get('existdb-usermanager')
        .contains('admin')
        .click()
    })

    it('displays password field for the selected user', () => {
      cy.get('existdb-usermanager')
        .find('paper-input[label*="assword"], input[type="password"]', { timeout: 5000 })
        .should('exist')
    })

    it('has a save button for user changes', () => {
      cy.get('existdb-usermanager')
        .find('paper-button, button')
        .should('have.length.gte', 1)
    })
  })

  describe('Group Management', () => {
    it('can switch to the groups view', () => {
      cy.get('existdb-usermanager')
        .find('paper-tab').eq(1).click()
    })

    it('lists existing groups including dba (#77)', () => {
      cy.get('existdb-usermanager', { timeout: 15000 })
        .should('contain.text', 'dba')
    })

    it('lists existing groups including guest', () => {
      cy.get('existdb-usermanager').should('contain.text', 'guest')
    })

    it('has a button to add a new group (#92)', () => {
      cy.get('existdb-usermanager')
        .find('paper-icon-button[icon="add"], #addGroup, paper-button')
        .should('have.length.gte', 1)
    })
  })

  describe('Group View Refresh (#91)', () => {
    it('renders group list without manual refresh', () => {
      cy.get('existdb-usermanager')
        .find('paper-tab').eq(1).click()
      cy.get('existdb-usermanager', { timeout: 15000 })
        .should('contain.text', 'dba')
    })
  })

  describe('User Creation UI (#76)', () => {
    it('has a button to add a new user', () => {
      cy.get('existdb-usermanager')
        .find('paper-tab').eq(0).click()
      cy.get('existdb-usermanager')
        .find('paper-icon-button[icon="add"], #addUser, paper-button')
        .should('have.length.gte', 1)
    })
  })
})
