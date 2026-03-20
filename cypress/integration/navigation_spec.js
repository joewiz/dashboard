/**
 * Admin Navigation Tests
 *
 * Tests sidebar navigation between all admin modules.
 * Covers: routing, lazy-loading, bookmarkable URLs, sidebar visibility.
 * Related issues: #129 (side panel visibility)
 */
describe('Admin Navigation', function () {
  before(function () {
    cy.visit('/dashboard/login.html')
    cy.get('#user').type('admin')
    cy.get('#password').clear()
    cy.get('.button').click()
    cy.url().should('include', '/dashboard/admin')
  })

  it('should default to the launcher view after login', function () {
    cy.url().should('include', 'admin#/launcher')
  })

  it('should navigate to Package Manager', function () {
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#packageManagerItem')
      .shadowClick()
    cy.url().should('include', 'admin#/packagemanager')
  })

  it('should navigate to User Manager', function () {
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#userManagerItem')
      .shadowClick()
    cy.url().should('include', 'admin#/usermanager')
  })

  it('should navigate to Backup', function () {
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#backupItem')
      .shadowClick()
    cy.url().should('include', 'admin#/backup')
  })

  it('should navigate to Settings', function () {
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#settingsItem')
      .shadowClick()
    cy.url().should('include', 'admin#/settings')
  })

  it('should navigate back to Launcher', function () {
    cy.get('body')
      .shadowGet('app-drawer-layout')
      .shadowFind('paper-item#launcherItem')
      .shadowClick()
    cy.url().should('include', 'admin#/launcher')
  })

  describe('Direct URL access (bookmarkable routes)', function () {
    it('should load Package Manager directly', function () {
      cy.visit('/dashboard/admin#/packagemanager')
      cy.url().should('include', 'admin#/packagemanager')
      cy.get('body')
        .shadowGet('existdb-packagemanager', { timeout: 10000 })
        .should('exist')
    })

    it('should load User Manager directly', function () {
      cy.visit('/dashboard/admin#/usermanager')
      cy.url().should('include', 'admin#/usermanager')
      cy.get('body')
        .shadowGet('existdb-usermanager', { timeout: 10000 })
        .should('exist')
    })

    it('should load Backup directly', function () {
      cy.visit('/dashboard/admin#/backup')
      cy.url().should('include', 'admin#/backup')
      cy.get('body')
        .shadowGet('existdb-backup', { timeout: 10000 })
        .should('exist')
    })

    it('should load Settings directly', function () {
      cy.visit('/dashboard/admin#/settings')
      cy.url().should('include', 'admin#/settings')
      cy.get('body')
        .shadowGet('existdb-settings', { timeout: 10000 })
        .should('exist')
    })
  })
})
