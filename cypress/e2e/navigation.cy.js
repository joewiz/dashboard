/**
 * Admin Navigation Tests
 *
 * Tests sidebar navigation and bookmarkable routes.
 * Related issues: #129 (side panel visibility)
 */
describe('Admin Navigation', () => {
  describe('Default Route', () => {
    it('defaults to the launcher view after login', () => {
      cy.login()
      cy.url().should('include', 'admin#/launcher')
    })
  })

  describe('Sidebar Click Navigation', () => {
    beforeEach(() => {
      cy.loginAndNavigate('launcher')
    })

    it('navigates to Package Manager via sidebar click', () => {
      cy.get('existdb-dashboard', { timeout: 15000 })
        .shadow()
        .find('button#packageManagerItem', { timeout: 15000 })
        .click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/packagemanager')
    })

    it('navigates to User Manager via sidebar click', () => {
      cy.get('existdb-dashboard')
        .shadow()
        .find('button#userManagerItem', { timeout: 15000 })
        .click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/usermanager')
    })

    it('navigates to Backup via sidebar click', () => {
      cy.get('existdb-dashboard')
        .shadow()
        .find('button#backupItem', { timeout: 15000 })
        .click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/backup')
    })

    it('navigates to Settings via sidebar click', () => {
      cy.get('existdb-dashboard')
        .shadow()
        .find('button#settingsItem', { timeout: 15000 })
        .click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/settings')
    })

    it('navigates back to Launcher from Settings', () => {
      cy.get('existdb-dashboard').shadow().find('button#settingsItem', { timeout: 15000 }).click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/settings')
      cy.get('existdb-dashboard').shadow().find('button#launcherItem').click()
      cy.url({ timeout: 15000 }).should('include', 'admin#/launcher')
    })
  })

  describe('Bookmarkable Routes (Direct URL Access)', () => {
    beforeEach(() => {
      cy.loginAndNavigate('launcher')
    })

    it('loads Package Manager directly', () => {
      cy.visit('/dashboard/admin#/packagemanager')
      cy.get('existdb-packagemanager', { timeout: 15000 }).should('exist')
    })

    it('loads User Manager directly', () => {
      cy.visit('/dashboard/admin#/usermanager')
      cy.get('existdb-usermanager', { timeout: 15000 }).should('exist')
    })

    it('loads Backup directly', () => {
      cy.visit('/dashboard/admin#/backup')
      cy.get('existdb-backup', { timeout: 15000 }).should('exist')
    })

    it('loads Settings directly', () => {
      cy.visit('/dashboard/admin#/settings')
      cy.get('existdb-settings', { timeout: 15000 }).should('exist')
    })
  })
})
