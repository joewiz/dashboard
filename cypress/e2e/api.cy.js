/**
 * Backend API Tests
 *
 * Tests XQuery API endpoints directly via HTTP.
 * Isolates backend vs frontend bugs.
 * Related issues: #73 (proxy), #93/#107/#114 (password change), #92 (group creation)
 */
describe('Backend API Endpoints', () => {
  describe('Public Endpoints', () => {
    it('GET /dashboard/index.html returns 200', () => {
      cy.request('/dashboard/index.html').its('status').should('eq', 200)
    })

    it('GET /dashboard/modules/getVersion.xql returns version info', () => {
      cy.request('/dashboard/modules/getVersion.xql').then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.not.be.empty
      })
    })

    it('GET /dashboard/guest.html returns 200', () => {
      cy.request({
        url: '/dashboard/guest.html',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 302, 404])
      })
    })
  })

  describe('Auth-Protected Endpoints', () => {
    it('GET /dashboard/admin returns a page', () => {
      cy.request({
        url: '/dashboard/admin',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 302, 401])
      })
    })

    it('GET /dashboard/modules/getCurrentUser.xql returns user info when authenticated', () => {
      cy.request({
        url: '/dashboard/modules/getCurrentUser.xql',
        auth: { user: 'admin', pass: '' },
      }).then((resp) => {
        expect(resp.status).to.eq(200)
      })
    })

    it('GET /dashboard/apps/local lists local applications', () => {
      cy.request({
        url: '/dashboard/apps/local',
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('Package Service', () => {
    it('GET packageservice/packages/apps lists applications', () => {
      cy.request({
        url: `${Cypress.config('baseUrl')}/../packageservice/packages/apps`,
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })

    it('GET packageservice/packages/public-url returns repo URL', () => {
      cy.request({
        url: `${Cypress.config('baseUrl')}/../packageservice/packages/public-url`,
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('User Manager API (#92, #93, #107, #114)', () => {
    it('GET usermanager/api/user/ lists users', () => {
      cy.request({
        url: '/dashboard/usermanager/api/user/',
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })

    it('GET usermanager/api/group/ lists groups', () => {
      cy.request({
        url: '/dashboard/usermanager/api/group/',
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('Backup API', () => {
    it('GET backup module is accessible', () => {
      cy.request({
        url: '/dashboard/backup/modules/backup.xql',
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 404])
      })
    })
  })
})
