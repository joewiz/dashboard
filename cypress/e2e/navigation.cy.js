/**
 * Admin Navigation Tests
 *
 * Tests sidebar navigation and bookmarkable routes.
 * Related issues: #129 (side panel visibility)
 */
describe('Admin Navigation', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard/admin#/launcher')
    cy.get('existdb-dashboard', { timeout: 15000 }).should('exist')
    cy.get('paper-item#launcherItem', { timeout: 15000 }).should('exist')
  })

  it('defaults to the launcher view after login', () => {
    cy.url().should('include', 'admin#/launcher')
  })

  it('navigates to Package Manager via sidebar click', () => {
    cy.get('paper-item#packageManagerItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/packagemanager')
  })

  it('navigates to User Manager via sidebar click', () => {
    cy.get('paper-item#userManagerItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/usermanager')
  })

  it('navigates to Backup via sidebar click', () => {
    cy.get('paper-item#backupItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/backup')
  })

  it('navigates to Settings via sidebar click', () => {
    cy.get('paper-item#settingsItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/settings')
  })

  it('navigates back to Launcher from Settings', () => {
    cy.get('paper-item#settingsItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/settings')
    cy.get('paper-item#launcherItem').click({ force: true })
    cy.url({ timeout: 15000 }).should('include', 'admin#/launcher')
  })

  describe('Bookmarkable Routes (Direct URL Access)', () => {
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
